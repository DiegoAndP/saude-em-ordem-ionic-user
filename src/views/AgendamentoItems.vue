<template>
    <ion-card color="tertiary">
        <ion-card-header>
            <ion-card-title>{{ especialidade }}</ion-card-title>
            <ion-card-subtitle>{{ especialista }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
            <!-- <p>{{ data }}</p> -->
            <ion-text color="light">
                <p>{{ quantidade }}</p>
            </ion-text>
            <ion-text color="light">
                <p>{{ setor }}</p>
            </ion-text>

        </ion-card-content>
        <ion-button fill="clear">Marcar</ion-button>
    </ion-card>
</template>

<script setup>
import { IonCard, IonText, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton } from '@ionic/vue';
defineProps({
    especialidade: String,
    especialista: String,
    data: String,
    quantidade: String,
    setor: String
})

</script>