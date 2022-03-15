import React from "react";
import styles from "./cardInfo.module.css";

function CardInfo({ carddata }) {
  return (
    <>
      {carddata.map((data) => (
        <section className={styles.personal_info_card}>
          <figure>
            <img src={data.cardimg} alt="cardimg" />
          </figure>
          <section className={styles.card_details}>
            <h1>{data.cardheading}</h1>
            <p>{data.carddesc}</p>
          </section>
        </section>
      ))}
    </>
  );
}

export default CardInfo;
