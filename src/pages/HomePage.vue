<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Início</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-title size="large">Olá, {{user?.nome || "Usuário"}}!</ion-title>


    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import useAuth from '@/composables/useAuth';

const { user, isAuthenticated, ready } = useAuth();


</script>