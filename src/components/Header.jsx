import React from "react";
import PropTypes from "prop-types";
import "../App.css";

function Header(props) {
  const { title, style, className } = props;
  return (
    <div style={style} className={`header ${className ? className : ""}`}>
      {title}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
