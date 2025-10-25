<template>
    <ion-card color="primary">
        <ion-card-header>
            <ion-card-title>{{ especialidade }}</ion-card-title>
            <ion-card-subtitle>{{ especialista }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
            <!-- <p>{{ data }}</p> -->
            <ion-text color="light">
                <p>Data: {{ data && data.toDate ? data.toDate().toLocaleDateString('pt-BR') : 'Aguardando Data' }}</p>
                <p>Hora: {{ data && data.toDate ? data.toDate().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '' }}</p>
            </ion-text>
            <ion-text color="light">
                <p>{{ setor }}</p>
            </ion-text>

        </ion-card-content>
        <ion-button color="warning" shape="round" fill="solid">Reservar Vaga</ion-button>
    </ion-card>
</template>

<script setup>
import { IonCard, IonText, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton,  } from '@ionic/vue';
defineProps({
    especialidade: String,
    especialista: String,
    data: String,
    quantidade: String,
    setor: String
})

const reservarVaga = () => {

}

</script>

<style scoped>
ion-card-content {
    display: flex;
}

ion-button {
    display: flex;
    padding: 1rem;
}
</style>