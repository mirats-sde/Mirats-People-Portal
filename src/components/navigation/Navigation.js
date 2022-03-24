// import cx from "classnames";

import { Link } from "react-router-dom";

// import { useParams } from "react-router-dom";

import styles from "./Navigation.module.css";

const navpages = [
  {
    linkname: "Attendance",
    value: "attendance",
    navlink: "/attendance",
  },
  {
    linkname: "Leave",
    value: "/leave",
    navlink: "/leave",
  },
  {
    linkname: "Salary",
    value: "/salary",
    navlink: "/salary",
  },
  {
    linkname: "Policies",
    value: "/policies",
    navlink: "/policies",
  },
  {
    linkname: "Resignation",
    value: "/resignation",
    navlink: "/resignation",
  },
];

const Navigation = () => {
  // const navigationpage = useParams();

  return (
    <div className={styles.navcontainer}>
      <div className={styles.navigation}>
        <nav>
          <ul>
            {navpages.map((navdata) => (
              <li>
                <Link to={`/${navdata.navlink}`}>{navdata.linkname}</Link>
                {/* <Link
                  className={cx(styles.default, {
                    [styles.linkactive]:
                      navigationpage === navdata?.value
                        ? styles.linkactive
                        : "",
                  })}
                  to={`/${navdata.navlink}`}
                >
                  {navdata.linkname}
                </Link> */}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
