import portalprofile from "../../assets/portalprofile.jpeg";
import styles from "./Dashboard.module.css";
import idimg from "../../assets/idimg.png";
import personalInfoImgmodified from "../../assets/personalInfoImgmodified.png";
import financecard from "../../assets/financecard.png";
import identitycard from "../../assets/identitycard.png";
import workdetails from "../../assets/workdetails.png";
import workpolicycard from "../../assets/workpolicycard.png";

import Header from "../../components/header/Header";
import ProfileIntro from "../../components/profile_Intro/ProfileIntro";

const dashboardintro = [
  {
    time: "Afternoon",
    profileName: "Rohan",
    profiledesc: "Here is your dashboard looks like today.",
    profileimg: portalprofile,
  },
];

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <Header />
      <ProfileIntro profileintrodata={dashboardintro} />

      {/* stats cards */}
      <div className={styles.dashboard_stats}>
        <div className={styles.stats_card}>
          <section className={styles.stats_body}>
            <h2>days</h2>
            <span>24</span>
          </section>
          <section className={styles.monthly_stats}>
            <p>worked this month</p>
          </section>
        </div>
        <div className={styles.stats_card}>
          <section className={styles.stats_body}>
            <h2>days</h2>
            <span>0</span>
          </section>
          <section className={styles.monthly_stats}>
            <p>absent this month</p>
          </section>
        </div>
        <div className={styles.stats_card}>
          <section className={styles.stats_body}>
            <h2>days</h2>
            <span>2</span>
          </section>
          <section className={styles.monthly_stats}>
            <p>taken leave this year</p>
          </section>
        </div>
        <div className={styles.stats_card}>
          <section className={styles.stats_body}>
            <h2>3 feb</h2>
            <span>22</span>
          </section>
          <section className={styles.monthly_stats}>
            <p>joining date</p>
          </section>
        </div>
        <div className={styles.stats_card}>
          <section className={styles.stats_body}>
            <h2>3 Oct</h2>
            <span>99</span>
          </section>
          <section className={styles.monthly_stats}>
            <p>date of birth</p>
          </section>
        </div>
      </div>

      {/* navigation */}
      <div className={styles.navigation}>
        <nav>
          <ul>
            <li>
              Attendance
              {/* <Link to="/dashboard/attendance">Attendance</Link> */}
            </li>
            <li>Leave</li>
            <li>Salary</li>
            <li>Policies</li>
            <li>Resignation</li>
          </ul>
        </nav>
      </div>

      {/* dashboard cards */}
      <div className={styles.dashboard_cards}>
        <div className={styles.id_details_cards}>
          <section className={styles.left_grid}>
            <section className={styles.idinfo_card}>
              <h1>Mirats Insights ID</h1>
              <p className={styles.email}>rohan.gupta@miratsinsights.com</p>
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
            {/* announcements */}
            <section className={styles.announcements}>
              <h1>Announcements</h1>
              <p>Notices, Annoucements, Updates</p>
            </section>
          </section>

          {/* right grid */}
          <section className={styles.right_grid}>
            <section className={styles.personal_info_card}>
              <figure>
                <img src={personalInfoImgmodified} alt="cardimg" />
              </figure>
              <section className={styles.card_details}>
                <h1>Personal Information</h1>
                <p>
                  Manage your personal information, including phone numbers and
                  email addresses where you can be contacted.
                </p>
              </section>
            </section>
            {/* financial identity details */}
            <div className={styles.financial_identity}>
              <section className={styles.financial_details}>
                <div className={styles.text_card}>
                  <h1>Financial Details</h1>
                  <img src={financecard} alt="financecard" />
                </div>
                <p>Bank Account Details, UPI Details, Transaction History.</p>
              </section>
              <section className={styles.identity_details}>
                <div className={styles.text_card}>
                  <h1>Identity Details</h1>
                  <img src={identitycard} alt="identitycard" />
                </div>
                <p>Bank Account Details, UPI Details, Transaction History.</p>
              </section>
            </div>
          </section>
        </div>

        {/* work, documents, policies */}
        <div className={styles.bottom_details_cards}>
          <section className={styles.work_documents}>
            <section className={styles.work_details_card}>
              <section className={styles.work_info_card}>
                <figure>
                  <img src={workdetails} alt="cardimg" />
                </figure>
                <section className={styles.card_details}>
                  <h1>Work Details</h1>
                  <p>
                    , including position, shift, location, designation, team
                    name and department.
                  </p>
                </section>
              </section>
              <section className={styles.documents_card}>
                <section className={styles.document_card_details}>
                  <h1>Documentation & Legal</h1>
                  <p>
                    Checkout the documentation section - you'll find your latest
                    and updated offer letters, promotion offers, ESIC document
                    *(if applicable) and you can submit documents to review and
                    get approved for benefits offered by Mirats Insights.
                  </p>
                </section>
              </section>
            </section>
          </section>
          <section className={styles.policies}>
            <figure>
              <img src={workpolicycard} alt="policyimg" />
            </figure>
            <h1>Policies</h1>
            <p>
              Review and agree to the work and privacy policies we have in our
              company.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
