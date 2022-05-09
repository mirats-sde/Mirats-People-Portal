import React from "react";
import styles from "./Login.module.css";
import logo from "../../assets/miratsLogo.png";
import login3 from "../../assets/login3.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className={styles.login_container}>
      <div className={styles.login_content}>
        <div className={styles.form_img}>
          <img src={logo} alt="logo" />
        </div>

        <form className={styles.loginForm}>
          <div className={styles.animate_label}>
            <input type="text" id="username" required />
            <label for="username"> Email or phone </label>
            <line></line>
          </div>

          <div className={styles.animate_label}>
            <input type="password" id="password" required />
            <label for="password"> Password </label>
            <line></line>
          </div>

          <Link to="/forgot-password">Forgot Password?</Link>
          {/* <a href="link"> Forgot Password? </a> */}
          <button> Log In </button>
        </form>
      </div>
      <div className={styles.login_img}>
        <img src={login3} alt="loginimg" />
      </div>
    </div>
  );
};

export default Login;
