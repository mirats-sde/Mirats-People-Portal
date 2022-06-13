import React, { useContext, useState } from "react";
import { useEffect } from "react";
import styles from "../Details/form.module.css";
import { firestoredb } from "../../firebase-config";
import { userAuthContext } from "../context/Userauthcontext";
import { doc, setDoc } from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";

const Financial_Identity = () => {
  let { user } = useContext(userAuthContext);

  const navigate = useNavigate();
  const [state, setstate] = useState({ panCard: false, adhaCard: false });

  const inputTypes = [
    { value: "pan_card", label: "PAN card number", id: "pan_number" },
    { value: "aadhar_card", label: "Aadhar card number", id: "aadharnumber" },
    { value: "passport", label: "Passport", id: "passport_number" },
    { value: "voter_id", label: "Voter ID", id: "voterid_number" },
  ];

  const [Financial_IdentityDetails, setFinancial_IdentityDetails] = useState({
    BankDetails: [{}],
    IdentificationDetails: {},
  });

  console.log(Financial_IdentityDetails);

  //showing pan card input:
  const handleDocumentChange = (e, forDocument) => {
    if (e.target.checked) {
      setstate((prevData) => {
        return {
          ...prevData,
          [forDocument]: true,
        };
      });
    } else {
      setstate((prevData) => {
        return {
          ...prevData,
          [forDocument]: false,
        };
      });
    }
  };

  //storing employee data:
  const handleFinancial_IdentityDetails = async (e) => {
    e.preventDefault();

    //storing data in firestore:
    await setDoc(
      doc(
        firestoredb,
        "miratsinsights",
        "peoples",
        "employee",
        String(user?.uid)
      ),
      {
        IdentificationDetails: Financial_IdentityDetails?.IdentificationDetails,
        BankDetails: Financial_IdentityDetails?.BankDetails,
      },
      { merge: true }
    );
    console.log("Financial and Identity Details saved successfully!!!");
    navigate("/dashboard");
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

  function HandleBankDetails(e) {
    setFinancial_IdentityDetails((preob) => {
      preob.BankDetails[0][e.target.name] = e.target.value;
      return { ...preob };
    });
  }
  function HandleIdentificationDetails(e) {
    setFinancial_IdentityDetails((preob) => {
      preob.IdentificationDetails[e.target.name] = {
        [e.target.id]: e.target.value,
      };
      return { ...preob };
    });
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.form_heading}>Employee Section</h2>
      <form onSubmit={handleFinancial_IdentityDetails}>
        <div className={styles.form}>
          <div className={styles.form_left}>
            <h2>Financial Details</h2>
            <p>Complete this information to setup your financials.</p>
          </div>
          <div className={styles.form_right}>
            <div className={styles.group}>
              <h4>Bank Name</h4>
              <input
                type="text"
                className={styles.group__control}
                placeholder=""
                name="bank_name"
                value={Financial_IdentityDetails?.BankDetails[0]?.bank_name}
                onChange={HandleBankDetails}
                required
              />
            </div>
            <div className={styles.group}>
              <h4>Bank Account Number</h4>
              <input
                type="number"
                className={styles.group__control}
                placeholder=""
                name="account_no"
                value={Financial_IdentityDetails?.BankDetails[0]?.account_no}
                onChange={HandleBankDetails}
                required
              />
            </div>
            <div className={styles.group}>
              <h4>IFSC Code</h4>
              <input
                type="text"
                className={styles.group__control}
                placeholder=""
                name="ifsc_code"
                value={Financial_IdentityDetails?.BankDetails[0]?.ifsc_code}
                onChange={HandleBankDetails}
                required
              />
            </div>

            <div className={styles.group}>
              <h4>Branch Location</h4>
              <input
                type="text"
                className={styles.group__control}
                placeholder=""
                name="BranchLocation"
                value={
                  Financial_IdentityDetails?.BankDetails[0]?.branch_location
                }
                onChange={HandleBankDetails}
                required
              />
            </div>
          </div>
        </div>
        <div className={styles.form}>
          <div className={styles.form_left}>
            <h2>Identification Details</h2>
            <p>
              Share us your identification details in order to complete your
              profile's this section.
            </p>
          </div>
          <div className={styles.form_right}>
            <div className={styles.group}>
              <h4>Do you have nationality of any other country?</h4>
              <span className={styles.group__radio}>
                <input
                  type="radio"
                  id="yes"
                  name="OtherCountryNationality"
                  value="Yes"
                  // onChange={HandleIdentificationDetails}
                  onChange={(e) => {
                    setFinancial_IdentityDetails({
                      ...Financial_IdentityDetails,
                      IdentificationDetails: {
                        ...Financial_IdentityDetails?.IdentificationDetails,
                        other_country_nationality: e.target.value,
                      },
                    });
                  }}
                  required
                />
                <label for="yes">Yes</label>
              </span>
              <span className={styles.group__radio}>
                <input
                  type="radio"
                  id="no"
                  name="OtherCountryNationality"
                  value="No"
                  onChange={(e) => {
                    setFinancial_IdentityDetails({
                      ...Financial_IdentityDetails,
                      IdentificationDetails: {
                        ...Financial_IdentityDetails?.IdentificationDetails,
                        other_country_nationality: e.target.value,
                      },
                    });
                  }}
                />
                <label for="no">No</label>
              </span>
            </div>
            <div className={styles.group}>
              <h4>Which documents do you have?</h4>
              <div className={styles.group__radio}>
                <input
                  type="checkbox"
                  id="pancard"
                  name="pancard"
                  value="pancard"
                  onChange={(e) => handleDocumentChange(e, "pan_card")}
                />
                <label for="pancard">PAN Card</label>
              </div>
              <div className={styles.group__radio}>
                <input
                  type="checkbox"
                  id="aadharcard"
                  name="aadharcard"
                  value="aadharcard"
                  onChange={(e) => handleDocumentChange(e, "aadhar_card")}
                />
                <label for="aadharcard">Aadhar Card</label>
              </div>
              <div className={styles.group__radio}>
                <input
                  type="checkbox"
                  id="passport"
                  name="passport"
                  value="passport"
                  onChange={(e) => handleDocumentChange(e, "passport")}
                />
                <label for="passport">Passport</label>
              </div>
              <div className={styles.group__radio}>
                <input
                  type="checkbox"
                  id="voterid"
                  name="voterid"
                  value="voterid"
                  onChange={(e) => handleDocumentChange(e, "voter_id")}
                />
                <label for="voterid">Voter ID</label>
              </div>
              <div className={styles.group__radio}>
                <input type="checkbox" id="other" name="other" value="other" />
                <label for="other">Other</label>
              </div>
            </div>
            {inputTypes?.map((type) => {
              return state?.[type?.value] ? (
                <div className={styles.group}>
                  <h4>{type?.label}</h4>
                  <input
                    type="text"
                    className={styles.group__control}
                    placeholder=""
                    name={type?.value}
                    id={type?.id}
                    value={Financial_IdentityDetails?.[type?.value]}
                    // onChange={handleDetails}
                    onChange={HandleIdentificationDetails}
                    required
                  />
                </div>
              ) : (
                <></>
              );
            })}

            {/* <div className={styles.group}>
              <h4>Division</h4>
              <input
                type="text"
                className={styles.group__control}
                placeholder=""
                name="Division"
                value={
                  Financial_IdentityDetails?.IdentificationDetails?.Division
                }
                onChange={(e) => {
                  setFinancial_IdentityDetails({
                    ...Financial_IdentityDetails,
                    IdentificationDetails: {
                      ...Financial_IdentityDetails?.IdentificationDetails,
                      Division: e.target.value,
                    },
                  });
                }}
                required
              />
            </div> */}
          </div>
        </div>
        <button className={styles.form_btn} type="submit">
          Next
        </button>
      </form>
    </div>
  );
};

export default Financial_Identity;
