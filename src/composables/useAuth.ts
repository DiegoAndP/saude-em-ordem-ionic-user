import { ref, readonly, computed } from 'vue';
import { collection, query, where, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '@/model/firebaseConfig';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';


const user = ref<any>(null);
const ready = ref(false);
const isAuthenticated = ref(false)


async function loginWithEmailAndPassword(email: string, password: string) {
  if (!password || !email) {
    return false;
  }

  //encontra um usuário com mesmo email pré-cadastrado
  try {

    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const loggedUserData = await getDoc(doc(db, 'pacientes', userCredential.user.uid))
    if (!loggedUserData.exists()) {
      return false;
    }
    user.value = { uid: userCredential.user.uid, ...loggedUserData.data() }
    console.log(user.value)
    console.log("Usuário Validado")
    isAuthenticated.value = true
    return true

  } catch (sigInError) {
    console.log(sigInError)
    console.log("Usuário ainda não criado. Criando...")

    try {//buscar usuário pendente de cadastro

      const col = collection(db, 'pre_cadastro');
      const q = query(col, where('email', '==', email), where('status', '==', 'pendente'));
      const snap = await getDocs(q);
      if (snap.empty) return false;
      const querySnap = snap.docs[0];
      const profileData = querySnap.data()
      console.log(profileData)

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      console.log("Linha 28 " + userCredential)
      const uid = userCredential.user.uid

      //criada a conta, copie o usuário da base de pré-cadastro para pacientes
      const ref = collection(db, 'pacientes');
      await setDoc(doc(ref, uid), { //talvez mexer no futuro para que o retorno de setDoc seja um usuário
        nome: querySnap.data().nome,
        cpf: querySnap.data().cpf,
        cartao_sus: querySnap.data().cartao_sus,
        data_nascimento: querySnap.data().data_nascimento,
        email: querySnap.data().email,
        endereco: querySnap.data().endereco,
        setor_bairro: querySnap.data().setor_bairro,
        telefone: querySnap.data().telefone
      })

      user.value = { uid: uid, ...profileData } // e esse usuário seja aplicado aqui.
      console.log(user.value)
      isAuthenticated.value = true //login agora pode ser realizado

    } catch (setError) {
      console.log(setError)
      isAuthenticated.value = false
    }
  }
}

function logout() {
  if (auth.currentUser) {
    auth.signOut()
    isAuthenticated.value = false
    console.log("Usuário Deslogado")
  }
  user.value = null;
}

onAuthStateChanged(auth, async (u) => {
  console.log(auth.currentUser)
  if (u) {
    const loginUid = u.uid
    console.log(u)
    const profile = await getDoc(doc(db, "pacientes", loginUid))
    console.log(profile.data())
    if (!profile.exists()) {
      console.error("Profile não econtrado")
      return false
    }

    user.value = { uid: loginUid, ...profile.data() }
    console.log("após onAuthStateCHanged " + user.value)
    ready.value = true
  }
  else {
    console.log("Usuário não logado")
    user.value = null;
    ready.value = true
  }
}
)


export default function useAuth() {
  return {
    user: readonly(user),
    ready: readonly(ready),
    isAuthenticated,
    loginWithEmailAndPassword,
    logout
  };
}