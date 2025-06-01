<template>
  <div class="h-screen">
    <!-- <div id="nc-root"></div> -->
    <iframe ref="iframeRef" src="/admin/index.html" class="w-full h-full border-none" style="height: 100%; width: 100%" />
  </div>
</template>

<!-- <script setup>
import { onMounted, ref } from 'vue';
import CMS from 'decap-cms-app';
import YAML from 'yaml';

// const iframeRef = ref(null);

onMounted(() => {
  // iframeRef.value.contentWindow.CMS = CMS;
  // iframeRef.value.contentWindow.QWE = { qwe: 'asd' };
  fetch('https://hansen-fe.netlify.app/cms/config.yml')
    .then((res) => res.text())
    .then((yml) => {
      // const parsed = jsyaml.load(yml);
      const parsed = YAML.parse(yml);
      // CMS.init({ config: parsed });
      console.log(CMS);
    });
});
</script> -->
