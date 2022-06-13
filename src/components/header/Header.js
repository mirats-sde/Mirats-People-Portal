// material ui
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import { useContext, useEffect, useState } from "react";

import styles from "./Header.module.css";
import miratsLogo from "../../assets/miratsLogo.png";
import portalprofile from "../../assets/default-profile.jpeg";
import { userAuthContext } from "../../pages/context/Userauthcontext";
import { doc, getDoc, query } from "firebase/firestore";
import { firestoredb, storage } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, listAll, ref } from "firebase/storage";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { user, logout, profileimage, userData } = useContext(userAuthContext);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const [NameInfo, setNameInfo] = useState();

  // //getting data from firestore:
  // async function getNameData(id) {
  //   console.log(id);
  //   const q = query(
  //     doc(
  //       firestoredb,
  //       "miratsinsights",
  //       "employees",
  //       "Personal_Info",
  //       String(id)
  //     )
  //   );
  //   const querysnapshot = await getDoc(q);
  //   if (querysnapshot.exists()) {
  //     console.log(querysnapshot.data());
  //     setNameInfo({
  //       ...NameInfo,
  //       Name: querysnapshot.data().Name,
  //     });
  //   }
  // }
  // useEffect(() => {
  //   getNameData(user?.uid);
  //   console.log(NameInfo);
  // }, [user]);

  //logout form:
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate("/");
      console.log("user is logged out successfully!!!!");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <header>
        <section className={styles.left}>
          <figure>
            <img src={miratsLogo} alt="logo" />
          </figure>
        </section>
        <section className={styles.right}>
          <section className={styles.miratsid}>
            <p className={styles.id}> {userData?.WorkDetails?.employeeID}</p>
          </section>
          <section className={styles.sign_in}>
            <section className={styles.sign_in_details}>
              <p>
                {userData?.basicinfo?.firstname +
                  " " +
                  userData?.basicinfo?.lastname}
              </p>
              <p>{userData?.WorkDetails?.position}</p>
            </section>

            <Box>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar>
                    <figure className={styles.portalprofile}>
                      <img
                        src={profileimage?.url || portalprofile}
                        alt="profileimg"
                      />{" "}
                    </figure>
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem>
                <Avatar /> Profile
              </MenuItem>
              <MenuItem>
                <Avatar /> My account
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Add another account
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </section>
        </section>
      </header>
    </div>
  );
};

export default Header;
