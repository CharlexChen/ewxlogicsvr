<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in" appear>
      <div class="container">
        <component
          :is="Component"
          :key="route.fullPath"
        />
      </div>
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="less">
.container {
  height: 100%;
  display: block;
}
</style>
