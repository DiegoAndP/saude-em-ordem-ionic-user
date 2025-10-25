import { db } from "@/model/firebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { readonly, ref} from "vue";

//lista reativa para receber os agendamentos
const listaAgendamentos = ref<any[]>([])
const isListLoaded = ref<boolean>(false)

const atendimentoRef = collection(db, "atendimento");

onSnapshot(atendimentoRef, (agendamentoSnapshot) => {
    agendamentoSnapshot.docChanges().forEach((change) => {
        const docData = { id: change.doc.id, ...change.doc.data() };

        console.log(docData)

        if (change.type === "added") {
            // Documento adicionado
            listaAgendamentos.value.push(docData);
        }
        if (change.type === "modified") {
            // Documento modificado
            const index = listaAgendamentos.value.findIndex(item => item.id === change.doc.id);
            if (index !== -1) {
                listaAgendamentos.value[index] = docData;
            }
        }
        if (change.type === "removed") {
            // Documento removido
            listaAgendamentos.value = listaAgendamentos.value.filter(item => item.id !== change.doc.id);
        }
    })
    isListLoaded.value = true
})

export default function useAgendamento() {
    return {
        listaAgendamentos: readonly(listaAgendamentos),
        isListLoaded,
    }
}
