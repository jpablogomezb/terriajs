import React from "react";
import classNames from "classnames";
import Icon from "../../Styled/Icon";
import PropTypes from "prop-types";
import Styles from "./menu-button.scss";

/**
 * Basic button for use in the menu part at the top of the map for User Login.
 *
 * @constructor
 */
function MenuButtonLogin(props) {
  const handleClick = (event) => {
    event.preventDefault();
    window.location.href = props.href;
  };

  return (
    <a
      onClick={handleClick}
      className={classNames(Styles.btnAboutLink)}
      href={props.url}
      title={props.caption}
    >
      {<Icon glyph={Icon.GLYPHS.user} />}
      <span>{props.caption}</span>
    </a>
  );
}

MenuButtonLogin.defaultProps = {
  url: "/login/"
};

MenuButtonLogin.propTypes = {
  href: PropTypes.string,
  caption: PropTypes.string.isRequired
};

export default MenuButtonLogin;
