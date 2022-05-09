import cx from "classnames";
import { Link } from "react-router-dom";

// hooks
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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
import Navigation from "../../components/navigation/Navigation";
import NameDialog from "../../pages/main_page/components/PersonalDetails/NameDialog";
import DOB from "../../pages/main_page/components/PersonalDetails/DOB";
import Gender from "../../pages/main_page/components/PersonalDetails/Gender";
import Number from "../../pages/main_page/components/PersonalDetails/Number";
import Email from "../../pages/main_page/components/PersonalDetails/Email";
import Location from "../../pages/main_page/components/PersonalDetails/Location";
import Nickname from "../../pages/main_page/components/PersonalDetails/Nickname";
import ProfilePicture from "../../pages/main_page/components/PersonalDetails/ProfilePicture";
import BankDetails from "./components/FinancialDetails/BankDetails";
import UpiDetails from "./components/FinancialDetails/UpiDetails";
import Address from "./components/IdentityDetails/Address";
import DrivingLicense from "./components/IdentityDetails/DrivingLicense";
import AadharCard from "./components/IdentityDetails/AadharCard";
import PanCard from "./components/IdentityDetails/PanCard";
import Position from "./components/WorkDetails/Position";
import Department from "./components/WorkDetails/Departments";
import TeamName from "./components/WorkDetails/TeamName";
import TeamLeader from "./components/WorkDetails/TeamLeader";
import Manager from "./components/WorkDetails/Manager";
import DOJ from "./components/WorkDetails/DOJ";
import Shift from "./components/WorkDetails/ShiftName";
import WorkLocation from "./components/WorkDetails/WorkLocation";

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
    urllink: "userdetails/personal-information",
  },
  {
    name: "Financial Details",
    value: "financial-details",
    urllink: "userdetails/financial-details",
  },
  {
    name: "Identity Details",
    value: "identity-details",
    urllink: "userdetails/identity-details",
  },
  {
    name: "Work Details",
    value: "work-details",
    urllink: "userdetails/work-details",
  },
  {
    name: "Sign-In and Security",
    value: "signin-security",
    urllink: "userdetails/signin-security",
  },
  {
    name: "Policies",
    value: "policies",
    urllink: "userdetails/policies",
  },
  {
    name: "Documents and Legal",
    value: "documents",
    urllink: "userdetails/documents",
  },
];

const handleClickOpen = (statechanger) => {
  statechanger(true);
};
const handleClose = (statechanger) => {
  statechanger(false);
};

const MainPage = () => {
  const { detailsTypes } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [detailsTypes]);

  return (
    <>
      <div className={styles.container}>
        <Header />
        <ProfileIntro profileintrodata={profiledetailsintro} />

        {/* navigation */}
        <Navigation />

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
  // name
  const [namedialog, setnamedialog] = useState(false);

  // date of birth
  const [birth, setdob] = useState(false);

  // gender
  const [gender, setgender] = useState(false);

  // phone no
  const [phoneno, setphoneno] = useState(false);

  // email
  const [email, setemail] = useState(false);

  // location
  const [location, setLocation] = useState(false);

  // nickname
  const [nickname, setNickname] = useState(false);

  // profile picture
  const [profilepic, setProfilePic] = useState(false);

  return (
    <>
      <div className={styles.profile_info}>
        <CardInfo carddata={personalinfocarddetails} />

        {/* profile details cards */}
        {/* Dailog Box */}

        {/* name dialog box */}
        <NameDialog
          namedialog={namedialog}
          setnamedialog={setnamedialog}
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
        />

        {/* date of birth dialog box */}
        <DOB
          birth={birth}
          setdob={setdob}
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
        />

        {/* gender dialog */}
        <Gender
          gender={gender}
          setgender={setgender}
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
        />

        {/* phone number */}
        <Number
          phoneno={phoneno}
          setphoneno={setphoneno}
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
        />

        {/* email */}
        <Email
          email={email}
          setemail={setemail}
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
        />

        {/* location */}
        <Location
          location={location}
          setLocation={setLocation}
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
        />

        {/* nickname */}
        <Nickname
          nickname={nickname}
          setNickname={setNickname}
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
        />

        {/* profile pic */}
        <ProfilePicture
          profilepic={profilepic}
          setProfilePic={setProfilePic}
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
        />

        {/* cards section */}
        <div className={styles.profile_details_cards}>
          <section
            onClick={() => handleClickOpen(setnamedialog)}
            className={styles.card_body}
          >
            <h1>Name</h1>
            <p>Rohan Gupta</p>
          </section>
          <section
            onClick={() => handleClickOpen(setdob)}
            className={styles.card_body}
          >
            <h1>Date of Birth</h1>
            <p>03 October, 1999</p>
          </section>
          <section
            onClick={() => handleClickOpen(setgender)}
            className={styles.card_body}
          >
            <h1>Gender</h1>
            <p>Male</p>
          </section>
          <section
            onClick={() => handleClickOpen(setphoneno)}
            className={styles.card_body}
          >
            <h1>Phone Number</h1>
            <p>+91 (890) 989 8998</p>
          </section>
          <section
            onClick={() => handleClickOpen(setemail)}
            className={styles.card_body}
          >
            <h1>Personal Email</h1>
            <p>rohang@email.com</p>
          </section>
          <section
            onClick={() => handleClickOpen(setLocation)}
            className={styles.card_body}
          >
            <h1>Location</h1>
            <p>Mumbai, India</p>
          </section>
          <section
            onClick={() => handleClickOpen(setNickname)}
            className={styles.card_body}
          >
            <h1>Nickname</h1>
            <p>unspecified</p>
          </section>
          <section
            onClick={() => handleClickOpen(setProfilePic)}
            className={styles.card_body}
          >
            <h1>Profile Picture</h1>
            <p>Set Profile Picture</p>
          </section>
        </div>
      </div>
    </>
  );
};

