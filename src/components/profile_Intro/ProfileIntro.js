import styles from "./ProfileIntro.module.css";

const ProfileIntro = ({ profileintrodata }) => {
  return (
    <>
      {profileintrodata.map((profiledata) => (
        <div className={styles.profileIntro}>
          <section className={styles.profile_desc}>
            <h1>Morning, {profiledata.profileName}</h1>
            <p className={styles.quote}>{profiledata.profiledesc}</p>
          </section>
          <section className={styles.profileImg}>
            <figure>
              <img src={profiledata.profileimg} alt="profileimg" />
            </figure>
          </section>
        </div>
      ))}
    </>
  );
};

export default ProfileIntro;

