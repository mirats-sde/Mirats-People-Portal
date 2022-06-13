import styles from "./Dashboard.module.css";
import idimg from "../../assets/idimg.png";
import personalInfoImgmodified from "../../assets/personalInfoImgmodified.png";
import financecard from "../../assets/financecard.png";
import identitycard from "../../assets/identitycard.png";
import workdetails from "../../assets/workdetails.png";
import workpolicycard from "../../assets/workpolicycard.png";
import Header from "../../components/header/Header";
import ProfileIntro from "../../components/profile_Intro/ProfileIntro";
import DashboardStats from "../../components/dashboard_stats/DashboardStats";
import Navigation from "../../components/navigation/Navigation";
import Footer from "../../components/footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { userAuthContext } from "../context/Userauthcontext";
import portalprofile from "../../assets/default-profile.jpeg";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
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

//getting user's name from email:
const Dashboard = () => {
  let { user, logout, userData, profileimage, fingerprint } =
    useContext(userAuthContext);

  const dashboardintro = [
    {
      time: Greet,
      profileName: userData?.basicinfo?.firstname,
      profiledesc: "Here is what your dashboard looks like today.",
      profileimg: profileimage?.url || portalprofile,
    },
  ];

  useEffect(() => {
    setDoc(
      doc(
        firestoredb,
        "miratsinsights",
        "peoples",
        "employee",
        String(user?.uid)
      ),
      {
        fingerprint: arrayUnion(fingerprint),
      },
      { merge: true }
    );
  }, [user]);

  return (
    <div className={styles.dashboard}>
      <Header />

      <ProfileIntro profileintrodata={dashboardintro} />

      {/* stats cards */}
      <DashboardStats />

      {/* navigation */}
      <Navigation />

      {/* dashboard cards */}
      <div className={styles.dashboard_cards}>
        <div className={styles.id_details_cards}>
          <section className={styles.left_grid}>
            <Link to="/signin-security">
              <section className={styles.idinfo_card}>
                <h1 className={styles.colordark}>Mirats Insights ID</h1>
                <p className={styles.email}>{user?.email}</p>
                <section className={styles.links_id}>
                  <section className={styles.links}>
                    <p>Sign-in and Security,</p>
                    <p>Password,</p>
                    <p>Legacy Contact</p>
                  </section>
                  <figure>
                    <img src={idimg} alt="idimg" />
                  </figure>
                </section>
              </section>
            </Link>
            {/* announcements */}
            <section className={styles.announcements}>
              <h1>Announcements</h1>
              <p>Notices, Annoucements, Updates</p>
            </section>
          </section>

          {/* right grid */}
          <section className={styles.right_grid}>
            <Link to="/userdetails/personal-information">
              <section className={styles.personal_info_card}>
                <figure>
                  <img src={personalInfoImgmodified} alt="cardimg" />
                </figure>
                <section className={styles.card_details}>
                  <h1 className={styles.colordark}>Personal Information</h1>
                  <p>
                    Manage your personal information, including phone numbers
                    and email addresses where you can be contacted.
                  </p>
                </section>
              </section>
            </Link>
            {/* financial identity details */}

            <div className={styles.financial_identity}>
              <Link to="/userdetails/financial-details">
                <section className={styles.financial_details}>
                  <div className={styles.text_card}>
                    <h1 className={styles.colordark}>Financial Details</h1>
                    <img src={financecard} alt="financecard" />
                  </div>
                  <p>Bank Account Details, UPI Details, Transaction History.</p>
                </section>
              </Link>

              <Link to="/userdetails/identity-details">
                <section className={styles.identity_details}>
                  <div className={styles.text_card}>
                    <h1 className={styles.colordark}>Identity Details</h1>
                    <img src={identitycard} alt="identitycard" />
                  </div>
                  <p>Bank Account Details, UPI Details, Transaction History.</p>
                </section>
              </Link>
            </div>
          </section>
        </div>

        {/* work, documents, policies */}
        <div className={styles.bottom_details_cards}>
          <section className={styles.work_documents}>
            <section className={styles.work_details_card}>
              <Link to="/userdetails/work-details">
                <section className={styles.work_info_card}>
                  <figure>
                    <img src={workdetails} alt="cardimg" />
                  </figure>
                  <section className={styles.card_details}>
                    <h1 className={styles.colordark}>Work Details</h1>
                    <p>
                      , including position, shift, location, designation, team
                      name and department.
                    </p>
                  </section>
                </section>
              </Link>
              <Link to="/userdetails/documents">
                <section className={styles.documents_card}>
                  {/* <section className={styles.document_card_details}> */}
                  <h1 className={styles.colordark}>Documentation & Legal</h1>
                  <p>
                    Checkout the documentation section - you'll find your latest
                    and updated offer letters, promotion offers, ESIC document
                    *(if applicable) and you can submit documents to review and
                    get approved for benefits offered by Mirats Insights.
                  </p>
                  {/* </section> */}
                </section>
              </Link>
            </section>
          </section>
          <Link to="/userdetails/policies">
            <section className={styles.policies}>
              <figure>
                <img src={workpolicycard} alt="policyimg" />
              </figure>
              <h1 className={styles.colordark}>Policies</h1>
              <p>
                Review and agree to the work and privacy policies we have in our
                company.
              </p>
            </section>
          </Link>
        </div>
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
