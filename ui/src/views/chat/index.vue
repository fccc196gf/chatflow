<template>
  <div v-if="initializing" v-loading="true" style="width: 100vw; height: 100vh"></div>
  <component
    v-else
    :applicationAvailable="applicationAvailable"
    :is="currentTemplate"
    :application_profile="chatUser.application"
    :key="route.fullPath"
  />
</template>
<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useStore from '@/stores'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n({ useScope: 'global' })
const route = useRoute()
const router = useRouter()
const { chatUser, common } = useStore()
const initializing = ref<boolean>(true)

const components: any = import.meta.glob('@/views/chat/**/index.vue', {
  eager: true,
})

const {
  query: { mode },
} = route as any

const currentTemplate = computed(() => {
  let modeName = ''
  if (chatUser.application) {
    if (!mode || mode === 'pc') {
      modeName = common.isMobile() ? 'mobile' : 'pc'
    } else {
      modeName = mode
    }
  } else {
    modeName = 'no-service'
  }

  const name = `/src/views/chat/${modeName}/index.vue`
  return components[name].default
})

const applicationAvailable = ref<boolean>(true)
const toLogin = async (accessToken: string) => {
  const path = route.name === 'Chat' ? `/user-login/${accessToken}` : `/login/${accessToken}`
  await router.replace({
    path,
    query: route.query,
  })
}
const initChatApplication = async () => {
  if (chatUser.application) {
    return
  }
  const accessToken = route.params.accessToken?.toString()
  if (!accessToken) {
    return
  }
  chatUser.setAccessToken(accessToken)
  if (route.query?.token) {
    chatUser.setToken(route.query.token.toString())
  }
  try {
    const authentication = await chatUser.isAuthentication()
    if (authentication && !chatUser.getToken()) {
      await toLogin(accessToken)
      return
    }
    if (!authentication && !chatUser.getToken()) {
      await chatUser.anonymousAuthentication()
    }
    await chatUser.applicationProfile()
    if (authentication) {
      await chatUser.getChatUserProfile()
    }
  } catch (e: any) {
    if (e?.response?.status === 401) {
      await toLogin(accessToken)
    }
  }
}
onBeforeMount(async () => {
  locale.value = chatUser.getLanguage()
  try {
    await initChatApplication()
  } finally {
    initializing.value = false
  }
})
</script>
