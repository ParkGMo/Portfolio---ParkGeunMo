import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getFirestore,
  getDocs,
  collection,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
  getDoc,
  updateDoc,
  where,
  query,
  arrayUnion,
  deleteField,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBiyG3AdHa7uWa4miLcAqCQGqQhaC-amD4",
  authDomain: "daejeon-loveu.firebaseapp.com",
  projectId: "daejeon-loveu",
  storageBucket: "daejeon-loveu.appspot.com",
  messagingSenderId: "952789620772",
  appId: "1:952789620772:web:8e1b46f0e4c99dab9ea0b1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getDatas(collectionName) {
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);

  return snapshot;
}

// query(where()) -> 다른 컬렉션에 객체값을 연결시켜주는 조건!
async function getUserPlans(collectionName, date, userId) {
  const collect = await collection(db, collectionName);
  const q = await query(
    collect,
    where("userId", "==", userId),
    where("date", "==", date)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot;
}

async function addDatas(collectionName, dataObj, userName) {
  //   문서 ID 수동

  try {
    // const saveDoc = doc(db, 컬렉션명, 문서ID)
    const saveDoc = await doc(db, collectionName, userName);
    // console.log(`doc() 결과 : ${saveDoc}`);
    const saveResult = await setDoc(saveDoc, dataObj);
    // console.log(`setDoc() 결과 : ${saveResult}`);

    // // 문서 ID 자동
    // const collect = await collection(db, collectionName);
    // await addDoc(collect, dataObj);

    return true;
  } catch (error) {
    return false;
  } finally {
  }
}

async function addFieldToArrayInDocument(
  collectionName,
  docId,
  fieldName,
  newObj
) {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      [fieldName]: arrayUnion(newObj),
    });
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

async function deleteDatas(collectionName, docId) {
  const docRef = await doc(db, collectionName, docId);
  // deleteDoc(삭제할 문서);
  await deleteDoc(docRef);
}

async function updateDatas(collectionName, docId, updateInfoObj) {
  // doc(db, 컬렉션명, 문서ID);
  const docRef = await doc(db, collectionName, docId);
  // getDocs(문서레퍼런스);
  // const docData = await getDocs(docRef);
  // updateDoc(문서데이터, 수정할정보);
  updateDoc(docRef, updateInfoObj);
}

export {
  db,
  getDatas,
  addDatas,
  deleteDatas,
  updateDatas,
  getUserPlans,
  addFieldToArrayInDocument,
};
