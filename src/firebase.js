import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyChDhCi1jFkLmmOWQGkQu8tlPia9jdjfbM",
  authDomain: "vue-kinocms-5ad4c.firebaseapp.com",
  databaseURL: "https://vue-kinocms-5ad4c-default-rtdb.firebaseio.com",
  projectId: "vue-kinocms-5ad4c",
  storageBucket: "vue-kinocms-5ad4c.appspot.com",
  messagingSenderId: "9675706738",
  appId: "1:9675706738:web:86e4b0d2dce95e66590deb",
  measurementId: "G-Y04ZTLZL6Y",
};

initializeApp(firebaseConfig);

import {
  getDatabase,
  ref,
  set,
  child,
  get,
  update,
  onValue,
  remove
} from "firebase/database";
const db = getDatabase(),
  refDb = ref,
  setDb = set,
  childDb = child,
  getDb = get,
  updateDb = update,
  onValueDb = onValue,
  removeDb = remove;
export { db, refDb, setDb, childDb, getDb, updateDb, onValueDb, removeDb };
