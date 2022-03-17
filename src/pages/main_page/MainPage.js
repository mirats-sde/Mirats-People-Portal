import cx from "classnames";
import { Link } from "react-router-dom";

// hooks
import { useParams } from "react-router-dom";

// in project imports
import styles from "./MainPage.module.css";
import portalprofile from "../../assets/portalprofile.jpeg";
// import profileImg from "../../assets/profileImg.png";
import emp from "../../assets/emp.png";
import personalInfoImgmodified from "../../assets/personalInfoImgmodified.png";
import financial from "../../assets/financial.png";
import identitydetails from "../../assets/identitydetails.png";
import workdetails from "../../assets/workdetails.png";
import workplace from "../../assets/workplace.png";
import signin from "../../assets/signin.png";
import documents from "../../assets/documents.png";
import CardInfo from "../../components/cardInfo/CardInfo";
import Footer from "../../components/footer/Footer";
import UserPolicyCard from "../../components/userPolicyCard/UserPolicyCard";
import ProfileIntro from "../../components/profile_Intro/ProfileIntro";
import Header from "../../components/header/Header";

const profiledetailsintro = [
  {
    time: "Morning",
    profileName: "Rohan",
    profiledesc: "Follow Your Passion",
    profileimg: portalprofile,
  },
];

const personalinfocarddetails = [
  {
    gradientclass: styles.personal_gradient,
    cardimg: personalInfoImgmodified,
    cardheading: "Personal Information",
    carddesc:
      "Manage your personal information, including phone numbers and email addresses where you can be contacted.",
  },
];

const financialcarddetails = [
  {
    gradientclass: styles.financial_gradient,
    cardimg: financial,
    cardheading: "Financial Details",
    carddesc:
      "Manage your financial information, including bank accounts and UPI's where we can transfer amount to you.",
  },
];

const identitycarddetails = [
  {
    gradientclass: styles.identity_gradient,
    cardimg: identitydetails,
    cardheading: "Identity Details",
    carddesc:
      "Manage your identity information, including shipping/physical address, government issued cards and other details to get enrolled in our benefits automatically.",
  },
];

const workcarddetails = [
  {
    gradientclass: styles.work_gradient,
    cardimg: workdetails,
    cardheading: "Work Details",
    carddesc:
      "Manage your identity information, including shipping/physical address, government issued cards and other details to get enrolled in our benefits automatically.",
  },
];

const signinsecuritycarddetails = [
  {
    gradientclass: styles.signin_gradient,
    cardimg: signin,
    cardheading: "Sign-In and Security",
    carddesc:
      "Manage settings related to signing to your account, account security, and how to get your recovery codes.",
  },
];

const policycarddetails = [
  {
    gradientclass: styles.policy_gradient,
    cardimg: workplace,
    cardheading: "Workspace Policies",
    carddesc:
      "Get to know the rules and policies of Mirats Insights Workplace.",
  },
];

const documentationcarddetails = [
  {
    gradientclass: styles.documents_gradient,
    cardimg: documents,
    cardheading: "Documentation & Legal",
    carddesc:
      "Get to know the rules and policies of Mirats Insights Workplace.",
  },
];

// data
const leftpages = [
  {
    name: "Personal Information",
    value: "personal-information",
    urllink: "personal-information",
  },
  {
    name: "Financial Details",
    value: "financial-details",
    urllink: "financial-details",
  },
  {
    name: "Identity Details",
    value: "identity-details",
    urllink: "identity-details",
  },
  {
    name: "Work Details",
    value: "work-details",
    urllink: "work-details",
  },
  {
    name: "Sign-In and Security",
    value: "signin-security",
    urllink: "signin-security",
  },
  {
    name: "Policies",
    value: "policies",
    urllink: "policies",
  },
  {
    name: "Documents and Legal",
    value: "documents",
    urllink: "documents",
  },
];

