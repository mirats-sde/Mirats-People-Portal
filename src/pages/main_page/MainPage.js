import cx from "classnames";
import { Link } from "react-router-dom";

// hooks
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ClientJS } from "clientjs";
// in project imports
import styles from "./MainPage.module.css";
import portalprofile from "../../assets/default-profile.jpeg";
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
import NameDialog from "./components/PersonalDetails/NameDialog";
import DOB from "./components/PersonalDetails/DOB";
import Gender from "./components/PersonalDetails/Gender";
import Number from "./components/PersonalDetails/Number";
import Email from "./components/PersonalDetails/Email";
import Location from "./components/PersonalDetails/Location";
import Nickname from "./components/PersonalDetails/Nickname";
import ProfilePicture from "./components/PersonalDetails/ProfilePicture";
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
import { userAuthContext } from "../context/Userauthcontext";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  QuerySnapshot,
  setDoc,
} from "firebase/firestore";
import { firestoredb, storage } from "../../firebase-config";
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 as uuid } from "uuid";
// import portalprofile from "../../assets/portalprofile";

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
  const { user, userData, profileimage } = useContext(userAuthContext);

  // console.log(userData);
  const profiledetailsintro = [
    {
      time: Greet,

      profileName: userData?.basicinfo?.firstname,
      profiledesc: "Follow Your Passion",
      profileimg: profileimage?.url || portalprofile,
    },
  ];

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
                <img
                  src={profileimage?.url || portalprofile}
                  alt="profileimg"
                />
              </figure>
              <h1>
                {userData?.basicinfo?.firstname +
                  " " +
                  (userData?.basicinfo?.middlename || " ") +
                  " " +
                  userData?.basicinfo?.lastname}
              </h1>
              <p>{userData?.basicinfo?.email}</p>
            </section>
            <section className={styles.left_pages}>
              {leftpages.map((pages, index) => {
                // console.log(detailsTypes === pages?.value);
                return (
                  <div className={styles.pages} key={uuid()}>
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
  const { userData } = useContext(userAuthContext);

  console.log(userData);
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

  const [changedate, setchangedate] = useState();

  return (
    <>
      <div className={styles.profile_info}>
        <CardInfo carddata={personalinfocarddetails} />

        {/* name dialog box */}
        <NameDialog
          namedialog={namedialog}
          setnamedialog={setnamedialog}
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
        />

        {/* date of birth dialg box */}
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
            <p>
              {userData?.basicinfo?.firstname +
                " " +
                (userData?.basicinfo?.middlename || " ") +
                " " +
                userData?.basicinfo?.lastname}
            </p>
          </section>
          <section
            onClick={() => handleClickOpen(setdob)}
            className={styles.card_body}
          >
            <h1>Date of Birth</h1>
            <p>
              {userData?.basicinfo?.dob?.toDate().toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              })}
            </p>
            {/* <p>03 October, 1999</p> */}
          </section>
          <section
            onClick={() => handleClickOpen(setgender)}
            className={styles.card_body}
          >
            <h1>Gender</h1>
            <p>{userData?.basicinfo?.gender}</p>
          </section>
          <section
            onClick={() => handleClickOpen(setphoneno)}
            className={styles.card_body}
          >
            <h1>Phone Number</h1>
            <p>{userData?.basicinfo?.phonenumber}</p>
            {/* <p>+91 (890) 989 8998</p> */}
          </section>
          <section
            onClick={() => handleClickOpen(setemail)}
            className={styles.card_body}
          >
            <h1>Personal Email</h1>
            <p>{userData?.basicinfo?.email}</p>
          </section>
          <section
            onClick={() => handleClickOpen(setLocation)}
            className={styles.card_body}
          >
            <h1>Location</h1>
            <p>{userData?.basicinfo?.city},</p>
            <p>{userData?.basicinfo?.country}</p>
            {/* <p>Mumbai, India</p> */}
          </section>
          <section
            onClick={() => handleClickOpen(setNickname)}
            className={styles.card_body}
          >
            <h1>Nickname</h1>
            <p>{userData?.basicinfo?.nickname}</p>
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
  const { userData } = useContext(userAuthContext);

  // bank details
  const [bankDetails, setBankDetails] = useState(false);

  //secondary bank details:
  const [secbankDetails, setSecbankDetails] = useState(false);

  // upi details
  const [upiDetails, setUpiDetails] = useState(false);

  //secondary upi details:
  const [secupiDetails, setsecupiDetails] = useState(false);

  return (
    <div>
      <CardInfo carddata={financialcarddetails} />
      <div className={styles.FinancialDetails_btn}>
        {userData?.BankDetails?.[1] ? (
          <></>
        ) : (
          <button onClick={() => handleClickOpen(setSecbankDetails)}>
            Add Another Bank
          </button>
        )}

        {userData?.UpiDetails?.[1] ? (
          <></>
        ) : (
          <button onClick={() => handleClickOpen(setsecupiDetails)}>
            Add Another UPI
          </button>
        )}
      </div>
      <div className={styles.bankDetails_container}>
        {/* dialog box */}
        <BankDetails
          bankDetails={bankDetails}
          secbankDetails={secbankDetails}
          setSecbankDetails={setSecbankDetails}
          setBankDetails={setBankDetails}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
        />

        <UpiDetails
          upiDetails={upiDetails}
          secupiDetails={secupiDetails}
          setsecupiDetails={setsecupiDetails}
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
            <p>
              {userData?.BankDetails?.[0]?.account_name ? (
                userData?.BankDetails?.[0]?.account_name
              ) : (
                <>Account Name</>
              )}
            </p>
            <p>{userData?.BankDetails?.[0]?.bank_name}</p>
            <p>{userData?.BankDetails?.[0]?.ifsc_code}</p>
            <p>{userData?.BankDetails?.[0]?.account_no}</p>
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
            {!userData?.UpiDetails?.[0] ? (
              <p>Add UPI details</p>
            ) : (
              <>
                <p>{userData?.UpiDetails?.[0]?.account_name}</p>
                <p>{userData?.UpiDetails?.[0]?.payment_service}</p>
                <p>{userData?.UpiDetails?.[0]?.upi_ID}</p>
              </>
            )}
          </section>
          {!userData?.UpiDetails?.[0] ? (
            <>
              <button onClick={() => handleClickOpen(setUpiDetails)}>
                Add Details
              </button>
            </>
          ) : (
            <>
              <button onClick={() => handleClickOpen(setUpiDetails)}>
                Edit Details
              </button>
            </>
          )}
        </div>

        {userData?.BankDetails?.[1] ? (
          <div className={styles.bank_details}>
            <section
              onClick={() => handleClickOpen(setSecbankDetails)}
              className={styles.details_wrapper}
            >
              <h1>Use Other Bank</h1>
              <p>
                {userData?.BankDetails?.[1]?.account_name ? (
                  userData?.BankDetails?.[1]?.account_name
                ) : (
                  <>Account Name</>
                )}
              </p>
              <p>{userData?.BankDetails?.[1]?.bank_name}</p>
              <p>{userData?.BankDetails?.[1]?.ifsc_code}</p>
              <p>{userData?.BankDetails?.[1]?.account_no}</p>
            </section>
            <button onClick={() => handleClickOpen(setSecbankDetails)}>
              Edit Details
            </button>
          </div>
        ) : (
          <></>
        )}

        {userData?.UpiDetails?.[1] ? (
          <div className={styles.bank_details}>
            <section
              onClick={() => handleClickOpen(setsecupiDetails)}
              className={styles.details_wrapper}
            >
              <h1>Default UPI</h1>
              <p>{userData?.UpiDetails?.[1]?.account_name}</p>
              <p>{userData?.UpiDetails?.[1]?.payment_service}</p>
              <p>{userData?.UpiDetails?.[1]?.upi_ID}</p>
            </section>
            <button onClick={() => handleClickOpen(setsecupiDetails)}>
              Edit Details
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const IdentityDetails = () => {
  const { userData } = useContext(userAuthContext);
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
              {!userData?.IdentificationDetails?.address ? (
                <p>Add Address</p>
              ) : (
                <>
                  <p>
                    {userData?.IdentificationDetails?.address?.street_address}
                  </p>
                  <p>
                    {userData?.IdentificationDetails?.address?.state},{" "}
                    {userData?.IdentificationDetails?.address?.city},{" "}
                    {userData?.IdentificationDetails?.address?.country} -{" "}
                    {userData?.IdentificationDetails?.address?.zip_code}
                  </p>
                </>
              )}
            </div>
            {!userData?.IdentificationDetails?.address ? (
              <button onClick={() => handleClickOpen(setAddress)}>
                Add Details
              </button>
            ) : (
              <>
                <button onClick={() => handleClickOpen(setAddress)}>
                  Edit Details
                </button>
              </>
            )}
          </section>

          <section
            onClick={() => handleClickOpen(setDrivingLicense)}
            className={styles.details_card_body}
          >
            <h1>Driving License</h1>
            <div className={styles.address}>
              {!userData?.IdentificationDetails?.driving_license ? (
                <p>Add Driving License details</p>
              ) : (
                <>
                  <p>
                    {userData?.IdentificationDetails?.driving_license?.name}
                  </p>
                  <p>
                    {userData?.IdentificationDetails?.driving_license?.date
                      ?.toDate()
                      ?.toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                  </p>
                  <p>
                    {userData?.IdentificationDetails?.driving_license?.license_number
                      ?.toString()
                      .slice(0, 5) + "XXXXXXXXX"}
                  </p>
                  {/* <p>XXXXXXXXXXXX</p> */}
                </>
              )}
            </div>
            {!userData?.IdentificationDetails?.driving_license ? (
              <button onClick={() => handleClickOpen(setDrivingLicense)}>
                Add Details
              </button>
            ) : (
              <button onClick={() => handleClickOpen(setDrivingLicense)}>
                Edit Details
              </button>
            )}
          </section>

          <section
            onClick={() => handleClickOpen(setAadharCard)}
            className={styles.details_card_body}
          >
            <h1>Aadhar Card</h1>
            <div className={styles.address}>
              {!userData?.IdentificationDetails?.aadhar_card ? (
                <p>Add Aadhar Card Details</p>
              ) : (
                <>
                  <p>
                    {userData?.IdentificationDetails?.aadhar_card?.aadhar_name}
                  </p>
                  <p>
                    {userData?.IdentificationDetails?.aadhar_card?.date
                      ?.toDate()
                      ?.toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                  </p>
                  <p>
                    S/O{" "}
                    {userData?.IdentificationDetails?.aadhar_card?.aadhar_name}
                  </p>
                  {/* <p>S/O Rajesh Gupta</p> */}
                  <p>
                    {userData?.IdentificationDetails?.aadhar_card?.aadharnumber
                      .toString()
                      .slice(0, 5) + "XXXXXXX"}
                  </p>
                  {/* <p>1983 8XXX XXXX</p> */}
                </>
              )}
            </div>
            {userData?.IdentificationDetails?.aadhar_card ? (
              <>
                <button>Edit Details</button>
              </>
            ) : (
              <button>Add Details</button>
            )}
          </section>

          <section
            onClick={() => handleClickOpen(setPanCard)}
            className={styles.details_card_body}
          >
            <h1>PAN Card</h1>
            <div className={styles.address}>
              {!userData?.IdentificationDetails?.pan_card ? (
                <p>Add PAN Card Details</p>
              ) : (
                <>
                  <p>{userData?.IdentificationDetails?.pan_card?.pan_name}</p>
                  <p>
                    {userData?.IdentificationDetails?.pan_card?.date
                      ?.toDate()
                      ?.toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                  </p>
                  <p>
                    S/O {userData?.IdentificationDetails?.pan_card?.pan_name}
                  </p>
                  <p>
                    {userData?.IdentificationDetails?.pan_card?.pan_number
                      .toString()
                      .slice(0, 5) + "XXXXXXXXXX"}
                  </p>
                  {/* <p>BUZPK31XXX</p> */}
                </>
              )}
            </div>
            {userData?.IdentificationDetails?.pan_card ? (
              <>
                <button onClick={() => handleClickOpen(setPanCard)}>
                  Edit Details
                </button>
              </>
            ) : (
              <>
                <button onClick={() => handleClickOpen(setPanCard)}>
                  Edit Details
                </button>
              </>
            )}
            {/* <button onClick={() => handleClickOpen(setPanCard)}>
              Edit Details
            </button> */}
          </section>
        </section>
      </section>
    </div>
  );
};

const WorkDetails = () => {
  const { userData } = useContext(userAuthContext);
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
          <p>{userData?.WorkDetails?.position}</p>
          <span>Grade - </span>
          <span>{userData?.WorkDetails?.grade}</span>
        </section>
        {/* dept */}
        <section
          onClick={() => handleClickOpen(setDept)}
          className={styles.work_details_cards_body}
        >
          <h1>Department</h1>
          <p>{userData?.WorkDetails?.department}</p>
        </section>
        {/* team name */}
        <section
          onClick={() => handleClickOpen(setTeamName)}
          className={styles.work_details_cards_body}
        >
          <h1>Team Name</h1>
          <p>{userData?.WorkDetails?.teamname}</p>
        </section>
        {/* team leader */}
        <section
          onClick={() => handleClickOpen(setTeamLeader)}
          className={styles.work_details_cards_body}
        >
          <h1>Team Leader</h1>
          <p>{userData?.WorkDetails?.TeamLeaderInfo?.teamleader_name}</p>
          <p>{userData?.WorkDetails?.TeamLeaderInfo?.teamleader_position}</p>
          <p>{userData?.WorkDetails?.TeamLeaderInfo?.teamleader_email}</p>
        </section>
        {/* manager */}
        <section
          onClick={() => handleClickOpen(setTeamManager)}
          className={styles.work_details_cards_body}
        >
          <h1>Manager</h1>
          <p>{userData?.WorkDetails?.TeamManagerInfo?.teammanager_name}</p>
          <p>{userData?.WorkDetails?.TeamManagerInfo?.teammanager_position}</p>
          <p>{userData?.WorkDetails?.TeamManagerInfo?.teammanager_email}</p>
        </section>
        {/* doj */}
        <section
          onClick={
            () => <></>
            // handleClickOpen(setDoj)
          }
          className={styles.work_details_cards_body}
        >
          <h1>Date of Joining</h1>
          <p>
            {userData?.WorkDetails?.doj?.toDate()?.toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
            })}
          </p>
          <p>
            Year -{" "}
            {userData?.WorkDetails?.doj?.toDate()?.toLocaleDateString("en-US", {
              year: "numeric",
            })}
          </p>
        </section>
        {/* shift time */}
        <section
          onClick={() => handleClickOpen(setShift)}
          className={styles.work_details_cards_body}
        >
          <h1>Shift</h1>
          <p>{userData?.WorkDetails?.shift?.shift_name}</p>
        </section>
        {/* work location */}
        <section
          onClick={() => handleClickOpen(setWorkLocation)}
          className={styles.work_details_cards_body}
        >
          <h1>Work Location</h1>
          <p>{userData?.WorkDetails?.city}</p>
          <p>{userData?.WorkDetails?.country}</p>
        </section>
      </div>
    </div>
  );
};

const SignInSecurity = () => {
  const { userData, user } = useContext(userAuthContext);
  const [DOJ, setDOJ] = useState();
  const [loginDevices, setLoginDevices] = useState(0);

  //Getting all users DOJ:
  async function GetDOJ() {
    const q = query(
      collection(firestoredb, "miratsinsights", "peoples", "employee")
    );
    onSnapshot(q, (querySnapshot) => {
      // console.log("heree");
      setDOJ([]);
      querySnapshot.forEach((doc) => {
        setDOJ((prear) => [
          ...prear,
          {
            date: doc.data()?.WorkDetails?.doj,
          },
        ]);
      });
    });
  }

  //getting logged in devices:
  async function LoginDevices() {
    const docref = doc(
      firestoredb,
      "miratsinsights",
      "peoples",
      "employee",
      String(user?.uid)
    );
    const docsnap = await getDoc(docref);
    if (docsnap.exists()) {
      console.log(docsnap.data().fingerprint);
      setLoginDevices(docsnap.data().fingerprint.length);
    }
  }

  useEffect(() => {
    GetDOJ();
    LoginDevices();
  }, [userData]);

  // console.log(loginDevices);

  return (
    <div className={styles.signin_security}>
      <CardInfo carddata={signinsecuritycarddetails} />
      <div className={styles.signinsecutity_cards}>
        <section className={styles.signinsecutity_card_body}>
          <h1>Password</h1>
          <p>
            Last updated{" "}
            {new Date(
              user?.reloadUserInfo?.passwordUpdatedAt
            )?.toLocaleDateString("en-CA", {
              month: "short",
              year: "numeric",
              day: "2-digit",
            })}
          </p>
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
          <p>{userData?.WorkDetails?.employeeID}</p>
          {/* <p>141020-1A</p> */}
        </section>
        <section className={styles.signinsecutity_card_body}>
          <h1>Account Login History</h1>
          <p>{loginDevices} devices used</p>
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
  const { user, panImage, aadharImage } = useContext(userAuthContext);
  const [aadharCardFile, setAadharCardFile] = useState();
  const [panCardFile, setPanCardFile] = useState();
  const { userData } = useContext(userAuthContext);

  //aadhar_card reference:
  const Aadhar_ref = ref(
    storage,
    `peoples-portal/miratsinsights/users/${user?.uid}/Documents/Aadhar_card`
  );

  //uploading aadhar_card:
  const uploadAadharCard = async (aadharCardFile) => {
    console.log("uploading aadhar card");
    if (!aadharCardFile) {
      console.log("aadhar_card file not found");
      return;
    } else {
      console.log("aadhar card file found");
      let filename = aadharCardFile.name;
      const fileref = ref(
        storage,
        `peoples-portal/miratsinsights/users/${user?.uid}/Documents/Aadhar_card/${filename}`
      );
      const uploadtask = uploadBytesResumable(fileref, aadharCardFile);
      uploadtask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (er) => {
          console.log(er.message);
        },
        () => {
          console.log("aadhar card uploaded");
          getDownloadURL(uploadtask.snapshot.ref).then((url) => {
            console.log(url);
            setDoc(
              doc(
                firestoredb,
                "miratsinsights",
                "peoples",
                "employee",
                String(user?.uid)
              ),
              {
                Documents: {
                  ...userData?.Documents,
                  AadharFile: url,
                },
              },
              { merge: true }
            );
            console.log("saved to database");
          });
        }
      );
    }
  };

  //deleting aadhar_card if it exists and then uploading new:
  const DeleteAadharCard = (Aadhar_ref) => {
    console.log("deleting aadhar_card");
    listAll(Aadhar_ref).then((res) => {
      res.items.forEach((itemref) => {
        deleteObject(itemref)
          .then(() => {
            console.log("aadhar card deleted successfully");
          })
          .catch((er) => {
            console.log(er.message);
          });
      });
    });
  };

  //uploading aadhar card:
  async function uploadAadharCardFile(e) {
    e.preventDefault();
    DeleteAadharCard(Aadhar_ref);
    uploadAadharCard(aadharCardFile);
  }

  //pan_card reference:
  const PanCard_ref = ref(
    storage,
    `peoples-portal/miratsinsights/users/${user?.uid}/Documents/Pan_card`
  );

  //uploading pan_card:
  const uploadPanCard = async (panCardFile) => {
    console.log("uploading pan card");
    if (!panCardFile) {
      console.log("pan card file not found");
      return;
    } else {
      console.log("pan card file found");
      let filename = panCardFile.name;
      const fileref = ref(
        storage,
        `peoples-portal/miratsinsights/users/${user?.uid}/Documents/Pan_card/${filename}`
      );
      const uploadtask = uploadBytesResumable(fileref, panCardFile);
      uploadtask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (er) => {
          console.log(er.message);
        },
        () => {
          console.log("pan card uploaded");
          getDownloadURL(uploadtask.snapshot.ref).then((url) => {
            console.log(url);
            setDoc(
              doc(
                firestoredb,
                "miratsinsights",
                "peoples",
                "employee",
                String(user?.uid)
              ),
              {
                Documents: {
                  ...userData?.Documents,
                  PanFile: url,
                },
              },
              { merge: true }
            );
            console.log("saved to database");
          });
        }
      );
    }
  };

  //deleting pan card:
  const DeletePanCard = (PanCard_ref) => {
    console.log("deleting pan card");
    listAll(PanCard_ref).then((res) => {
      res.items.forEach((itemref) => {
        deleteObject(itemref)
          .then(() => {
            console.log("pan card deleted successfully");
          })
          .catch((er) => {
            console.log(er.message);
          });
      });
    });
  };

  console.log(panImage);
  //uploading pan card:
  async function uploadPanCardFile(e) {
    e.preventDefault();
    DeletePanCard(PanCard_ref);
    uploadPanCard(panCardFile);
  }

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
        <section className={styles.documentation_card_body}>
          <h1>Aadhar Card</h1>
          {aadharImage == undefined ? (
            <></>
          ) : (
            <>
              <a href={aadharImage?.url}>View Aadhar Card</a>
            </>
          )}

          <p>
            <input
              type="file"
              onChange={(e) => {
                setAadharCardFile(e.target.files[0]);
              }}
            />
          </p>
          {!aadharCardFile ? (
            <></>
          ) : (
            <>
              <p>
                <button onClick={uploadAadharCardFile}>Upload</button>
              </p>
            </>
          )}
        </section>
        <section className={styles.documentation_card_body}>
          <h1>Pan Card</h1>
          {panImage == undefined ? (
            <></>
          ) : (
            <>
              <a href={panImage?.url}>View Pancard</a>
            </>
          )}
          <p>
            <input
              type="file"
              name=""
              onChange={(e) => {
                setPanCardFile(e.target.files[0]);
              }}
              id=""
            />
          </p>
          {!panCardFile ? (
            <></>
          ) : (
            <>
              <p>
                <button onClick={uploadPanCardFile}>Upload</button>
              </p>
            </>
          )}

          {/* {/ <p>View ID Card</p> /} */}
          {/* <p>
            <a className={styles.underline} href="link">
              confirmed
            </a>
          </p> */}
        </section>
      </div>
    </div>
  );
};

export default MainPage;
