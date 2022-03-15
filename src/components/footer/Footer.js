import styles from "./footer.module.css";

function Footer() {
  const footerLinks_Data = [
    {
      linkTitle: "Privacy Policy",
      linkUrl: "Privacy Policy",
    },
    {
      linkTitle: "Term Of Use",
      linkUrl: "Term Of Use",
    },
    {
      linkTitle: "Privacy Policy",
      linkUrl: "Privacy Policy",
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

  return (
    <div className={styles.footer_container}>
      <div>
        <p>Copyright (c) 2022 Mirats Insights, LLC. All rights reserved.</p>
      </div>

      <div className={styles.footer_linkContainer}>
        {footerLinks_Data.map((item) => {
          return <a href={item.linkUrl}> {item.linkTitle} |</a>;
        })}
      </div>

      <div>भारत</div>
    </div>
  );
}

export default Footer;
