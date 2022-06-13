import { sendPasswordResetEmail } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAuthContext } from "../context/Userauthcontext";
import styles from "./Login.module.css";
import logo from "../../assets/miratsLogo.png";
import login3 from "../../assets/login3.png";
// import password from "../../assets/password.png";
// -------------------------------------------------------------------------
//                                  SanckBar
// --------------------------------------------------------------------------
import Snackbar from "@mui/material/Snackbar";
// -------------------------------------------------------------------------
//                                  /SanckBar
// --------------------------------------------------------------------------
const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  // const [error, setError] = useState("");
  const { Passwordreset } = useContext(userAuthContext);
  const navigate = useNavigate();

  const handleformsubmit = async (e) => {
    e.preventDefault();
    try {
      await Passwordreset(email);
      // setOpen({ open: true, severity: "success" });
      // navigate("/");
    } catch (err) {
      // setPasswordResetError(err.message);
      console.log(err.message);
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_content}>
        <div className={styles.form_img}>
          <img src={logo} alt="logo" />
        </div>
        {/* {passwordResetError} */}
        <form className={styles.loginForm} onSubmit={handleformsubmit}>
          {/* <Snackbar
            open={open?.open}
            autoHideDuration={4000}
            onClose={snackbarClose}
            bodyStyle={{ maxWidth: "100%" }}
          >
            <Alert
              onClose={snackbarClose}
              severity={open?.severity}
              sx={{ width: "100%" }}
            >
              {passwordResetError}
            </Alert>
          </Snackbar> */}
          <div className={styles.animate_label}>
            <input
              type="email"
              id="username"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <label for="username"> Email </label>
            <line></line>
          </div>

          {/* <div className={styles.animate_label}>
            <input type="password" id="password" required />
            <label for="password"> Password </label>
            <line></line>
          </div> */}

          <button type="submit" className={styles.submitBTN}>
            {" "}
            Submit{" "}
          </button>
        </form>
      </div>
      <div className={styles.login_img}>
        <img src={login3} alt="loginimg" />
      </div>
    </div>

    // <>
    //   <h1>forgot password page</h1>
    //   {error}
    //   <form onSubmit={handleformsubmit}>
    //     <label>Enter your email address: </label>
    //     <input
    //       type="email"
    //       name="email"
    //       placeholder="email"
    //       onChange={(e) => {
    //         setEmail(e.target.value);
    //       }}
    //     />
    //     <button type="submit">Submit</button>
    //   </form>
    // </>
  );
};

export default Forgotpassword;
