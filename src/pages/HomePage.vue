<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Início</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-title v-if="ready">Olá,{{user.nome}}!!</ion-title>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import useAuth from '@/composables/useAuth';
import { watch } from 'vue';

const { user, ready } = useAuth();

watch(user, (val) => {
  console.log(val)
})

watch(ready, (val) => {
  console.log(val)
})

</script>