<script setup lang="ts">

</script>

<template>
  <div class="py-12">
    <!-- <AppHeader /> -->
    <slot />
    <div class="flex gap-8 items-center">
      <Logo />
      <Icon size="32" name="i-mdi-instagram" />
      <Icon size="32" name="i-mdi-facebook" />
      <Icon size="32" name="i-mdi-google" />
    </div>
  </div>
</template>
