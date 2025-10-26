<template>
    <ion-card color="primary">
        <ion-card-header>
            <ion-card-title>{{ props?.especialidade }}</ion-card-title>
            <ion-card-subtitle>{{ props?.especialista }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
            <ion-text color="light">
                <p>Data: {{ props.data && props.data.toDate ? props.data.toDate().toLocaleDateString('pt-BR') : 'Aguardando Data' }}</p>
                <p>Hora: {{ props.data && props.toDate ? props.data.toDate().toLocaleTimeString('pt-BR', {
                    hour: '2-digit', minute:
                        '2-digit'
                }) : '' }}</p>
            </ion-text>
            <ion-text color="light">
                <p>{{ props.setor }}</p>
            </ion-text>
            <ion-button @click="reservarVaga" type="button" color="warning" shape="round"
                fill="solid">Reservar
                Vaga</ion-button>
        </ion-card-content>
    </ion-card>
</template>

<script setup>
import { IonCard, IonText, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, toastController } from '@ionic/vue';
import { ref, defineProps, defineEmits} from 'vue';

const props = defineProps({
    id: String,
    especialidade: String,
    especialista: String,
    data: Object,
    quantidade: String,
    setor: String
})

const emit = defineEmits(['reservar'])

const clicado = ref(false)
const toastMessage = ref('')

const reservarVaga = () => {
    if (!clicado.value) {
        toastMessage.value = "Agendamento realizado com sucesso"
        clicado.value = true
        presentToast('bottom')
        emit("reservar", props.id)
    } else {
        toastMessage.value = "Vaga já agendada"
        presentToast('bottom')
    }

}

const presentToast = async (position) => {

    const toast = await toastController.create({
        message: toastMessage.value,
        duration: 2000,
        position: position,
        animated: true,
    });

    await toast.present();
};

</script>

<style scoped>
ion-card-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

ion-button {
    display: flex;
    padding: 1rem;
}
</style>