<script lang="ts" setup>
import 'vue-sonner/style.css'
import { Toaster } from 'vue-sonner'
</script>

<template>
    <Toaster richColors :visible-toasts="1" :expand="true" position="bottom-left"/>
    <router-view />
</template>
