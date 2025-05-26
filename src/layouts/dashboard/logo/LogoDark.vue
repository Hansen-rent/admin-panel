<template>
  <div class="logo">
    <RouterLink to="/dashboard" aria-label="logo">
      <img src="@/assets/images/hum-logo-lg.png" width="130" height="40" />
    </RouterLink>
  </div>
</template>
<script setup>
import { RouterLink } from 'vue-router';
</script>
