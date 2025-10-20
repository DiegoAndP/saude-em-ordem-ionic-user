<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>Agendamentos</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <agendamendo-list v-if="isAuthenticated"/>
            <ion-title v-else color="danger">
                <p>Agendamentos Indisponíveis Para não atutenticados.</p>
            </ion-title>
        </ion-content>
    </ion-page>

</template>

<script setup>
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/vue';
import AgendamendoList from '@/views/AgendamendoList.vue';
import useAuth from '@/composables/useAuth';

 const {isAuthenticated} = useAuth();

</script>