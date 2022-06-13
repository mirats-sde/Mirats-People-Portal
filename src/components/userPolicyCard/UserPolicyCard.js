import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { firestoredb, storage } from "../../firebase-config";
import { userAuthContext } from "../../pages/context/Userauthcontext";
import styles from "./UserPolicyCard.module.css";

const UserPolicyCard = () => {
  const { user } = useContext(userAuthContext);
  const [policies, setPolicies] = useState([{}]);
  const [policyStatus, setPolicyStatus] = useState([]);

  const policiesref = ref(storage, `peoples-portal/miratsinsights/Policies`);

  async function getPolicies() {
    listAll(policiesref).then((res) => {
      res.items.forEach((itemref) => {
        setPolicies([]);
        getDownloadURL(itemref).then((url) => {
          setPolicies((prear) => [
            ...prear,
            {
              name: itemref.name,
              url: url,
              policy_status: false,
            },
          ]);
        });
      });
    });
  }

  //get policy status
  async function getPoliciesStatus() {
    const q = query(
      collection(
        firestoredb,
        "miratsinsights",
        "peoples",
        "employee",
        String(user?.uid),
        "policy"
      )
    );
    onSnapshot(q, (querysnapshot) => {
      querysnapshot.forEach((doc) => {
        let data = doc.data();
        setPolicyStatus((prevData) => {
          return {
            ...prevData,
            [data?.policy_name]: data?.policy_status,
          };
        });
      });
    });
  }

  useEffect(() => {
    getPolicies();
  }, []);

  useEffect(() => {
    getPoliciesStatus();
  }, [user]);

  console.log(policyStatus);

  //handle form submit
  const handleFormSubmit = async (e, policyname, policyurl) => {
    e.preventDefault();
    await setDoc(
      doc(
        firestoredb,
        "miratsinsights",
        "peoples",
        "employee",
        String(user?.uid),
        "policy",
        policyname
      ),
      {
        policy_name: policyname,
        policy_url: policyurl,
        policy_status: e.target.checked,
      },
      { merge: true }
    );
    console.log("policy status added!");
  };

  console.log(policyStatus);

  return (
    <>
      <div className={styles.policy_card}>
        {policies.map((item) => (
          <section className={styles.policy_card_body}>
            <h1>{item.name}</h1>
            <br />
            {policyStatus?.[item.name] ? (
              <p>Agreed</p>
            ) : (
              <>
                <input
                  type="checkbox"
                  name="statuscheck"
                  onClick={(e) => {
                    handleFormSubmit(e, item.name, item.url);
                  }}
                />{" "}
                Agree to Policy?
              </>
            )}
            <br />
            <a href={item.url}>Read Policy </a>
          </section>
        ))}
      </div>
    </>
  );
};

export default UserPolicyCard;
