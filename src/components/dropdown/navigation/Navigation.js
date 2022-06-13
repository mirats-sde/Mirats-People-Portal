import cx from "classnames";

import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { useParams } from "react-router-dom";

import styles from "./Navigation.module.css";

const navpages = [
  {
    linkname: "Dashboard",
    value: "dashboard",
    navlink: "dashboard",
  },
  {
    linkname: "Attendance",
    value: "attendance",
    navlink: "attendance",
  },
  {
    linkname: "Leave",
    value: "leave",
    navlink: "leave",
  },
  {
    linkname: "Salary",
    value: "salary",
    navlink: "salary",
  },
  {
    linkname: "Policies",
    value: "policies",
    navlink: "userdetails/policies",
  },
  {
    linkname: "Resignation",
    value: "resignation",
    navlink: "resignation",
  },
];

const Navigation = () => {
  const navigationpage = useParams();

  return (
    <div className={styles.navcontainer}>
      <div className={styles.navigation}>
        <nav>
          <ul>
            {navpages.map((navdata) => (
              <li>
                {/* <Link to={`/${navdata.navlink}`}>{navdata.linkname}</Link> */}

                {/* <NavLink activeClassName={styles.active} to={`/${navdata.navlink}`}>
                    {navdata.linkname}
                  </NavLink> */}

                <Link
                  className={cx(styles.default, {
                    [styles.active]:
                      navigationpage === navdata?.value ? styles.active : "",
                  })}
                  to={`/${navdata.navlink}`}
                >
                  {navdata.linkname}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
