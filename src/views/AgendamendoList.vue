<template>
    <ion-list>
        <ion-list-header>
            <ion-label>
                Lista Agendamentos
            </ion-label>
        </ion-list-header>
        <agendamento-items v-for="item in lista" :key="item.id" :especialidade="item.especialidade" :especialista="item.especialista"
        :data="item.data" :quantidade="item.quantidade" :setor="item.setor" />
    </ion-list>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { IonList, IonLabel, IonListHeader } from '@ionic/vue';
import AgendamentoItems from './AgendamentoItems.vue';
import AgendamentoService from '@/model/AgendamentoService';

const lista = ref([])
onMounted(async () => {
    try {
        lista.value = await AgendamentoService.fetchAtendimentos()
    }
    catch (err) {
        console.error('Loading Error: ' + err)
        lista.value = []
    }
})

</script>