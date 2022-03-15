import styles from "./UserPolicyCard.module.css";

const userpolicycarddata = [
  {
    policyheader: "IT Security and Policy",
    policyconfirmation: "Agreed",
    link: "/Read Policy",
  },
  {
    policyheader: "Privacy Policy",
    policyconfirmation: "Agreed",
    link: "/Privacy Policy",
  },
  {
    policyheader: "Workplace Policy",
    policyconfirmation: "Agreed",
    link: "/Workplace Policy",
  },
  {
    policyheader: "Modern Labour Policy",
    policyconfirmation: "Agreed",
    link: "/Modern Labour Policy",
  },
  {
    policyheader: "GDPR Policy",
    policyconfirmation: "Agreed",
    link: "/GDPR Policy",
  },
];

function UserPolicyCard() {
  return (
    <>
      <div className={styles.policy_card}>
        {userpolicycarddata.map((item) => (
          <section className={styles.policy_card_body}>
            <h1>{item.policyheader}</h1>
            <p>{item.policyconfirmation}</p>
            <a href={item.link}>Read Policy </a>
          </section>
        ))}
      </div>
    </>
  );
}

export default UserPolicyCard;
