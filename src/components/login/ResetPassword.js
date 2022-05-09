import styles from "./Login.module.css";
import logo from "../../assets/miratsLogo.png";
import login3 from "../../assets/login3.png";
import encryption from "../../assets/encryption.png"

const ResetPassword = () => {
  return (
    <div className={styles.login_container}>
      <div className={styles.login_content}>
        <div className={styles.form_img}>
          <img src={logo} alt="logo" />
        </div>

        <form className={styles.loginForm}>
          <div className={styles.animate_label}>
            <input type="password" id="password" required />
            <label for="password"> Password </label>
            <line></line>
          </div>

          <div className={styles.animate_label}>
            <input type="password" id="confirmpassword" required />
            <label for="confirmpassword"> Confirm Password </label>
            <line></line>
          </div>

          <button> Reset Password </button>
        </form>
      </div>
      <div className={styles.login_img}>
        <img className={styles.reset_password} src={encryption} alt="loginimg" />
      </div>
    </div>
  );
};

export default ResetPassword;
