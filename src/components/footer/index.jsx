import React from "react";
import Link from "../link";
import "./style.css";

const Footer = () => (
  <div className="footer">
    <div className="footer__links">
      <Link to="/">Support</Link>
      <Link to="/">Learning</Link>
      <Link to="/">Русская версия</Link>
    </div>

    <div className="footer__copyright">© 2021 mkungurtsev</div>
  </div>
);

export default Footer;
