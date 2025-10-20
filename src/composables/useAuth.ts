import { ref, computed, readonly } from 'vue';
import type { User } from 'firebase/auth';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/model/firebaseConfig';

const user = ref<User | null>(null);
const ready = ref(false);
let initialized = false;

export function initAuth() {
  if (initialized) return;
  initialized = true;
  onAuthStateChanged(auth, (u) => {
    user.value = u;
    ready.value = true;
  });
}

export default function useAuth() {
  // garante que o listener exista (idempotente)
  initAuth();

  return {
    user: readonly(user),
    ready: readonly(ready),
    isAuthenticated: computed(() => !!user.value),
    async signOut() {
      await firebaseSignOut(auth);
      // onAuthStateChanged atualizará `user`
    }
  };
}