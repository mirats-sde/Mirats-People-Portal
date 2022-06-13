import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import styles from "../../../../utils/Dialog.css"
import styles from "../../MainPage.module.css";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { firestoredb, storage } from "../../../../firebase-config";
import { useContext, useEffect, useRef, useState } from "react";
import { userAuthContext } from "../../../context/Userauthcontext";
import { async } from "@firebase/util";
import portalprofile from "../../../../assets/portalprofile.jpeg";
import Snackbar from "@mui/material/Snackbar";
import { doc, setDoc } from "firebase/firestore";

const ProfilePicture = ({
  profilepic,
  setProfilePic,
  handleClose,
  handleClickOpen,
}) => {
  const {
    user,
    userData,
    setUserData,
    handleFormSubmit,
    profileimage,
    setProfileimage,
  } = useContext(userAuthContext);
  const { open, setOpen, Alert, snackbarClose } = useContext(userAuthContext);

  const [profileImageCopy, setProfileImageCopy] = useState({});
  const [ProfileImageFile, setProfileImageFile] = useState();
  const imageref = useRef();
  console.log(user?.uid);

  useEffect(() => {
    setProfileImageCopy(profileimage);
  }, [profileimage]);

  // creating profile photo reference:
  const imagesRef = ref(
    storage,
    `peoples-portal/miratsinsights/users/${user?.uid}/Profile`
  );

  //deleting first profile reference:
  const DeleteProfilePhoto = (storageref) => {
    console.log("deleting data");
    listAll(storageref).then((res) => {
      // console.log(res);
      // console.log(res.items);
      // console.log("here");
      res.items.forEach((itemref) => {
        // console.log("here");
        deleteObject(itemref)
          .then(() => {
            console.log("file deleted successfully");
          })
          .catch((er) => {
            console.log(er.message);
          });
      });
    });
  };

  const uploadProfilePhoto = async (profileimage) => {
    console.log("uploading image");
    if (!profileimage) {
      console.log("file not found");
      return;
    } else {
      console.log("file found");
      let filename = profileimage.name;
      console.log(filename);
      const fileref = ref(
        storage,
        `peoples-portal/miratsinsights/users/${user?.uid}/Profile/${filename}`
      );
      const uploadtask = uploadBytesResumable(fileref, profileimage);
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
          console.log("profile image uplaoded");
          getDownloadURL(uploadtask.snapshot.ref).then((url) => {
            console.log(url);
            setProfileimage(profileImageCopy);
            //setting url in doc:
            setDoc(
              doc(
                firestoredb,
                "miratsinsights",
                "peoples",
                "employee",
                String(user?.uid)
              ),
              {
                basicinfo: {
                  ...userData?.basicinfo,
                  profileImage: url,
                },
              },
              { merge: true }
            );
          });
        }
      );
    }
  };

  async function uploadFile(e) {
    e.preventDefault();
    //deleting first reference of profile and then uploading new profile
    DeleteProfilePhoto(imagesRef);
    uploadProfilePhoto(ProfileImageFile);
    handleClose(setProfilePic);
    setOpen({
      open: true,
      severity: "success",
      msg: "Profile Picture Updated Successfully !",
    });
  }

  console.log(profileimage);
  console.log(profileImageCopy);

  return (
    <Dialog
      sx={{ borderRadius: "25" }}
      open={profilepic}
      onClose={() => handleClose(setProfilePic)}
    >
      <form>
        <div className={styles.dialogform}>
          <DialogTitle>
            <h2 style={{ textAlign: "center" }}>Set Your Profile Picture</h2>
          </DialogTitle>
          <DialogContent>
            <div className={styles.field}>
              <TextField
                margin="dense"
                id="profilepic"
                type="file"
                fullWidth
                variant="outlined"
                ref={imageref}
                onChange={(e) => {
                  setProfileImageCopy({
                    name: e.target.files[0].name,
                    url: URL.createObjectURL(e.target.files[0]),
                  });
                  setProfileImageFile(e.target.files[0]);
                }}
              />
              <figure>
                <img
                  className={styles.profilepicture}
                  src={profileImageCopy?.url}
                />
              </figure>
            </div>
          </DialogContent>
        </div>
      </form>
      <div className={styles.form_btns}>
        <button
          className={styles.cancel}
          onClick={() => {
            handleClose(setProfilePic);
            setProfileImageCopy(profileimage);
          }}
        >
          Cancel
        </button>
        <button className={styles.save} onClick={uploadFile}>
          Save
        </button>
      </div>
    </Dialog>
  );
};

export default ProfilePicture;