const MainPage = () => {
  const { detailsTypes } = useParams();

  return (
    <>
      <div className={styles.container}>
        <Header />
        <ProfileIntro profileintrodata={profiledetailsintro} />

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

        {/* profile details */}
        <div className={styles.profile_details}>
          <section className={styles.profile_left}>
            <section className={styles.profile_left_details}>
              <figure>
                <img src={emp} alt="profileimg" />
              </figure>
              <h1>Rohan Gupta</h1>
              <p>rohan.gupta@miratsinsights.com</p>
            </section>
            <section className={styles.left_pages}>
              {leftpages.map((pages, index) => {
                // console.log(detailsTypes === pages?.value);
                return (
                  <div className={styles.pages}>
                    {/* <h4 className={styles.light}>{pages.name}</h4> */}

                    <h4>
                      <Link
                        className={cx(styles.light, {
                          [styles.active]:
                            detailsTypes === pages?.value ? styles.active : "",
                        })}
                        to={`/${pages.urllink}`}
                      >
                        {pages.name}
                      </Link>
                    </h4>
                  </div>
                );
              })}
            </section>
          </section>
          <section className={styles.profile_right}>
            {(() => {
              switch (detailsTypes) {
                case "personal-information":
                  return <PersonalInformation />;
                case "financial-details":
                  return <FinancialDetails />;
                case "identity-details":
                  return <IdentityDetails />;
                case "work-details":
                  return <WorkDetails />;
                case "signin-security":
                  return <SignInSecurity />;
                case "policies":
                  return <Policies />;
                case "documents":
                  return <Documentation />;
                default:
              }
            })()}
          </section>
        </div>
        {/* footer */}
        <Footer />

        {/* container end */}
      </div>
    </>
  );
};

const PersonalInformation = () => {
  return (
    <>
      <div className={styles.profile_info}>
        <CardInfo carddata={personalinfocarddetails} />

        {/* profile details cards */}
        <div className={styles.profile_details_cards}>
          <section className={styles.card_body}>
            <h1>Name</h1>
            <p>Rohan Gupta</p>
          </section>
          <section className={styles.card_body}>
            <h1>Date of Birth</h1>
            <p>03 October, 1999</p>
          </section>
          <section className={styles.card_body}>
            <h1>Gender</h1>
            <p>Male</p>
          </section>
          <section className={styles.card_body}>
            <h1>Phone Number</h1>
            <p>+91 (890) 989 8998</p>
          </section>
          <section className={styles.card_body}>
            <h1>Personal Email</h1>
            <p>rohang@email.com</p>
          </section>
          <section className={styles.card_body}>
            <h1>Location</h1>
            <p>Mumbai, India</p>
          </section>
          <section className={styles.card_body}>
            <h1>Nickname</h1>
            <p>unspecified</p>
          </section>
          <section className={styles.card_body}>
            <h1>Profile Picture</h1>
            <p>Set Profile Picture</p>
          </section>
        </div>
      </div>
    </>
  );
};

const FinancialDetails = () => {
  return (
    <div>
      <CardInfo carddata={financialcarddetails} />
      <div className={styles.FinancialDetails_btn}>
        <button>Add Another Bank</button>
        <button>Add Another UPI</button>
      </div>
      <div className={styles.bankDetails_container}>
        <div className={styles.bank_details}>
          <section className={styles.details_wrapper}>
            <h1>Default Bank</h1>
            <p>Rohan Gupta</p>
            <p>ICICI Bank</p>
            <p>ICIC00000XXXX</p>
            <p>123456789012</p>
          </section>
          <button>Edit Details</button>
        </div>

        <div className={styles.bank_details}>
          <section className={styles.details_wrapper}>
            <h1>Default UPI</h1>
            <p>Rohan Gupta</p>
            <p>Google Pay</p>
            <p>rohang@oksbi</p>
          </section>
          <button>Edit Details</button>
        </div>

        <div className={styles.bank_details}>
          <section className={styles.details_wrapper}>
            <h1>Use Other Bank</h1>
            <p>Rohan Gupta</p>
            <p>ICICI Bank</p>
            <p>ICIC00000XXXX</p>
            <p>123456789012</p>
          </section>
          <button>Edit Details</button>
        </div>
      </div>
    </div>
  );
};

const IdentityDetails = () => {
  return (
    <div className={styles.identity_details}>
      <CardInfo carddata={identitycarddetails} />

      <section className={styles.details}>
        <button className={styles.btn_detail}>Add Passport Details</button>
        <section className={styles.details_card}>
          <section className={styles.details_card_body}>
            <h1>Physical Address</h1>
            <div className={styles.address}>
              <p>Rohan Gupta</p>
              <p>C-23, Block C,</p>
              <p>Sector 7, Dwarka</p>
              <p>New Delhi, India - 110000</p>
            </div>
            <button>Edit Details</button>
          </section>

          <section className={styles.details_card_body}>
            <h1>Driving License</h1>
            <div className={styles.address}>
              <p>Rohan Gupta</p>
              <p>03 Oct, 1999</p>
              <p>XXXXXXXXXXXX</p>
            </div>
            <button>Edit Details</button>
          </section>

          <section className={styles.details_card_body}>
            <h1>Aadhar Card</h1>
            <div className={styles.address}>
              <p>Rohan Gupta</p>
              <p>03 Oct, 1999</p>
              <p>S/O Rajesh Gupta</p>
              <p>1983 8XXX XXXX</p>
            </div>
            <button>Edit Details</button>
          </section>

          <section className={styles.details_card_body}>
            <h1>PAN Card</h1>
            <div className={styles.address}>
              <p>Rohan Gupta</p>
              <p>03 Oct, 1999</p>
              <p>S/O Rajesh Gupta</p>
              <p>BUZPK31XXX</p>
            </div>
            <button>Edit Details</button>
          </section>
        </section>
      </section>
    </div>
  );
};