const FinancialDetails = () => {
  // bank details
  const [bankDetails, setBankDetails] = useState(false);

  // upi details
  const [upiDetails, setUpiDetails] = useState(false);

  return (
    <div>
      <CardInfo carddata={financialcarddetails} />
      <div className={styles.FinancialDetails_btn}>
        <button onClick={() => handleClickOpen(setBankDetails)}>
          Add Another Bank
        </button>
        <button onClick={() => handleClickOpen(setUpiDetails)}>
          Add Another UPI
        </button>
      </div>
      <div className={styles.bankDetails_container}>
        {/* dialog box */}
        <BankDetails
          bankDetails={bankDetails}
          setBankDetails={setBankDetails}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
        />

        <UpiDetails
          upiDetails={upiDetails}
          setUpiDetails={setUpiDetails}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
        />

        <div className={styles.bank_details}>
          <section
            onClick={() => handleClickOpen(setBankDetails)}
            className={styles.details_wrapper}
          >
            <h1>Default Bank</h1>
            <p>Rohan Gupta</p>
            <p>ICICI Bank</p>
            <p>ICIC00000XXXX</p>
            <p>123456789012</p>
          </section>
          <button onClick={() => handleClickOpen(setBankDetails)}>
            Edit Details
          </button>
        </div>

        <div className={styles.bank_details}>
          <section
            onClick={() => handleClickOpen(setUpiDetails)}
            className={styles.details_wrapper}
          >
            <h1>Default UPI</h1>
            <p>Rohan Gupta</p>
            <p>Google Pay</p>
            <p>rohang@oksbi</p>
          </section>
          <button onClick={() => handleClickOpen(setUpiDetails)}>
            Edit Details
          </button>
        </div>

        <div className={styles.bank_details}>
          <section
            onClick={() => handleClickOpen(setBankDetails)}
            className={styles.details_wrapper}
          >
            <h1>Use Other Bank</h1>
            <p>Rohan Gupta</p>
            <p>ICICI Bank</p>
            <p>ICIC00000XXXX</p>
            <p>123456789012</p>
          </section>
          <button onClick={() => handleClickOpen(setBankDetails)}>
            Edit Details
          </button>
        </div>
      </div>
    </div>
  );
};

const IdentityDetails = () => {
  // address
  const [address, setAddress] = useState(false);

  // driving license
  const [drivingLicense, setDrivingLicense] = useState(false);

  // aadhar card
  const [aadharCard, setAadharCard] = useState(false);

  // pancard
  const [panCard, setPanCard] = useState(false);

  return (
    <div className={styles.identity_details}>
      <CardInfo carddata={identitycarddetails} />

      {/* dialog box */}
      <Address
        address={address}
        setAddress={setAddress}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />

      <DrivingLicense
        drivingLicense={drivingLicense}
        setDrivingLicense={setDrivingLicense}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />

      <AadharCard
        aadharCard={aadharCard}
        setAadharCard={setAadharCard}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />

      <PanCard
        panCard={panCard}
        setPanCard={setPanCard}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />

      <section className={styles.details}>
        <button className={styles.btn_detail}>Add Passport Details</button>
        <section className={styles.details_card}>
          <section
            onClick={() => handleClickOpen(setAddress)}
            className={styles.details_card_body}
          >
            <h1>Physical Address</h1>
            <div className={styles.address}>
              <p>Rohan Gupta</p>
              <p>C-23, Block C,</p>
              <p>Sector 7, Dwarka</p>
              <p>New Delhi, India - 110000</p>
            </div>
            <button onClick={() => handleClickOpen(setAddress)}>
              Edit Details
            </button>
          </section>

          <section
            onClick={() => handleClickOpen(setDrivingLicense)}
            className={styles.details_card_body}
          >
            <h1>Driving License</h1>
            <div className={styles.address}>
              <p>Rohan Gupta</p>
              <p>03 Oct, 1999</p>
              <p>XXXXXXXXXXXX</p>
            </div>
            <button onClick={() => handleClickOpen(setDrivingLicense)}>
              Edit Details
            </button>
          </section>

          <section
            onClick={() => handleClickOpen(setAadharCard)}
            className={styles.details_card_body}
          >
            <h1>Aadhar Card</h1>
            <div className={styles.address}>
              <p>Rohan Gupta</p>
              <p>03 Oct, 1999</p>
              <p>S/O Rajesh Gupta</p>
              <p>1983 8XXX XXXX</p>
            </div>
            <button>Edit Details</button>
          </section>

          <section
            onClick={() => handleClickOpen(setPanCard)}
            className={styles.details_card_body}
          >
            <h1>PAN Card</h1>
            <div className={styles.address}>
              <p>Rohan Gupta</p>
              <p>03 Oct, 1999</p>
              <p>S/O Rajesh Gupta</p>
              <p>BUZPK31XXX</p>
            </div>
            <button onClick={() => handleClickOpen(setPanCard)}>
              Edit Details
            </button>
          </section>
        </section>
      </section>
    </div>
  );
};

