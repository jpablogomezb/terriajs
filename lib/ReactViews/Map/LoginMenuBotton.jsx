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
  const handleClick = () => {
    // Open the new window
    window.open(props.href, "newWindow", "height=600,width=1050");
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
  url: "#"
};

MenuButtonLogin.propTypes = {
  href: PropTypes.string,
  caption: PropTypes.string.isRequired
};

export default MenuButtonLogin;
