import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { userAuthContext } from "../context/Userauthcontext";
import styles from "./Login.module.css";
import logo from "../../assets/miratsLogo.png";
import login3 from "../../assets/login3.png";
import Snackbar from "@mui/material/Snackbar";
import { doc, setDoc } from "firebase/firestore";
import { firestoredb } from "../../firebase-config";
// import encryption from "../../assets/encryption.png";

//get url params:
function useQuery() {
  const location = useLocation();
  return new URLSearchParams(location.search);
}

const PasswordReset = () => {
  const [password, resetpassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [email, setEmail] = useState();
  const { auth, ChangePassword, setChangePasswordError, setOpen } =
    useContext(userAuthContext);

  const query = useQuery();
  const navigate = useNavigate();

  //confirm password reset:
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password === confirmPassword) {
        await ChangePassword(query.get("oobCode"), password);
      } else {
        setChangePasswordError("Password does not match");
        setOpen({
          open: true,
          severity: "error",
          msg: "Password does not match",
        });
      }
    } catch (err) {
      console.log(err.message);
      setChangePasswordError(err.message);
      setOpen({ open: true, severity: "error", msg: err.message });
    }
  };
  console.log(password);
  console.log(confirmPassword);

  return (
    <div className={styles.login_container}>
      <div className={styles.login_content}>
        <div className={styles.form_img}>
          <img src={logo} alt="logo" />
        </div>

        <form className={styles.loginForm} onSubmit={handleFormSubmit}>
          {/* <div className={styles.animate_label}>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label for="email"> Email </label>
            <line></line>
          </div> */}

          <div className={styles.animate_label}>
            <input
              type="password"
              id="password"
              onChange={(e) => resetpassword(e.target.value)}
              required
            />
            <label for="password"> Password </label>
            <line></line>
          </div>

          <div className={styles.animate_label}>
            <input
              type="password"
              id="confirmpassword"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              required
            />
            <label for="confirmpassword"> Confirm Password </label>
            <line></line>
          </div>

          <button className={styles.submitBTN}> Reset Password </button>
        </form>
      </div>
      <div className={styles.login_img}>
        <img src={login3} alt="loginimg" />
      </div>
    </div>
    // <>
    //   <h1>Confirm Password Reset</h1>
    //   {error}
    //   <form onSubmit={handleFormSubmit}>
    //     <label>Enter New Password: </label>
    //     <input
    //       type="password"
    //       name="password"
    //       onChange={(e) => {
    //         resetpassword(e.target.value);
    //         // setPasswordDate(new Date());
    //       }}
    //     />
    //     <button type="submit">Reset Password</button>
    //   </form>
    // </>
  );
};

export default PasswordReset;
