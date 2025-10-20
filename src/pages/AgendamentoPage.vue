<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>Agendamentos</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <agendamendo-list/>
        </ion-content>
    </ion-page>

</template>

<script setup>
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/vue';
import AgendamendoList from '@/views/AgendamendoList.vue';
</script>