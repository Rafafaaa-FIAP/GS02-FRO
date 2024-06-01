import { limitToLast, orderByChild, orderByValue, startAfter, startAt } from 'firebase/database';
import { database, ref, query, child, get, push, set, remove } from '../services/firebase';

const refReadings = ref(database, 'leituras/');

function addDays(date, days) {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days);
  return newDate;
}

export function getReadings() {
  const dt_start = addDays(new Date(), -7).toLocaleDateString().split('/').reverse().join('/').replaceAll('/', '-');

  return get(query(refReadings, orderByChild('dt_leitura'), startAfter(dt_start, 'dt_leitura'))).then((snapshot) => {
    if (snapshot.exists()) {
      return (snapshot.val());
    } else {
      return [];
    }
  }).catch((error) => {
    console.error(error);
    return [];
  });
}