<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>Fila Acompanhamento</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div class="fila-content">
                <h1>Ainda não existem atendimentos em andamento :^D</h1>
            </div>

        </ion-content>
    </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonHeader, IonToolbar } from '@ionic/vue';

</script>

<style>
.fila-content {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>