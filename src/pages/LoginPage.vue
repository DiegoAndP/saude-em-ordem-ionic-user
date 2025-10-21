<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Login</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <ion-item>
                <ion-label position="stacked">CPF</ion-label>
                <ion-input v-model="cpf" type="text" />
            </ion-item>

            <ion-button expand="block" class="ion-margin-top" @click="login">Entrar</ion-button>

            <ion-text color="danger" v-if="error" class="ion-margin-top">
                {{ error }}
            </ion-text>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue';
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonLabel, IonInput, IonButton, IonText
} from '@ionic/vue';
import useAuth from '@/composables/useAuth';

const cpf = ref('');
const error = ref('');

const { loginWithCPF } = useAuth();

const login = async () => {
    error.value = '';
    if (!cpf.value) {
        error.value = 'Informe o CPF';
        return;
    }

    try {
        const ok = await loginWithCPF(cpf.value);
        if (!ok) {
            error.value = 'CPF não encontrado';
            return;
        }
        router.push('/menu');
    } catch (err) {
        console.error(err);
        error.value = 'Erro ao efetuar login';
    }
};
</script>