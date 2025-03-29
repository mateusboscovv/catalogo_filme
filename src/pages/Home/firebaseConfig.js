import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push } from "firebase/database";


// Configuração do Firebase
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


// Função para salvar o texto no Realtime Database
export async function salvarTextoNoFirebase(texto) {
  if (!texto.trim()) {
    throw new Error("O campo está vazio. Nada será enviado.");
  }

  try {
    const textosRef = ref(database, "textos");
    const novoTextoRef = push(textosRef);
    await set(novoTextoRef, {
      conteudo: texto,
      timestamp: Date.now() // Adiciona timestamp para ordenação
    });
    return true;
  } catch (error) {
    console.error("Erro ao salvar o texto:", error);
    throw error;
  }
}

// Função opcional para ler os textos
export async function lerTextosDoFirebase() {
  try {
    const textosRef = ref(database, "textos");
    const snapshot = await get(textosRef);
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null;
  } catch (error) {
    console.error("Erro ao ler textos:", error);
    throw error;
  }
}

export { database };