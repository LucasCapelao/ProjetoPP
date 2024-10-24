import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';

const firebaseConfig = {
    apiKey: "AIzaSyDdmPX3kju6-iacfHfA016rs2uoPaxVGFQ",
    authDomain: "projetopp-741c1.firebaseapp.com",
    databaseURL: "https://projetopp-741c1-default-rtdb.firebaseio.com",
    projectId: "projetopp-741c1",
    storageBucket: "projetopp-741c1.appspot.com",
    messagingSenderId: "873404385280",
    appId: "1:873404385280:web:7af95755dc9cdccaf9f0e5",
    measurementId: "G-GCLLWDW9BH"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getFirestore();
export const auth = getAuth();
export const storage = getStorage(app);

async function readAsBlob(uri) {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
}

async function ultimaFuncao(uri, fileName) {
  const fileBlob = await readAsBlob(uri);

  const storage = getStorage();
  const storageRef = ref(storage, fileName);

  await uploadBytes(storageRef, fileBlob, {
    contentType: fileBlob.type || 'image/jpeg'
  });

  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}

export default ultimaFuncao;

export function buscarImagem(refImage) {
  const imageRef = ref(storage, refImage);
  return getDownloadURL(imageRef)
    .then((url) => {
      console.log('URL da imagem:', url); 
      return url;
    })
    .catch((error) => {
      console.error("Erro ao buscar a imagem: ", error);
      return null; // Em caso de erro, retorna null
    });
}
  

export {app,firebaseConfig}
