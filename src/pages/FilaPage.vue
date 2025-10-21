<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>Fila Acompanhamento</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div class="fila-content">
                <h1 v-if="isAuthenticated"> Hoje Teremos Atendimentos,  {{user.displayName }} :'D</h1>
                <h1 v-else>Ainda não existem atendimentos em andamento :^D</h1>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonHeader, IonToolbar } from '@ionic/vue';
import useAuth from '@/composables/useAuth';

const { user, isAuthenticated, ready } = useAuth();

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