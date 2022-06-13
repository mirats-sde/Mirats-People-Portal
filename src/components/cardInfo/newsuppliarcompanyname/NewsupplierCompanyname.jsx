import React from "react";
import styles from "./newsuppliarcompanyname.module.css";

const projectManagers = [
  {
    title: "Project Manager 1",
    mail: "pm1@companyname.com",
    mobile: "+91(895) 759 8589",
  },
  {
    title: "Project Manager 1",
    mail: "pm1@companyname.com",
    mobile: "+91(895) 759 8589",
  },
];

const supplyManager = [
  {
    title: "Supply Manager 1",
    mail: "pm1@companyname.com",
    mobile: "+91(895) 759 8589",
  },
  {
    title: "Supply Manager 1",
    mail: "pm1@companyname.com",
    mobile: "+91(895) 759 8589",
  },
];

const accountManager = [
  {
    title: "Account Manager 1",
    mail: "pm1@companyname.com",
    mobile: "+91(895) 759 8589",
  },
  
];

const NewsupplierCompanyname = () => {
  return (
    <div className={styles.parentCompanyContainer}>
      <div className={styles.companyContent}>
        <h1>Company Name</h1>
        <h3 className={styles.adminmail}>admin@companyname.com</h3>

        <h2 className={styles.managers}>Project Managers’</h2>
        {projectManagers.map((elem, i) => {
          return (
            <div className={styles.comapnyCard} key={i}>
              <h2>{elem.title}</h2>
              <a href="#">{elem.mail}</a>
              <h3>{elem.mobile}</h3>
            </div>
          );
        })}

        <h2 className={styles.managers}>Supply Managers’</h2>
        {supplyManager.map((elem, i) => {
          return (
            <div className={styles.comapnyCard} key={i}>
              <h2>{elem.title}</h2>
              <a href="#">{elem.mail}</a>
              <h3>{elem.mobile}</h3>
            </div>
          );
        })}

        <h2 className={styles.managers}>Account Managers’</h2>
        {accountManager.map((elem, i) => {
          return (
            <div className={styles.comapnyCard} key={i}>
              <h2>{elem.title}</h2>
              <a href="#">{elem.mail}</a>
              <h3>{elem.mobile}</h3>
            </div>
          );
        })}

        
      </div>
    </div>
  );
};

export default NewsupplierCompanyname;
