<template>
    <ion-item>
        <ion-label>

        </ion-label>
    </ion-item>


</template>

<script setup>
defineProps({
    nome: String,
    cpf: String,
    nascimento: String,
    nomeMae: String,
    telefone: String,
    email: String,
    Endereço: String
})

import { IonItem, IonLabel } from '@ionic/vue';
import useAuth from '@/composables/useAuth';
import { mergeProps } from 'vue';
const {user, ready} = useAuth()

</script>