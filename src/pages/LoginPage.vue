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
import { ref, watch } from 'vue';
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonLabel, IonInput, IonButton, IonText
} from '@ionic/vue';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db, auth } from '@/model/firebaseConfig';
import { signInAnonymously, updateProfile } from 'firebase/auth';

const cpf = ref('');
const error = ref('');

watch(cpf, () => {
    console.log(cpf.value)
})

const login = async () => {
    error.value = '';
    try {
        const refCol = collection(db, "pacientes")
        const q = query(refCol, where("cpf", "==", cpf.value))
        const querySnap = await getDocs(q)
        if (querySnap.empty) {
            error.value = "CPF não encontrado"
            return
        }

        await signInAnonymously(auth)
            .then(async (res) => {
                const doc = querySnap.docs[0]
                updateProfile(res.user, { displayName: doc.data().nome })
                console.log("Paciente: ", doc.id, doc.data())
                router.push('/menu/');
            })
            .catch(signError => {
                console.log(signError)
            })

    } catch (err) {
        console.log(err)
        error.value = "Erro ao consultar o CPF"
    }
};
</script>