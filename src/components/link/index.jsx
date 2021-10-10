import React from "react";
import { Link as RouterLink } from "react-router-dom";
import "./style.css";

const Link = ({ to, children }) => (
  <RouterLink to={to} className="router-link">
    {children}
  </RouterLink>
);

export default Link;
