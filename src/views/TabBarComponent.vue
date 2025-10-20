<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar  slot="bottom">
        <ion-tab-button tab="home" href="/inicio/">
          <ion-icon :icon="homeOutline" />
          <ion-label>Início</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="agendamentos" href="/agendamentos/">
          <ion-icon :icon="medkitOutline" />
          <ion-label>Agendamentos</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="filas" href="/filas/">
          <ion-icon :icon="peopleCircleOutline" />
          <ion-label>Fila</ion-label>
        </ion-tab-button>
      </ion-tab-bar>

    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue';
import { medkitOutline, peopleCircleOutline, homeOutline } from 'ionicons/icons';
</script>