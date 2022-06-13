import { doc, setDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { firestoredb } from "../../firebase-config";
import { userAuthContext } from "../context/Userauthcontext";

const PersonalInfo = () => {
  const navigate = useNavigate();
  const { user } = useContext(userAuthContext);
  const [PersonalInfo, setPersonalInfo] = useState({
    PersonalInfo: {},
  });

  const handleDetails = (e) => {
    setPersonalInfo((preob) => {
      preob.PersonalInfo[e.target.name] = e.target.value;
      return { ...preob };
    });
  };

  //storing employee data:
  const handlePersonal_Info = async (e) => {
    e.preventDefault();

    //storing data in firestore:
    await setDoc(
      doc(
        firestoredb,
        "miratsinsights",
        "peoples",
        "employee",
        // "Personal_Info",
        String(user?.uid)
      ),
      {
        PersonalInfoDetails: PersonalInfo?.PersonalInfo,
      },
      { merge: true }
    );
    console.log("Personal Details Added successfully");
    navigate("/dashboard");
  };

  console.log(PersonalInfo);

  return (
    <>
      <div>Personal Information page</div>
      <form action="" onSubmit={handlePersonal_Info}>
        <label>Name: </label>
        <input
          type="text"
          name="Name"
          value={PersonalInfo.Name}
          onChange={handleDetails}
        />
        <br />
        <br />
        <label>Date of Birth: </label>
        <input
          type="date"
          name="DOB"
          value={PersonalInfo.DOB}
          onChange={handleDetails}
        />
        <br />
        <br />
        <label>Gender: </label>
        <input
          type="radio"
          name="Gender"
          id="gender"
          value="Male"
          onChange={handleDetails}
        />
        <label>Male</label>
        <input
          type="radio"
          name="Gender"
          id="gender"
          value="Female"
          onChange={handleDetails}
        />
        <label>Female</label>
        <br />
        <br />
        <label>Phone Number: </label>
        <input
          type="number"
          name="PhoneNumber"
          id=""
          value={PersonalInfo.PhoneNumber}
          onChange={handleDetails}
        />
        <br />
        <br />
        <label>Personal Email: </label>
        <input
          type="email"
          name="PersonalEmail"
          onChange={handleDetails}
          value={PersonalInfo.PersonalEmail}
        />
        <br />
        <br />
        <label>Location: </label>
        <input
          type="location"
          name="Location"
          onChange={handleDetails}
          value={PersonalInfo.Location}
        />
        <br />
        <br />
        <label>Nickname: </label>
        <input
          type="text"
          name="Nickname"
          value={PersonalInfo.Nickname}
          onChange={handleDetails}
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default PersonalInfo;
