import {
  addDoc,
  collection,
  getDoc,
  updateDoc,
  setDoc,
  getDocs,
  orderBy,
  query,
  doc,
} from "firebase/firestore";
import { firestoredb } from "../firebase-config";

export const getAllLeaves = async (uid) => {
  return await getDocs(
    query(
      collection(
        firestoredb,
        "miratsinsights",
        "employees",
        "employee",
        uid,
        "leave"
      ),
      orderBy("apply_date", "desc")
    )
  );
};

export const addLeave = async (leaveData, uid, cntNumberOfDays) => {
  let id = leaveData?.id;
  delete leaveData?.id;
  return await setDoc(
    doc(
      firestoredb,
      "miratsinsights",
      "employees",
      "employee",
      uid,
      "leave",
      String(leaveData?.from_date?.toDate()?.toDateString())
    ),
    {
      ...leaveData,
      status: "Pending",
      apply_date: new Date(),
      number_of_days: cntNumberOfDays,
    }
  );
};

export const updateLeave = async (leaveData, uid, cntNumberOfDays) => {
  let id = leaveData?.id;
  delete leaveData?.id;
  return await setDoc(
    doc(
      firestoredb,
      "miratsinsights",
      "employees",
      "employee",
      uid,
      "leave",
      id
    ),
    {
      ...leaveData,
      status: "pending",
      apply_date: new Date(),
      number_of_days: cntNumberOfDays,
    },
    {
      merge: true,
    }
  );
};
