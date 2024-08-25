import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as FileSystem from 'expo-file-system';

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

export function salvarImagem (idFirebase,file){
    const storageRef = ref(storage, `userPhoto-${idFirebase}`);
    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });
    let retorno;
    getDownloadURL(storageRef)
    .then((url) => {
        console.log(url)
        retorno = url;
    })
    return retorno;
}

// export async function uploadImageAsync(uri, idFirebase) {
//     let blob = await new Promise((resolve, reject) => {
//       let xhr = new XMLHttpRequest();
//       xhr.onload = function () {
//         resolve(xhr.response);
//       };
//       xhr.onerror = function (e) {
//         console.log(e);
//         reject(new TypeError('Network request failed'));
//       };
//       xhr.responseType = 'blob';
//       xhr.open('GET', uri, true);
//       xhr.send(null);
//     });
  
//     let fileRef = ref(getStorage(), `user${idFirebase}`);
//     let result = await uploadBytes(fileRef, blob);
//     blob.close(); // Ensure blob is closed and released
  
//     return await getDownloadURL(fileRef);
//   }

export async function uploadImageAsync(uri, idFirebase) {
    try {
      console.log('Uploading image:', uri);
  
      // Fetch the file as a blob
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }
      const blob = await response.blob();
  
      console.log('Blob size:', blob.size);
  
      // Create a reference to the Firebase Storage location
      const storage = getStorage();
      const fileRef = ref(storage, `user${idFirebase}`);
  
      // Upload the file to Firebase Storage
      const uploadResult = await uploadBytes(fileRef, blob);
      console.log('Upload successful:', uploadResult);
  
      // Close the blob after upload
      blob.close();
  
      // Add a delay before getting the download URL
      await new Promise(resolve => setTimeout(resolve, 100));
  
      // Get the download URL
      const downloadURL = await getDownloadURL(fileRef);
      console.log('Download URL:', downloadURL);
  
      return downloadURL;
    } catch (error) {
      console.error('Upload error:', error);
      throw new Error('Failed to upload image');
    }
  }

// export const  uploadImageToStorage = async (image,idFirebase) =>{
//     const uri = image
//     console.log(uri)

//     let blob;
//   try {
//     const response = await fetch(uri);
//     if (!response.ok) {
//       throw new Error('Failed to fetch image');
//     }
//     blob = await response.blob();
//     console.log(blob);

//         let storage = getStorage();
//         let fileRef = ref(storage, 'img');

//         const uploadResult = await uploadBytes(fileRef, blob);
//         console.log('Upload successful:', uploadResult);

//         const downloadURL = await getDownloadURL(fileRef);
//         console.log('Download URL:', downloadURL);
//     } catch (error) {
//         console.error('Error uploading image:', error);
//         throw error; // Propaga o erro para tratamento externo, se necessário
//       }
// }

export const uploadImageToStorage = async (image, idFirebase) => {
    const uri = image;
    console.log(uri);
  
    let blob;
    try {
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }
      blob = await response.blob();
      console.log(blob);
  
      let storage = getStorage();
      let fileRef = ref(storage, `user1${idFirebase}-${Date()}`);
  
      const uploadResult = await uploadBytes(fileRef, blob);
      console.log('Upload successful:', uploadResult);
  
      const downloadURL = await getDownloadURL(fileRef);
      console.log('Download URL:', downloadURL);
      return downloadURL; // Return the download URL
  
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error; // Propagate the error to external handling if necessary
    } finally {
      if (blob) {
        try {
          // Blob.close() might not be necessary in Expo React Native
          // blob.close();
        } catch (closeError) {
          console.warn('Failed to close blob:', closeError);
        }
      }
    }
  };

export {app,firebaseConfig}
