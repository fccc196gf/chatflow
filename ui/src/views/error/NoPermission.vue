<template>
  <div class="not-found-container flex-center">
    <div class="content flex-center">
      <div class="code">403</div>
      <div class="divider"></div>
      <div class="message-box">
        <h4 class="title">{{ $t('common.notFound.noPermissionTitle') }}</h4>
        <p class="desc">{{ $t('common.notFound.NoPermission') }}</p>
        <el-button type="primary" @click="router.push('/')">
          {{ $t('common.notFound.operate') }}
        </el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
<style lang="scss" scoped>
.not-found-container {
  height: 100vh;
  width: 100vw;
  background-color: var(--app-layout-bg-color);
  color: var(--app-text-color-primary);

  .content {
    flex-direction: row;
    gap: 40px;
    padding: 0 20px;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 20px;
      text-align: center;
    }
  }

  .code {
    font-size: 80px;
    font-weight: 600;
    color: var(--el-color-primary);
    line-height: 1;
  }

  .divider {
    width: 1px;
    height: 60px;
    background-color: var(--el-border-color);

    @media (max-width: 768px) {
      width: 60px;
      height: 1px;
    }
  }

  .message-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    @media (max-width: 768px) {
      align-items: center;
    }

    .title {
      font-size: 24px;
      font-weight: 600;
      margin: 0 0 8px 0;
      color: var(--app-text-color-primary);
    }

    .desc {
      font-size: 14px;
      color: var(--app-text-color-secondary);
      margin: 0 0 24px 0;
    }
  }
}
</style>
