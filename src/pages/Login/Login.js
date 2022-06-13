import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { firestoredb } from "../../firebase-config";
import { userAuthContext } from "../context/Userauthcontext";
import styles from "./Login.module.css";
import logo from "../../assets/miratsLogo.png";
import login3 from "../../assets/login3.png";

// import { Link } from "react-router-dom";
// -------------------------------------------------------------------------
//                                  SanckBar
// --------------------------------------------------------------------------

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// -------------------------------------------------------------------------
//                                  /SanckBar
// --------------------------------------------------------------------------
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let { user } = useContext(userAuthContext);
  const { login, GoogleSignIn } = useContext(userAuthContext);
  const navigate = useNavigate();
  // snackbar state
  const [open, setOpen] = useState(false);
  // snackbar alert function
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  // snackbar click function
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // console.log(user);
  // handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");

    //checking if the financial data exists or not:
    const q = query(
      collection(firestoredb, "miratsinsights", "peoples", "employee")
    );
    const querysnapshot = await getDocs(q);
    try {
      await login(email, password).then((cred) => {
        const user_uid = cred.user.uid;
        console.log(user_uid);
        querysnapshot.forEach((doc) => {
          if (doc.id == user_uid) {
            if (
              !doc.data()?.BankDetails &&
              !doc.data()?.IdentificationDetails
            ) {
              console.log("Bank and Identity details not found");
              navigate("/Financial_IdentityDetails");
            } else {
              console.log("Bank and Identity details found");
              navigate("/dashboard");
            }
          }
        });
      });
    } catch (err) {
      switch (err.message) {
        case "Firebase: Error (auth/user-not-found).":
          setError("User Not Found !");
          break;
        case "Firebase: Error (auth/wrong-password).":
          setError("Wrong Password!!!");
          break;
        default:
          setError(err.message);
          break;
      }
      setOpen(true);
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_content}>
        <div className={styles.form_img}>
          <img src={logo} alt="logo" />
        </div>

        <form className={styles.loginForm} onSubmit={handleFormSubmit}>
          <div className={styles.animate_label}>
            <input
              type="email"
              id="username"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <label for="username"> Email or phone </label>
            <line></line>
          </div>

          <div className={styles.animate_label}>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <label for="password"> Password </label>
            <line></line>
          </div>

          <Link to="/ForgotPassword">Forgot Password?</Link>
          {/* <a href="link"> Forgot Password? </a> */}
          <button type="submit" className={styles.submitBTN}>
            {" "}
            Log In{" "}
          </button>
          <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            bodyStyle={{ maxWidth: "100%" }}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>
        </form>
      </div>
      <div className={styles.login_img}>
        <img src={login3} alt="loginimg" />
      </div>
    </div>
  );
};

export default Login;
