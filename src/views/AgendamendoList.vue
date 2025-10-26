<template>
    <ion-list v-if="isListLoaded">
        <ion-list-header>
            <ion-label>
                Lista Agendamentos
            </ion-label>
        </ion-list-header>
        <agendamento-items @reservar="reservarVaga" v-for="item in listaAgendamentos" :key="item.id" :id="item.id"
            :especialidade="item.especialidade" :especialista="item.especialista" :data="item.data"
            :quantidade="item.quantidade" :setor="item.setor" />
    </ion-list>

</template>

<script setup>
import { IonList, IonLabel, IonListHeader } from '@ionic/vue';
import AgendamentoItems from './AgendamentoItems.vue';
import useAgendamento from '@/composables/useAgendamento';
import useAuth from '@/composables/useAuth';
import { ref, watch } from 'vue';
import { collection, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/model/firebaseConfig';

const { listaAgendamentos, isListLoaded } = useAgendamento()
const { user, ready } = useAuth();

const reservarVaga = async (agendamentoId) => {
    console.log("Reservando vaga para o ID: " + agendamentoId)

    const refAtendimentoDoc = doc(db, 'atendimento', agendamentoId)
    const refVagas = collection(refAtendimentoDoc, 'vagas')
    console.log("Pegando número de vagas disponíveis")

    if (ready && user) {
        try {
            const posicaoAntiga = await getDoc(refAtendimentoDoc)
            const posicaoNova = parseInt(posicaoAntiga.data().quantidade) - 1

            console.log("UID: " + user.value.uid)

            const setDocumento = await setDoc(doc(refVagas, user.value.uid), {
                nome: user.value.nome,
                cpf: user.value.cpf,
                sus: user.value.cartao_sus,
                posicao: posicaoNova
            })

            console.log("Vaga Inserida")

            console.log("Atualizando Posição para " + posicaoNova)
            await updateDoc(doc(db,"atendimento", agendamentoId), {
                quantidade: posicaoNova
            })


        } catch (error) { console.log(error) }

    }



}

watch(listaAgendamentos, (value) => [
    console.log(value)
])

</script>