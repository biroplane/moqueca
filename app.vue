<template>
  <div class="frame p-12">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
.frame{
  z-index: 10 !important;

  outline: 20px solid white;
  outline-offset: -20px;
  position: fixed;
  width: 100%;
  height: 100dvh;
  overflow-y: auto;
}
</style>
