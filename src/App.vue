<script setup lang="ts"></script>

<template>
  <div class="nav">
    <RouterLink
      to="/"
      style="margin-right: 20px"
    >
      第一步
    </RouterLink>
    <RouterLink
      to="/about"
      style="margin-right: 20px"
    >
      第二步
    </RouterLink>
    <RouterLink to="/other"> 第三步</RouterLink>
  </div>
  <div>
    <RouterView v-slot="{ Component }">
      <KeepAlive include="HomeComponent,OtherComponent">
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
  </div>
</template>

<style scoped lang="less"></style>