const WorkDetails = () => {
  // position / job role
  const [position, setPosition] = useState(false);

  // dept
  const [dept, setDept] = useState(false);

  // team name
  const [teamName, setTeamName] = useState(false);

  // team leader
  const [teamLeader, setTeamLeader] = useState(false);

  // team manager
  const [teamManager, setTeamManager] = useState(false);

  // date of join
  const [doj, setDoj] = useState(false);

  // shift
  const [shift, setShift] = useState(false);

  // work location
  const [workLocation, setWorkLocation] = useState(false);

  return (
    <div className={styles.work_details}>
      <CardInfo carddata={workcarddetails} />
      {/* dialog box */}
      {/* position */}
      <Position
        position={position}
        setPosition={setPosition}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />

      <Department
        dept={dept}
        setDept={setDept}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />

      <TeamName
        teamName={teamName}
        setTeamName={setTeamName}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />

      <TeamLeader
        teamLeader={teamLeader}
        setTeamLeader={setTeamLeader}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />

      <Manager
        teamManager={teamManager}
        setTeamManager={setTeamManager}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />

      <DOJ
        doj={doj}
        setDoj={setDoj}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />

      <Shift
        shift={shift}
        setShift={setShift}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />

      <WorkLocation
        workLocation={workLocation}
        setWorkLocation={setWorkLocation}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />

      <div className={styles.work_details_cards}>
        {/* position */}
        <section
          onClick={() => handleClickOpen(setPosition)}
          className={styles.work_details_cards_body}
        >
          <h1>Position/Job Role</h1>
          <p>Software Developer Engineer</p>
          <span>Grade - A</span>
          <span>141020-1A</span>
        </section>
        {/* dept */}
        <section
          onClick={() => handleClickOpen(setDept)}
          className={styles.work_details_cards_body}
        >
          <h1>Department</h1>
          <p>Software and Services</p>
        </section>
        {/* team name */}
        <section
          onClick={() => handleClickOpen(setTeamName)}
          className={styles.work_details_cards_body}
        >
          <h1>Team Name</h1>
          <p>Information Technology and Services</p>
        </section>
        {/* team leader */}
        <section
          onClick={() => handleClickOpen(setTeamLeader)}
          className={styles.work_details_cards_body}
        >
          <h1>Team Leader</h1>
          <p>Lokesh Warren Naidu</p>
          <p>Senior Software Developer Engineer</p>
          <p>lokesh.naidu@miratsinsights.com</p>
        </section>
        {/* manager */}
        <section
          onClick={() => handleClickOpen(setTeamManager)}
          className={styles.work_details_cards_body}
        >
          <h1>Manager</h1>
          <p>Ayyan Ali</p>
          <p>Head of Global Sales</p>
          <p>ayaan.ali@miratsinsights.com</p>
        </section>
        {/* doj */}
        <section
          onClick={() => handleClickOpen(setDoj)}
          className={styles.work_details_cards_body}
        >
          <h1>Date of Joining</h1>
          <p>Dec 6</p>
          <p>Year - 2021</p>
        </section>
        {/* shift time */}
        <section
          onClick={() => handleClickOpen(setShift)}
          className={styles.work_details_cards_body}
        >
          <h1>Shift Name</h1>
          <p>Day Shift</p>
          <p>10 AM - 7 PM</p>
        </section>
        {/* work location */}
        <section
          onClick={() => handleClickOpen(setWorkLocation)}
          className={styles.work_details_cards_body}
        >
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

// figma link for this project
// https://www.figma.com/file/rVdFZcOK7f9tfMO4l99cWH/Mirats-Peoples-Portal-(Copy)?node-id=0%3A1
