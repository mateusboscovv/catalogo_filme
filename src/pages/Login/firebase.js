import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCeXGofdeFt8t0XLOrCHk-qXjBworFrKUU",
  authDomain: "plodastico.firebaseapp.com",
  databaseURL: "https://plodastico-default-rtdb.firebaseio.com",
  projectId: "plodastico",
  storageBucket: "plodastico.appspot.com",
  messagingSenderId: "869284273060",
  appId: "1:869284273060:web:05816c4b8a6a354b9fff31",
  measurementId: "G-J6PFV644HP"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// Funções de autenticação
export async function registrarUsuario(email, senha) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

export async function loginUsuario(email, senha) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

export async function logoutUsuario() {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
}

// Função para salvar dados do perfil
export async function salvarPerfil(uid, dados) {
  try {
    await set(ref(database, `perfis/${uid}`), dados);
  } catch (error) {
    throw error;
  }
}

// Função para carregar dados do perfil
export async function carregarPerfil(uid) {
  try {
    const snapshot = await get(ref(database, `perfis/${uid}`));
    return snapshot.val();
  } catch (error) {
    throw error;
  }
}

export { auth, database };