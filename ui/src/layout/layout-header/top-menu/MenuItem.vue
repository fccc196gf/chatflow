<template>
  <div
    class="menu-item-container flex align-center"
    :class="isActive ? 'active' : ''"
    @click="router.push({ name: menu.name })"
  >
    <div class="title flex align-center">
      <AppIcon
        :iconName="isActive ? menu.meta?.iconActive || menu.meta?.icon : menu?.meta?.icon"
        class="menu-icon mr-8"
      />
      <span> {{ $t(menu.meta?.title as string) }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter, useRoute, type RouteRecordRaw } from 'vue-router'
import { computed } from 'vue'
const router = useRouter()
const route = useRoute()

const props = defineProps<{
  menu: RouteRecordRaw
}>()

const isActive = computed(() => {
  const { name, path, meta } = route
  return (name == props.menu.name && path == props.menu.path) || meta?.activeMenu == props.menu.path
})
</script>
<style lang="scss" scoped>
.menu-item-container {
  height: 40px;
  line-height: 40px;
  margin-right: 12px;
  cursor: pointer;
  font-size: 14px;
  position: relative;
  padding: 0 16px;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
  background-color: #f5f7fa; /* 未选中背景 */
  color: #4e5969; /* 未选中文字颜色 */

  .menu-icon {
    font-size: 20px;
    color: #86909c; /* 未选中图标颜色 */
  }

  &:hover {
    background-color: var(--el-color-primary-light-9);
  }

  &.active {
    background-color: #165dff; /* 品牌蓝 */
    color: #ffffff;
    box-shadow: none;

    .menu-icon {
      color: #ffffff;
    }

    .title {
      color: #ffffff !important;
      font-weight: 500;
    }
  }
}
</style>
