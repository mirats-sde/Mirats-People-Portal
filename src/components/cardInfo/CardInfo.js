import styles from "./cardInfo.module.css";
import classNames from "classnames";
import { v4 as uuid } from "uuid";
// let card={
//   gradientclass:styles.mypersonal_info_card
// }
function CardInfo({ carddata }) {
  return (
    <>
      {carddata.map((data) => (
        <section
          className={classNames(styles.personal_info_card, data.gradientclass)}
          key={uuid()}
        >
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
