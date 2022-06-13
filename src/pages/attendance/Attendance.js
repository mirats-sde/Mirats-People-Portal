import Header from "../../components/header/Header";
import ProfileIntro from "../../components/profile_Intro/ProfileIntro";
import DashboardStats from "../../components/dashboard_stats/DashboardStats";
import Navigation from "../../components/navigation/Navigation";
import Table, { msToTime } from "../../components/table/Table";
import styles from "./Attendance.module.css";
import portalprofile from "../../assets/default-profile.jpeg";
import Footer from "../../components/footer/Footer";
import { useContext, useEffect, useState } from "react";
import { userAuthContext } from "../context/Userauthcontext";
import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  orderBy,
} from "firebase/firestore";
import { firestoredb } from "../../firebase-config";

//getting nowtime and printing greet message
let Greet = "";
const nowtime = new Date().getHours();
// console.log(nowtime);
if (nowtime >= 5 && nowtime < 12) {
  Greet = "Morning";
} else if (nowtime >= 12 && nowtime <= 16) {
  Greet = "Afternoon";
} else if (nowtime > 16 && nowtime < 23) {
  Greet = "Good Evening";
} else {
  Greet = "Night";
}

const Attendance = () => {
  const { user, userData, profileimage, loading } = useContext(userAuthContext);
  const [Punchindisable, setPunchinDisable] = useState(false);
  const [Punchoutdisable, setPunchoutDisable] = useState(true);
  const [AttendanceData, setAttendanceData] = useState([]);
  const [currentmonth, setCurrentmonth] = useState(
    new Date()?.toLocaleDateString("en-CA", { month: "long" })
  );
  const [AttendanceDataCopy, setAttendanceDataCopy] = useState([]);
  const [filters, setFilters] = useState({
    month: new Date()?.toLocaleDateString("en-CA", { month: "long" }),
    year: new Date()?.toLocaleDateString("en-CA", { year: "numeric" }),
  });

  const [halfdayShift, setHalfdayShift] = useState();
  const [fulldayShift, setFulldayShift] = useState();

  //attendance intro
  const attendanceintro = [
    {
      time: Greet,
      profileName: userData?.basicinfo?.firstname,
      profiledesc: "Here is what your dashboard looks like today.",
      profileimg: profileimage?.url || portalprofile,
    },
  ];

  // UseEffect to check punchin and punchout of a user
  useEffect(() => {
    const now_time = new Date();
    const night_time = new Date(
      new Date()?.getFullYear(),
      new Date()?.getMonth(),
      new Date()?.getDate() - 1,
      23,
      59,
      59
    );
    if (now_time < night_time) {
      // console.log("in moring");
      if (user?.uid) {
        onSnapshot(
          doc(
            firestoredb,
            "miratsinsights",
            "peoples",
            "employee",
            String(user?.uid),
            "attendance",
            new Date().toDateString()
          ),
          (doc) => {
            if (doc.exists()) {
              setPunchoutDisable(false);
              if (doc.data()?.PunchOut) {
                setPunchoutDisable(true);
              }
              setPunchinDisable(true);
            } else {
              setPunchinDisable(false);
              setPunchoutDisable(true);
            }
          }
        );
      }
    } else {
      if (user?.uid) {
        onSnapshot(
          doc(
            firestoredb,
            "miratsinsights",
            "peoples",
            "employee",
            String(user?.uid),
            "attendance",
            new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate() - 1,
              new Date().getHours(),
              new Date().getMinutes(),
              new Date().getSeconds()
            ).toDateString()
          ),
          (doc) => {
            if (doc.exists()) {
              setPunchoutDisable(false);
              if (doc.data()?.PunchOut) {
                setPunchoutDisable(true);
              }
              setPunchinDisable(true);
            } else {
              setPunchinDisable(false);
              setPunchoutDisable(true);
            }
          }
        );
      }
    }
  }, [user]);

  useEffect(() => {
    if (!loading) {
      if (user) {
        GetAttendanceData(user?.uid);
      }
    }
  }, [user, loading, userData]);

  //handle punchin:
  const handlePunchin = async (e) => {
    e.preventDefault();
    await setDoc(
      doc(
        firestoredb,
        "miratsinsights",
        "peoples",
        "employee",
        String(user?.uid),
        "attendance",
        new Date().toDateString()
      ),
      {
        userId: String(user?.uid),
        Date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        PunchIn: new Date(),
        day: parseInt(
          new Date()?.toLocaleDateString("en-CA", {
            day: "numeric",
          })
        ),
      },
      { merge: true }
    ).then(() => {
      setPunchinDisable(true);
      setPunchoutDisable(false);
      console.log("Punchin added successfully");
    });
  };

  const nextday_time = new Date(
    new Date()?.getFullYear(),
    new Date()?.getMonth(),
    new Date()?.getDate() + 1,
    new Date().getHours(),
    new Date().getMinutes(),
    new Date().getSeconds()
  );

  const now_time = new Date(
    new Date()?.getFullYear(),
    new Date()?.getMonth(),
    new Date()?.getDate(),
    new Date().getHours(),
    new Date().getMinutes(),
    new Date().getSeconds()
  );

  const night_time = new Date(
    new Date()?.getFullYear(),
    new Date()?.getMonth(),
    new Date()?.getDate(),
    23,
    59,
    59
  );

  // console.log(nextday_time > night_time);
  // console.log(now_time < night_time);

  // console.log(
  //   new Date(
  //     new Date()?.getFullYear(),
  //     new Date()?.getMonth(),
  //     1 - 1,
  //     23,
  //     59,
  //     59
  //   )
  // );

  //handle punchout:
  const handlePunchout = async (e) => {
    e.preventDefault();
    console.log("punchout clicked");
    const now_time = new Date();
    const night_time = new Date(
      new Date()?.getFullYear(),
      new Date()?.getMonth(),
      new Date()?.getDate(),
      23,
      59,
      59
    );
    console.log(now_time);
    console.log(night_time);
    //morning
    if (now_time < night_time) {
      console.log("in morning shift");
      await setDoc(
        doc(
          firestoredb,
          "miratsinsights",
          "peoples",
          "employee",
          String(user?.uid),
          "attendance",
          new Date().toDateString()
        ),
        {
          PunchOut: new Date(),
        },
        { merge: true }
      ).then(() => {
        setPunchoutDisable(true);
        console.log("PunchOut added successfully");
      });
    }
    //night
    else {
      console.log("in night shift");
      await setDoc(
        doc(
          firestoredb,
          "miratsinsights",
          "peoples",
          "employee",
          String(user?.uid),
          "attendance",
          new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate() - 1,
            new Date().getHours(),
            new Date().getMinutes(),
            new Date().getSeconds()
          ).toDateString()
        ),
        {
          PunchOut: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate() - 1,
            new Date().getHours(),
            new Date().getMinutes(),
            new Date().getSeconds()
          ),
        },
        { merge: true }
      ).then(() => {
        setPunchoutDisable(true);
        console.log("PunchOut added successfully");
      });
    }
  };

  //getting all attendance data:
  async function GetAttendanceData(id) {
    const q = query(
      collection(
        firestoredb,
        "miratsinsights",
        "peoples",
        "employee",
        String(id),
        "attendance"
      ),
      orderBy("day", "desc")
    );
    onSnapshot(q, (querySnapshot) => {
      setAttendanceData([]);
      setAttendanceDataCopy([]);
      querySnapshot.forEach((doc) => {
        setAttendanceDataCopy((prearr) => [...prearr, doc.data()]);
        if (
          new Date(doc.id)?.toLocaleDateString("en-CA", { month: "long" }) ===
            new Date()?.toLocaleDateString("en-CA", { month: "long" }) &&
          new Date(doc.id)?.toLocaleDateString("en-CA", { year: "numeric" }) ===
            new Date()?.toLocaleDateString("en-CA", { year: "numeric" })
        ) {
          //user attendance:
          let userAttendanceTime =
            doc.data()?.PunchOut?.toDate() - doc.data()?.PunchIn.toDate();
          // console.log(userAttendanceTime);

          // user shift:
          let userShiftTime =
            userData?.WorkDetails?.shift?.end_time?.toDate() -
            userData?.WorkDetails?.shift?.start_time?.toDate();
          // console.log(userShiftTime);

          //full day shift:
          let fulldayshift = msToTime(
            userData?.WorkDetails?.shift?.end_time?.toDate() -
              userData?.WorkDetails?.shift?.start_time?.toDate()
          );
          setFulldayShift(fulldayshift);

          //half day shift:
          let halfdayshift = msToTime(
            (userData?.WorkDetails?.shift?.end_time?.toDate() -
              userData?.WorkDetails?.shift?.start_time?.toDate()) /
              2
          );
          setHalfdayShift(halfdayshift);

          //setting data in body with overtime and production
          let body = {
            ...doc.data(),
            overtime:
              userShiftTime < userAttendanceTime
                ? msToTime(userAttendanceTime - userShiftTime)
                : "00:00:00",
            production: doc.data()?.PunchOut
              ? msToTime(userAttendanceTime)
              : "00:00:00",
          };
          setAttendanceDataCopy((prearr) => [...prearr, body]);
          setAttendanceData((prearr) => [...prearr, body]);
        }
      });
    });
  }

  useEffect(() => {
    setAttendanceData(AttendanceDataCopy);
    filterAttendance();
  }, [filters]);

  // console.log(filters);
  const filterAttendance = () => {
    Object.keys(filters)?.map((key) => {
      // console.log(key);
      switch (key) {
        case "month":
          return setAttendanceData((prevData) => {
            return prevData?.filter((data) => {
              return (
                filters?.month ===
                new Date(data?.Date)?.toLocaleDateString("en-CA", {
                  month: "long",
                })
              );
            });
          });
        case "overtime":
          return setAttendanceData((prevData) => {
            return prevData?.filter((data) => {
              console.log(data);
              if (
                new Date(data?.Date)?.toLocaleDateString("en-CA", {
                  month: "long",
                  year: "numeric",
                }) ===
                new Date()?.toLocaleDateString("en-CA", {
                  month: "long",
                  year: "numeric",
                })
              ) {
                return data?.overtime >= filters?.overtime;
              }
            });
          });
        case "year":
          return setAttendanceData((prevData) => {
            return prevData?.filter((data) => {
              return (
                filters?.year === String(new Date(data?.Date)?.getFullYear())
              );
            });
          });
        case "prod_type":
          return setAttendanceData((prevData) => {
            return prevData?.filter((data) => {
              if (
                new Date(data?.Date)?.toLocaleDateString("en-CA", {
                  month: "long",
                  year: "numeric",
                }) ===
                new Date()?.toLocaleDateString("en-CA", {
                  month: "long",
                  year: "numeric",
                })
              ) {
                return data?.production >= filters?.prod_type;
                // console.log(filters?.prod_type);
                // console.log(data?.production);
                // if (data?.production <= filters?.prod_type) {
                //   console.log(data?.production);
                // }
                //  else {
                //   console.log(data?.production);
                // }
              }
            });
          });
        default:
          return;
      }
    });
  };

  async function filterMonthAttendance(month) {
    setAttendanceData(
      AttendanceDataCopy?.filter((data) => {
        return (
          month ===
          new Date(data?.Date)?.toLocaleDateString("en-CA", { month: "long" })
        );
      })
    );
  }

  return (
    <div className={styles.attendance}>
      <Header />
      <ProfileIntro profileintrodata={attendanceintro} />

      {/* stats cards */}
      <DashboardStats />

      {/* navigation */}
      <Navigation />

      <div className={styles.attendance_container}>
        {/* attendance cards */}
        <div className={styles.attendance_cards}>
          <section className={styles.attendance_banner}>
            <h1>Attendance</h1>
            <p>Mark your attendance</p>
          </section>

          <section className={styles.work_banner}>
            <h1>Start Your Day!</h1>
            <p>Punch-in and get started with your work.</p>
          </section>

          <div className={styles.punch_attendance}>
            <section className={styles.login}>
              <button onClick={handlePunchin} disabled={Punchindisable}>
                Log in your attendance
              </button>
            </section>
            <section className={styles.logout}>
              <button onClick={handlePunchout} disabled={Punchoutdisable}>
                Log out your attendance
              </button>
            </section>
          </div>
        </div>

        {/* attendance filter */}
        <div className={styles.attendance_filter}>
          <h1>Filters for Attendance Log</h1>
          <div className={styles.filter_cards}>
            <section className={styles.cardbody}>
              <p>Month</p>
              <select
                value={filters?.month}
                onChange={(e) => {
                  setFilters((prevData) => {
                    return {
                      ...prevData,
                      month: e.target.value,
                    };
                  });
                  setCurrentmonth(e.target.value);
                  filterMonthAttendance(e.target.value);
                }}
              >
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </section>
            <section className={styles.cardbody}>
              <p>Overtime</p>
              <select
                value={filters?.overtime}
                onChange={(e) => {
                  setFilters((prevData) => {
                    return {
                      ...prevData,
                      overtime: e.target.value,
                    };
                  });
                }}
              >
                <option selected disabled hidden>
                  select overtime
                </option>
                <option value={"00:30:00"}>30 mins</option>
                <option value={"00:60:00"}>60 mins</option>
              </select>
            </section>
            <section className={styles.cardbody}>
              <p>Prod. Type</p>
              <select
                value={filters?.prod_type}
                onChange={(e) => {
                  setFilters((prevData) => {
                    return {
                      ...prevData,
                      prod_type: e.target.value,
                    };
                  });
                }}
              >
                <option selected disabled hidden>
                  select production type
                </option>
                <option value={halfdayShift}>Half Day Only</option>
                <option value={fulldayShift}>Full Day Only</option>
              </select>
            </section>
            <section className={styles.cardbody}>
              <p>Year</p>
              <select
                value={filters?.year}
                onChange={(e) => {
                  setFilters((prevData) => {
                    return {
                      ...prevData,
                      year: e.target.value,
                    };
                  });
                }}
              >
                <option selected disabled hidden>
                  select year
                </option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
              </select>
            </section>
          </div>
        </div>

        {/* attendance table */}
        <div className={styles.attendance_table}>
          <Table
            AttendanceData={AttendanceData}
            setAttendanceData={setAttendanceData}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Attendance;
