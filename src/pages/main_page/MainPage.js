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

// hooks
import { useState } from "react";

// in project imports
import styles from "./MainPage.module.css";
import miratsLogo from "../../assets/miratsLogo.png";
import profileImg from "../../assets/profileImg.png";
import emp from "../../assets/emp.png";
// import personalInfoImg from "../../assets/personalInfoImg.png";
import personalInfo from "../../assets/personalInfo.png";
import personalInfoImgmodified from "../../assets/personalInfoImgmodified.png";

// data
const leftpages = [
  {
    name: "Personal Information",
    value: "personal-information",
  },
  {
    name: "Financial Details",
    value: "financial-details",
  },
  {
    name: "Identity Details",
    value: "identity-details",
  },
  {
    name: "Work Details",
    value: "work-details",
  },
  {
    name: "Sign-In and Security",
    value: "sign-in-security",
  },
  {
    name: "Policies",
    value: "policies",
  },
  {
    name: "Documents and Legal",
    value: "documents",
  },
];

const MainPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className={styles.container}>
        <header>
          <section className={styles.left}>
            <figure>
              <img src={miratsLogo} alt="logo" />
            </figure>
          </section>
          <section className={styles.right}>
            <section className={styles.circles}></section>
            <section className={styles.sign_in}>
              <section className={styles.sign_in_details}>
                <p>Rohan Gupta</p>
                <p>Recruitment Coordinator</p>
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
                    <Avatar sx={{ width: 40, height: 40, objectFit: "cover" }}>
                      {/* <figure>
                    <img src={profileImg} alt="profileimg" />
                  </figure> */}
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
                <MenuItem>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </section>
          </section>
        </header>

        {/* profile intro */}
        <div className={styles.profileIntro}>
          <section className={styles.profile_desc}>
            <h1>
              Morning, <span>Rohan</span>
            </h1>
            <p className={styles.quote}>Follow Your Passion</p>
          </section>
          <section className={styles.profileImg}>
            <figure>
              <img src={profileImg} alt="profileimg" />
            </figure>
          </section>
        </div>

        {/* navigation */}
        <div className={styles.navigation}>
          <nav>
            <ul>
              <li>Attendance</li>
              <li>Leave</li>
              <li>Salary</li>
              <li>Policies</li>
              <li>Resignation</li>
            </ul>
          </nav>
        </div>

        {/* profile details */}
        <div className={styles.profile_details}>
          <section className={styles.profile_left}>
            <section className={styles.profile_left_details}>
              <figure>
                <img src={emp} alt="profileimg" />
              </figure>
              <h1>Rohan Gupta</h1>
              <p>rohan.gupta@miratsinsights.com</p>
            </section>
            <section className={styles.left_pages}>
              {leftpages.map((pages, index) => {
                return (
                  <div className={styles.pages}>
                    <h4>{pages.name}</h4>
                  </div>
                );
              })}
            </section>
          </section>
          <section className={styles.profile_right}>
            {/* <PersonalInformation /> */}
            <IdentityDetails />
          </section>
        </div>

        {/* container end */}
      </div>
    </>
  );
};

const PersonalInformation = () => {
  return (
    <>
      <div className={styles.profile_info}>
        <section className={styles.personal_info_card}>
          <figure>
            <img src={personalInfo} alt="cardimg" />
          </figure>
          <section className={styles.card_details}>
            <h1>Personal Information</h1>
            <p>
              Manage your personal information, including phone numbers and
              email addresses where you can be contacted.
            </p>
          </section>
        </section>

        {/* profile details cards */}
        <div className={styles.profile_details_cards}>
          <section className={styles.card_body}>
            <h1>Name</h1>
            <p>Rohan Gupta</p>
          </section>
          <section className={styles.card_body}>
            <h1>Date of Birth</h1>
            <p>03 October, 1999</p>
          </section>
          <section className={styles.card_body}>
            <h1>Gender</h1>
            <p>Male</p>
          </section>
          <section className={styles.card_body}>
            <h1>Phone Number</h1>
            <p>+91 (890) 989 8998</p>
          </section>
          <section className={styles.card_body}>
            <h1>Personal Email</h1>
            <p>rohang@email.com</p>
          </section>
          <section className={styles.card_body}>
            <h1>Location</h1>
            <p>Mumbai, India</p>
          </section>
          <section className={styles.card_body}>
            <h1>Nickname</h1>
            <p>unsecified</p>
          </section>
          <section className={styles.card_body}>
            <h1>Profile Picture</h1>
            <p>Set Profile Picture</p>
          </section>
        </div>
      </div>
    </>
  );
};

const IdentityDetails = () => {
  return (
    <div className={styles.identity_details}>
      <section className={styles.personal_info_card}>
        <figure>
          <img src={personalInfoImgmodified} alt="cardimg" />
        </figure>
        <section className={styles.card_details}>
          <h1>Identity Details</h1>
          <p>
            Manage your identity information, including shipping/physical
            address, government issued cards and other details to get enrolled
            in our benefits automatically.
          </p>
        </section>
      </section>

      <section className={styles.details}>
        <button className={styles.btn_detail}>Add Passport Details</button>
        <section className={styles.details_card}>
          <section className={styles.details_card_body}>
            <h1>Physical Address</h1>
            <div className={styles.address}>
              <p>Rohan Gupta</p>
              <p>C-23, Block C,</p>
              <p>Sector 7, Dwarka</p>
              <p>New Delhi, India - 110000</p>
            </div>
            <button>Edit Details</button>
          </section>

          <section className={styles.details_card_body}>
            <h1>Driving License</h1>
            <div className={styles.address}>
              <p>Rohan Gupta</p>
              <p>03 Oct, 1999</p>
              <p>XXXXXXXXXXXX</p>
            </div>
            <button>Edit Details</button>
          </section>

          <section className={styles.details_card_body}>
            <h1>Aadhar Card</h1>
            <div className={styles.address}>
              <p>Rohan Gupta</p>
              <p>03 Oct, 1999</p>
              <p>S/O Rajesh Gupta</p>
              <p>1983 8XXX XXXX</p>
            </div>
            <button>Edit Details</button>
          </section>

          <section className={styles.details_card_body}>
            <h1>Physical Address</h1>
            <div className={styles.address}>
              <p>Rohan Gupta</p>
              <p>03 Oct, 1999</p>
              <p>S/O Rajesh Gupta</p>
              <p>BUZPK31XXX</p>
            </div>
            <button>Edit Details</button>
          </section>
        </section>
      </section>
    </div>
  );
};

const WorkDetails = () => {
    return (
        <div className={styles.work_details}>
            
        </div>
    )
}

export default MainPage;
