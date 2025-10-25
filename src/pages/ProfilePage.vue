<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-title>
                    Dados do Paciente
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content v-if="ready">
            <ion-title>
                {{ user.nome }}
            </ion-title>
            <p>Mudar Paciente</p>
        </ion-content>
    </ion-page>


</template>

<script setup>
import { IonPage, IonContent, IonTitle, IonHeader,  IonToolbar } from '@ionic/vue';
import useAuth from '@/composables/useAuth';

const { user, ready, isAuthenticated} = useAuth()

</script>