·
<template>
  <div class="app-top-bar-container border-b flex-center">
    <div class="logo mt-4 cursor" @click="router.push('/')">
      <LogoFull height="48px" class="brand-logo" />
    </div>

    <div class="flex-between w-full align-center">
      <h4><el-divider class="ml-16 mr-16" direction="vertical" />{{ $t('views.system.title') }}</h4>
      <div class="flex align-center mr-8">
        <TopAbout type="system"></TopAbout>
        <el-divider class="ml-8 mr-8" direction="vertical" />
        <el-button
          link
          @click="goHome"
          style="color: var(--el-text-color-primary)"
          v-if="
            hasPermission(
              [
                RoleConst.USER.getWorkspaceRole,
                RoleConst.EXTENDS_USER.getWorkspaceRole,
                RoleConst.EXTENDS_WORKSPACE_MANAGE.getWorkspaceRole,
                RoleConst.WORKSPACE_MANAGE.getWorkspaceRole,
              ],
              'OR',
            )
          "
        >
          <AppIcon class="mr-8" iconName="app-workspace" style="font-size: 16px"></AppIcon>
          {{ $t('views.workspace.toWorkspace') }}</el-button
        >
      </div>
    </div>
    <Avatar></Avatar>
  </div>
</template>
<script setup lang="ts">
import { RoleConst } from '@/utils/permission/data'
import Avatar from './avatar/index.vue'
import TopAbout from './top-about/index.vue'
import { useRouter } from 'vue-router'
import { hasPermission } from '@/utils/permission'

const router = useRouter()
const goHome = () => {
  router.push('/')
}
</script>
<style lang="scss" scoped>
.app-top-bar-container {
  height: var(--app-header-height);
  box-sizing: border-box;
  padding: var(--app-header-padding);
}

.brand-logo {
  :deep(svg),
  :deep(img) {
    height: 48px;
    /* 品牌强化：放大 Logo */
  }

  :deep(.custom-logo-color) {
    /* 品牌蓝色 */
    color: #165dff;
    fill: #165dff;
  }
}
</style>
