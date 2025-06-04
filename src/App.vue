<template>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const { checkToken } = useAuthStore();

onMounted(() => {
  checkToken();
});
</script>
