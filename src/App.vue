<template>
  <main class="p-10 max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl print:shadow-none">
    <CVPreview :data="cv" />
  </main>
</template>

<script setup>
import CVPreview from "./components/CVPreview.vue";
import cv from "./data/cv.json";
</script>
