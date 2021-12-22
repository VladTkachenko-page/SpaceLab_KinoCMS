import { initializeApp } from "firebase/app";

const firebaseConfig = {
  /
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
