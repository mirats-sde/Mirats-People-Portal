import React from "react";
import styles from "./Login.module.css";
import logo from "../../assets/miratsLogo.png";
import login from "../../assets/login.png";
import loginundraw from "../../assets/loginundraw.png";
import login2 from "../../assets/login2.png";
import login3 from "../../assets/login3.png";
import welcome from "../../assets/welcome.png";
import welcome2 from "../../assets/welcome2.png";
import TextField from "@mui/material/TextField";

const Login = () => {
  return (
    <div className={styles.login_container}>
      <div className={styles.login_content}>
        <div className={styles.form_img}>
          <img src={logo} alt="logo" />
        </div>
        {/* <h1>Login To Start Your Day!</h1> */}
        {/* <form>
          <div className={styles.input_field}>
            <TextField
              id="email"
              type="email"
              label="Email"
              fullWidth
              variant="outlined"
              inputProps={{ sx: { color: "#333" } }}
            />
          </div>
        </form> */}

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

          <a href="link"> Forgot Password? </a>
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
