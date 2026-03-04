<template>
  <div class="breadcrumb ml-4 mt-4 mb-12 flex align-center">
    <back-button @click="toBack"></back-button>
    <div class="flex align-center">
      <el-avatar
        v-if="isApplication && hasValidApplicationIcon"
        shape="square"
        :size="24"
        style="background: none"
        class="mr-8"
      >
        <img :src="resetUrl(current?.icon, resetUrl('./favicon.ico'))" alt="" />
      </el-avatar>
      <el-avatar
        v-else-if="isApplication"
        shape="square"
        :size="24"
        class="mr-8 agent-avatar-dash"
        style="background: transparent"
      >
        <AppIcon
          iconName="app-agent-robot"
          style="font-size: 18px; color: var(--el-color-primary)"
        />
      </el-avatar>
      <KnowledgeIcon v-else-if="isKnowledge" :type="current?.type" class="mr-8" :size="24" />

      <div class="ellipsis" :title="current?.name">{{ current?.name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { onBeforeRouteLeave, useRouter, useRoute } from 'vue-router'
import { resetUrl } from '@/utils/common'
import { loadSharedApi } from '@/utils/dynamics-api/shared-api'
import useStore from '@/stores'
import permissionMap from '@/permission'
const { common, folder, user } = useStore()
const route = useRoute()
const router = useRouter()

const {
  meta: { activeMenu },
  params: { id, folderId },
  query: { isShared },
} = route as any

const apiType = computed(() => {
  if (route.path.includes('shared')) {
    return 'systemShare'
  } else if (route.path.includes('resource-management')) {
    return 'systemManage'
  } else {
    return 'workspace'
  }
})

const folderType = computed(() => {
  if (route.path.includes('application')) {
    return 'application'
  }
  if (route.path.includes('knowledge')) {
    return 'knowledge'
  } else {
    return 'application'
  }
})

const permissionPrecise = computed(() => {
  return permissionMap[folderType.value!]['workspace']
})

const shareDisabled = computed(() => {
  return folderId === 'share' || isShared === 'true'
})

onBeforeRouteLeave((to, from) => {
  common.saveBreadcrumb(null)
})

const loading = ref(false)

const current = ref<any>(null)
const hasValidApplicationIcon = computed(() => {
  const icon = current.value?.icon?.toString?.().trim().toLowerCase?.()
  if (!icon) {
    return false
  }
  if (
    icon === 'undefined' ||
    icon === 'null' ||
    icon === 'favicon.ico' ||
    icon === './favicon.ico' ||
    icon === '/favicon.ico' ||
    icon.endsWith('/favicon.ico')
  ) {
    return false
  }
  return true
})

const isApplication = computed(() => {
  return activeMenu.includes('application')
})
const isKnowledge = computed(() => {
  return activeMenu.includes('knowledge')
})

const toBackPath = computed(() => {
  if (route.path.includes('shared')) {
    return '/system/shared' + activeMenu
  } else if (route.path.includes('resource-management')) {
    return '/system/resource-management' + activeMenu
  } else {
    return activeMenu
  }
})

function getKnowledgeDetail() {
  loading.value = true
  loadSharedApi({ type: 'knowledge', isShared: shareDisabled.value, systemType: apiType.value })
    .getKnowledgeDetail(id)
    .then((res: any) => {
      current.value = res.data
      loading.value = false
    })
    .catch(() => {
      loading.value = false
    })
}

function getApplicationDetail() {
  loading.value = true
  loadSharedApi({ type: 'application', systemType: apiType.value })
    .getApplicationDetail(id)
    .then((res: any) => {
      current.value = res.data
      loading.value = false
    })
    .catch(() => {
      loading.value = false
    })
}

function toBack() {
  if (isKnowledge.value) {
    folder.setCurrentFolder({
      id: permissionPrecise.value.folderRead(folderId) ? folderId : user.getWorkspaceId(),
    })
  } else if (isApplication.value) {
    folder.setCurrentFolder({
      id: permissionPrecise.value.folderRead(current.value.folder)
        ? current.value.folder
        : user.getWorkspaceId(),
    })
  }
  router.push({ path: toBackPath.value })
}

onMounted(() => {
  if (isKnowledge.value) {
    getKnowledgeDetail()
  } else if (isApplication.value) {
    getApplicationDetail()
  }
})
</script>

<style scoped lang="scss">
:deep(.dropdown-active) {
  background-color: var(--el-dropdown-menuItem-hover-fill);
  .el-dropdown-menu__item {
    color: var(--el-dropdown-menuItem-hover-color);
  }
}
.breadcrumb {
  .agent-avatar-dash {
    position: relative;
    isolation: isolate;
    overflow: visible;
  }
  .agent-avatar-dash::after {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 7px;
    padding: 1px;
    background: repeating-conic-gradient(#111111 0 14deg, transparent 14deg 30deg);
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: agent-dash-rotate 3.2s linear infinite;
    pointer-events: none;
  }
  .breadcrumb-hover {
    padding: 4px;
    border-radius: 4px;
    &:hover {
      background: var(--el-color-primary-light-9);
      color: var(--el-color-primary);
    }
  }
  &__footer {
    &:hover {
      background-color: var(--app-text-color-light-1);
    }
  }
}

@keyframes agent-dash-rotate {
  to {
    transform: rotate(1turn);
  }
}
</style>
