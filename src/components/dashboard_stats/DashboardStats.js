import {
  collection,
  doc,
  onSnapshot,
  query,
  QuerySnapshot,
} from "firebase/firestore";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { firestoredb } from "../../firebase-config";
import { userAuthContext } from "../../pages/context/Userauthcontext";
import styles from "./DashboardStats.module.css";

const DashboardStats = () => {
  const { user, userData } = useContext(userAuthContext);
  const [attendanceData, setAttendanceData] = useState([]);

  //getting worked days this month:
  async function getAttendanceData(id) {
    const q = query(
      collection(
        firestoredb,
        "miratsinsights",
        "employees",
        "employee",
        String(id),
        "attendance"
      )
    );
    onSnapshot(q, (QuerySnapshot) => {
      setAttendanceData([]);
      QuerySnapshot.forEach((doc) => {
        if (
          new Date(doc.id)?.getMonth() === new Date()?.getMonth() &&
          new Date(doc.id)?.getFullYear() === new Date()?.getFullYear()
        ) {
          setAttendanceData((prear) => [...prear, doc.id]);
        }
      });
    });
  }

  // const [doj, setdoj] = useState(0);

  useEffect(() => {
    // setdoj({
    //   ...doj,
    //   statsHead:
    //     userData?.WorkDetails?.doj?.toDate()?.getDate() +
    //     " " +
    //     userData?.WorkDetails?.doj
    //       ?.toDate()
    //       ?.toLocaleDateString("en-US", { month: "short" }),
    //   statsNo: userData?.WorkDetails?.doj
    //     ?.toDate()
    //     ?.toLocaleDateString("en-US", { year: "2-digit" }),
    // });
  }, [userData]);

  // console.log(doj);

  useEffect(() => {
    getAttendanceData(user?.uid);
  }, [user?.uid]);

  const dashboardstatsdata = [
    {
      statsHeading: "days",
      statsNumber: attendanceData?.length,
      statsFooter: "worked this month",
    },
    {
      statsHeading: "days",
      statsNumber: "0",
      statsFooter: "absent this month",
    },
    {
      statsHeading: "days",
      statsNumber: "0",
      statsFooter: "taken leave this year",
    },
    {
      statsHeading:
        userData?.WorkDetails?.doj?.toDate()?.getDate() +
        " " +
        userData?.WorkDetails?.doj
          ?.toDate()
          ?.toLocaleDateString("en-US", { month: "short" }),
      statsNumber: userData?.WorkDetails?.doj
        ?.toDate()
        ?.toLocaleDateString("en-US", { year: "2-digit" }),
      statsFooter: "joining date",
    },
    {
      statsHeading:
        userData?.basicinfo?.dob?.toDate()?.getDate() +
        " " +
        userData?.basicinfo?.dob
          ?.toDate()
          ?.toLocaleDateString("en-US", { month: "short" }),
      statsNumber: userData?.basicinfo?.dob
        ?.toDate()
        ?.toLocaleDateString("en-US", { year: "2-digit" }),
      statsFooter: "date of birth",
    },
  ];

  return (
    <div className={styles.dashboard_stats}>
      {dashboardstatsdata.map((data) => (
        <div className={styles.stats_card} key={uuid()}>
          <section className={styles.stats_body}>
            <h2>{data.statsHeading}</h2>
            <span>{data.statsNumber}</span>
          </section>
          <section className={styles.monthly_stats}>
            <p>{data.statsFooter}</p>
          </section>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
