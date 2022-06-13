import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Snackbar from "@mui/material/Snackbar";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  confirmPasswordReset,
  updateProfile,
} from "firebase/auth";
import { auth, firestoredb, storage } from "../../firebase-config";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import MuiAlert from "@mui/material/Alert";
import { ClientJS } from "clientjs";

const client = new ClientJS();
const fingerprint = client.getFingerprint();
// console.log(fingerprint);

const userAuthContext = createContext();

//props provider(value provider):
export function UserAuthContextProvider({ children }) {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState({});

  let navigate = useNavigate();

  // snackbar state
  const [open, setOpen] = useState({
    open: false,
    severity: "",
    msg: "",
  });
  // snackbar click function
  const handleClick = () => {
    setOpen({ ...open, open: true });
  };
  const snackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen({ ...open, open: false });
  };
  // snackbar alert function
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  //create user/signup/registration:
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  //login
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  //logout
  function logout() {
    return signOut(auth);
  }

  //Login with google;
  function GoogleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  //password reset function:
  const [passwordResetError, setPasswordResetError] =
    useState("User Not Found !");
  //to check this page mail and reset-password page mail is matching or not
  // const [ConfirmEmail, setConfirmEmail] = useState();
  function Passwordreset(email) {
    return sendPasswordResetEmail(auth, email)
      .then(() => {
        setTimeout(() => {
          navigate("/");
        }, 1500);
        setOpen({
          open: true,
          severity: "success",
          msg: "Password reset email sent!!!",
        });
        //  setConfirmEmail(email);
      })
      .catch((err) => {
        // console.log(err.message);
        switch (err.message) {
          case "Firebase: Error (auth/user-not-found).":
            setOpen({ open: true, severity: "error", msg: passwordResetError });
            break;
          default:
            setPasswordResetError(err.message);
        }
        // console.log(errormessage);
      });
  }

  //setting profile picture:
  async function AddProfile(file, currentUser, setLoading) {
    const fileref = ref(storage, currentUser.uid + ".png");
    setLoading(true);
    const snapshot = await uploadBytes(fileref, file);
    setLoading(false);
    console.log("file has been uploaded");
  }

  //confirm change password:
  const [changePasswordError, setChangePasswordError] = useState();
  function ChangePassword(oobcode, newpassword) {
    return confirmPasswordReset(auth, oobcode, newpassword)
      .then(() => {
        setChangePasswordError("Your password has been changed !!!");
        setOpen({
          open: true,
          severity: "success",
          msg: "Your password has been changed !!!",
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((err) => {
        console.log(err.message);
        switch (err.message) {
          case "Firebase: Password should be at least 6 characters (auth/weak-password).":
            setChangePasswordError("Password should be at least 6 characters");
            setOpen({
              open: true,
              severity: "error",
              msg: "Password should be at least 6 characters",
            });

            break;
          default:
            setChangePasswordError(err.message);
        }
      });
  }

  //getting user data:
  async function GetUserData(id) {
    // console.log(id);
    // console.log("");
    onSnapshot(
      doc(firestoredb, "miratsinsights", "peoples", "employee", id),
      (doc) => {
        setUserData(doc.data());
      }
    );
  }

  //
  async function getUser() {
    const q = query(
      collection(firestoredb, "miratsinsights", "peoples", "employee")
    );
    onSnapshot(q, (querysnapshot) => {
      querysnapshot.forEach((doc) => {
        // console.log(doc.id);
        // console.log(doc.data());
      });
    });
  }

  //get profile image:
  const profileImageRef = ref(
    storage,
    `/peoples-portal/miratsinsights/users/${user?.uid}/Profile`
  );
  const [profileimage, setProfileimage] = useState();
  function GetProfileImage() {
    // console.log("here");
    listAll(profileImageRef).then((res) => {
      res.items.forEach((itemref) => {
        setProfileimage((preobj) => {
          return { ...preobj, name: itemref.name };
        });
        getDownloadURL(itemref).then((url) => {
          setProfileimage((preobj) => {
            return { ...preobj, url: url };
          });
        });
      });
    });
  }

  // useEffect(() => {
  //   if (!loading) {
  //     if (user) {
  //       GetUserData(user?.uid);
  //       GetProfileImage();
  //     } else navigate("/");
  //   }
  // }, [user, loading]);

  // console.log(user);
  // console.log(
  //   new Date(user?.reloadUserInfo?.passwordUpdatedAt)?.toDateString()
  // );
  // console.log(?.toDate());

  //handle form submit
  async function handleFormSubmit(e) {
    e.preventDefault();
    await setDoc(
      doc(
        firestoredb,
        "miratsinsights",
        "peoples",
        "employee",
        String(user?.uid)
      ),
      userData,
      {
        merge: true,
      }
    );
    console.log("Details updated successfully!!!");
  }

  //getting pan_card:
  const PanCard_ref = ref(
    storage,
    `peoples-portal/miratsinsights/users/${user?.uid}/Documents/Pan_card`
  );
  const [panImage, setPanImage] = useState();
  async function getPan_card() {
    listAll(PanCard_ref).then((res) => {
      res.items.forEach((itemref) => {
        setPanImage((preobj) => {
          return { ...preobj, name: itemref.name };
        });
        getDownloadURL(itemref).then((url) => {
          setPanImage((preobj) => {
            return { ...preobj, url: url };
          });
        });
      });
    });
  }

  //getting aadhar_card:
  const Aadhar_ref = ref(
    storage,
    `peoples-portal/miratsinsights/users/${user?.uid}/Documents/Aadhar_card`
  );
  const [aadharImage, setAadharImage] = useState();
  async function getAadhar_card() {
    listAll(Aadhar_ref).then((res) => {
      res.items.forEach((itemref) => {
        setAadharImage((preobj) => {
          return { ...preobj, name: itemref.name };
        });
        getDownloadURL(itemref).then((url) => {
          setAadharImage((preobj) => {
            return { ...preobj, url: url };
          });
        });
      });
    });
  }

  useEffect(() => {
    if (!loading) {
      if (user) {
        GetUserData(user?.uid);
        GetProfileImage();
        getPan_card();
        getAadhar_card();
      } else navigate("/");
    }
  }, [user, loading]);

  return (
    <userAuthContext.Provider
      value={{
        user,
        signUp,
        login,
        logout,
        loading,
        GoogleSignIn,
        Passwordreset,
        ChangePassword,
        userData,
        setUserData,
        handleFormSubmit,
        AddProfile,
        profileimage,
        setProfileimage,
        passwordResetError,
        changePasswordError,
        setChangePasswordError,
        setPasswordResetError,
        open,
        setOpen,
        snackbarClose,
        handleClick,
        Alert,
        panImage,
        aadharImage,
        fingerprint,
      }}
    >
      {children},
      <Snackbar
        open={open?.open}
        autoHideDuration={3000}
        onClose={snackbarClose}
        bodyStyle={{ maxWidth: "100%" }}
      >
        <Alert
          onClose={snackbarClose}
          severity={open?.severity}
          sx={{ width: "100%" }}
        >
          {open?.msg}
        </Alert>
      </Snackbar>
    </userAuthContext.Provider>
  );
}

export { userAuthContext };
