import styles from "./footer.module.css";

const footerLinksData = [
  {
    linkTitle: "Privacy Policy",
    linkUrl: "Privacy Policy",
  },
  {
    linkTitle: "Term Of Use",
    linkUrl: "Term Of Use",
  },
  {
    linkTitle: "Legal",
    linkUrl: "Legal",
  },
  {
    linkTitle: "Sitemap",
    linkUrl: "Sitemap",
  },
];

const Footer = () => {
  return (
    <footer>
      <div className={styles.footer_container}>
        <div>
          <p>Copyright (c) 2022 Mirats Insights, LLC. All rights reserved.</p>
        </div>

        <div className={styles.footer_linkContainer}>
          {footerLinksData.map((item) => {
            return <a href={item.linkUrl}> {item.linkTitle} <span>|</span> </a>;
          })}
        </div>

        <div>भारत</div>
      </div>
    </footer>
  );
};

export default Footer;