const WorkDetails = () => {
  return (
    <div className={styles.work_details}>
      <CardInfo carddata={workcarddetails} />
      <div className={styles.work_details_cards}>
        <section className={styles.work_details_cards_body}>
          <h1>Position/Job Role</h1>
          <p>Software Developer Engineer</p>
          <span>Grade - A</span>
          <span>141020-1A</span>
        </section>
        <section className={styles.work_details_cards_body}>
          <h1>Department</h1>
          <p>Software and Services</p>
        </section>
        <section className={styles.work_details_cards_body}>
          <h1>Team Name</h1>
          <p>Information Technology and Services</p>
        </section>
        <section className={styles.work_details_cards_body}>
          <h1>Team Leader</h1>
          <p>Lokesh Warren Naidu</p>
          <p>Senior Software Developer Engineer</p>
          <p>lokesh.naidu@miratsinsights.com</p>
        </section>
        <section className={styles.work_details_cards_body}>
          <h1>Manager</h1>
          <p>Ayyan Ali</p>
          <p>Head of Global Sales</p>
          <p>ayaan.ali@miratsinsights.com</p>
        </section>
        <section className={styles.work_details_cards_body}>
          <h1>Date of Joining</h1>
          <p>Dec 6</p>
          <p>Year - 2021</p>
        </section>
        <section className={styles.work_details_cards_body}>
          <h1>Shift Name</h1>
          <p>Day Shift</p>
          <p>10 AM - 7 PM</p>
        </section>
        <section className={styles.work_details_cards_body}>
          <h1>Work Location</h1>
          <p>Mumbai</p>
          <p>India</p>
        </section>
      </div>
    </div>
  );
};

const SignInSecurity = () => {
  return (
    <div className={styles.signin_security}>
      <CardInfo carddata={signinsecuritycarddetails} />
      <div className={styles.signinsecutity_cards}>
        <section className={styles.signinsecutity_card_body}>
          <h1>Password</h1>
          <p>Last updated 15 March, 2022</p>
        </section>
        <section className={styles.signinsecutity_card_body}>
          <h1>Account Security</h1>
          <p>Two-factor authentication 1 trusted phone number</p>
        </section>
        <section className={styles.signinsecutity_card_body}>
          <h1>ESIC No.</h1>
          <p>Not applicable</p>
        </section>
        <section className={styles.signinsecutity_card_body}>
          <h1>Employee ID</h1>
          <p>141020-1A</p>
        </section>
        <section className={styles.signinsecutity_card_body}>
          <h1>Account Login History</h1>
          <p>2 devices used</p>
        </section>
      </div>
    </div>
  );
};

const Policies = () => {
  return (
    <div className={styles.policies}>
      <CardInfo carddata={policycarddetails} />
      <UserPolicyCard />
    </div>
  );
};

const Documentation = () => {
  return (
    <div className={styles.documentation}>
      <CardInfo carddata={documentationcarddetails} />
      <section className={styles.esic_card}>
        <h1>ESIC ePehchan Card</h1>
        <p>Insurance Number - 301298XXXX</p>
      </section>
      <div className={styles.documentation_cards}>
        <section className={styles.documentation_card_body}>
          <h1>Offer Letter</h1>
          <p>Signed Date</p>
          <p>13 Feb, 2022</p>
        </section>
        <section className={styles.documentation_card_body}>
          <h1>Form 11</h1>
          <p>Status: Not Submitted</p>
          <p className={styles.underline}>not received</p>
        </section>
        <section className={styles.documentation_card_body}>
          <h1>Form-2</h1>
          <p>Status: Submitted</p>
          <p className={styles.underline}>unreviewed</p>
        </section>
        <section className={styles.documentation_card_body}>
          <h1>Non-disclosure Agreement</h1>
          <p>Signed Date</p>
          <p>13 Feb, 2022</p>
        </section>
        <section className={styles.documentation_card_body}>
          <h1>MI -eID Card</h1>
          <p>View ID Card</p>
          <p>
            <a className={styles.underline} href="link">
              confirmed
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default MainPage;

// server link -
// urls
