<template>
    <ion-list v-if="isListLoaded">
        <ion-list-header>
            <ion-label>
                Lista Agendamentos
            </ion-label>
        </ion-list-header>
        <agendamento-items  v-for="item in listaAgendamentos" :key="item.id" :especialidade="item.especialidade" :especialista="item.especialista"
        :data="item.data" :quantidade="item.quantidade" :setor="item.setor" />
    </ion-list>

</template>

<script setup>
import { IonList, IonLabel, IonListHeader } from '@ionic/vue';
import AgendamentoItems from './AgendamentoItems.vue';
import useAgendamento from '@/composables/useAgendamento';
import { watch } from 'vue';

const {listaAgendamentos, isListLoaded} = useAgendamento()

watch(listaAgendamentos, (value) => [
    console.log(value)
])

</script>