<template>
  <ion-app>
    <ion-router-outlet />
    <!-- <tab-bar-component /> -->
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import TabBarComponent from './views/TabBarComponent.vue';
</script>
