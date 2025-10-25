<template>
    <ion-page>
        <!-- <ion-header>
            <ion-toolbar>
                <ion-title>Login</ion-title>
            </ion-toolbar>
        </ion-header> -->

        <ion-content color="primary" class="ion-padding">
            <ion-img src="/saude_em_ordem_logo.png" alt="Saúde em Ordem Logo">
            </ion-img>




            <ion-item  detail-icon="mail=outline">
                <ion-label position="stacked">Email</ion-label>
                <ion-input v-model="email" type="text" />
            </ion-item>
            <ion-item>
                <ion-label position="stacked">Senha</ion-label>
                <ion-input v-model="senha" type="password" />
            </ion-item>

            <ion-button type="button" expand="block" class="ion-margin-top" @click="login">Entrar</ion-button>

            <ion-text color="danger" v-if="error" class="ion-margin-top">
                {{ error }}
            </ion-text>
            <ion-toast trigger="open-toast" message="Vaga Reservada" :duration="5000">

            </ion-toast>
            
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue';
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonToast, IonContent,
    IonItem, IonLabel, IonInput, IonButton, IonText, IonImg
} from '@ionic/vue';
import useAuth from '@/composables/useAuth';

const email = ref('')
const senha = ref('');
const error = ref('');

const { isAuthenticated, loginWithEmailAndPassword } = useAuth();

const login = async () => {
    error.value = '';
    if (!email.value || !senha.value) {
        error.value = 'Informe o Email e Senha';
        return;
    }

    try {

        const sucess = await loginWithEmailAndPassword(email.value, senha.value)

        if (sucess) {
            router.push('/menu');
        }else {
            error.value = 'Verifique o seu cadastro ou rocure o posto mais perto da sua localidade.';
        }

    } catch (err) {
        console.error(err);
        error.value = 'Erro ao efetuar login';
    }
};
</script>

<style scoped>
ion-img {
    padding: 1rem;
    height: 16rem;
}

ion-text {
    display: flex;
    justify-content: center;
    text-align: center;
}
</style>