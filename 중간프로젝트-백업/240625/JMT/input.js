const firebaseConfig = {
  apiKey: "AIzaSyBiyG3AdHa7uWa4miLcAqCQGqQhaC-amD4",
  authDomain: "daejeon-loveu.firebaseapp.com",
  projectId: "daejeon-loveu",
  storageBucket: "daejeon-loveu.appspot.com",
  messagingSenderId: "952789620772",
  appId: "1:952789620772:web:8e1b46f0e4c99dab9ea0b1",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function getDatas(collectionName) {
  const querySnapshot = await db.collection(collectionName).get();
  return querySnapshot;
}

// 특정 문서에서 데이터를 가져오는 함수
async function getDocument(collectionName, docId) {
  const docRef = db.collection(collectionName).doc(docId);
  const doc = await docRef.get();
  if (!doc.exists) {
    console.log("No such document!");
    return null;
  } else {
    return doc.data();
  }
}
async function addDatas(collectionName, addObj) {
  const result = await db.collection(collectionName).add(addObj);
  return result;
}
async function addFieldToArrayInDocument(
  collectionName,
  docId,
  fieldName,
  newObj
) {
  const docRef = db.collection(collectionName).doc(docId);

  // Firestore의 arrayUnion을 사용하여 새로운 객체를 배열에 추가
  await docRef.update({
    [fieldName]: firebase.firestore.FieldValue.arrayUnion(newObj),
  });

  return docRef.get();
}
async function updateArrayInDocument(
  collectionName,
  docId,
  fieldName,
  updatedArray
) {
  const docRef = db.collection(collectionName).doc(docId);

  // 전체 배열을 업데이트
  await docRef.update({
    [fieldName]: updatedArray,
  });

  return docRef.get();
}

async function deleteDatas(collectionName, docId) {
  const docRef = db.collection(collectionName).doc(docId);
  await docRef.delete();
  return true;
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
// async function deleteFieldToArrayInDocument(
//   collectionName,
//   docId,
//   fieldName,
//   newObj
// ) {
//   const docRef = db.collection(collectionName).doc(docId);

//   // Firestore의 arrayUnion을 사용하여 새로운 객체를 배열에 추가
//   await docRef.update({
//     [fieldName]: firebase.firestore.FieldValue.delete(newObj),
//   });

//   return docRef.get();
// }

async function updateDatas(collectionName, docId, updateObj) {
  await db.collection(collectionName).doc(docId).update(updateObj);
}
