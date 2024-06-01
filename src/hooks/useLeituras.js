import { database, query, child, get, push, set, remove } from '../services/firebase';

const refLeituras = ref(database, 'leituras/');

export function getExams() {
  return get(query(refLeituras)).then((snapshot) => {
    if (snapshot.exists()) {
      return(snapshot.val());
    } else {
      return [];
    }
  }).catch((error) => {
    console.error(error);
    return [];
  });
}

export function addExam(examData) {
  push(refLeituras, examData);
}

export function updateExam(examID, examData) {
  set(child(refLeituras, examID), examData);
}

export function removeExam(examID) {
  remove(child(refLeituras, examID));
}
