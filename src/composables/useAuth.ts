import { ref, readonly, computed } from 'vue';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/model/firebaseConfig';

type UserProfile = Record<string, any> | null;
const STORAGE_KEY = 'app_user_profile';

const user = ref<UserProfile>(null);
const ready = ref(false);

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    user.value = raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('Failed to parse stored user', e);
    user.value = null;
  } finally {
    ready.value = true;
  }
}

async function loginWithCPF(cpf: string) {
  if (!cpf) return false;
  try {
    const col = collection(db, 'pacientes');
    const q = query(col, where('cpf', '==', cpf));
    const snap = await getDocs(q);
    if (snap.empty) return false;
    const doc = snap.docs[0];
    const profile = { id: doc.id, ...(doc.data() || {}) };
    user.value = profile;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(profile)); } catch (e) { console.warn('Could not persist profile', e); }
    return true;
  } catch (e) {
    console.error('loginWithCPF error', e);
    return false;
  }
}

function logout() {
  user.value = null;
  localStorage.removeItem(STORAGE_KEY);
}

// sync between tabs
if (typeof window !== 'undefined') {
  loadFromStorage();
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      try { user.value = e.newValue ? JSON.parse(e.newValue) : null; } catch { user.value = null; }
    }
  });
} else {
  ready.value = true;
}

export default function useAuth() {
  return {
    user: readonly(user),
    ready: readonly(ready),
    isAuthenticated: computed(() => !!user.value),
    loginWithCPF,
    logout
  };
}