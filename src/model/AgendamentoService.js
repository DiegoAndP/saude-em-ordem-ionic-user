import { collection, getDocs } from "firebase/firestore";
import { Atendimento } from "./Atendimento";
import {db} from "@/model/firebaseConfig"

export default class AgendamentoService {
  static async fetchAtendimentos() {
    const ref = collection(db, "atendimento")
    const listaAtendimentos = []

    try {
      const refSnap = await getDocs(ref)
      refSnap.forEach(snap => {
        const dados = snap.data()
        if (dados) {
          const atendimento = new Atendimento(snap.id, dados.especialidade, dados.especialista, dados.data, dados.quantidade, dados.setor)
          listaAtendimentos.push(atendimento)
        }
      })
      return listaAtendimentos;
    } catch (error) {
      console.error(error)
      return [];
    }
  }

  static async marcarAtendimento() {
    
  }

}