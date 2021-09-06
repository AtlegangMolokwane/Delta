import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "./icon/Bitmap.png";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="block-header">
        <img className="image-hearder" src={logo} alt="Logo" />
        <p className="text">CheapShark</p>
        <div className="topic-header">
          <HeaderLink page="Deals" />
          <HeaderLink page="Store" />
          <HeaderLink page="Games" />
        </div>
      </div>
    );
  }
}
export const HeaderLink = ({ page }) => {
  const title = page.charAt(0).toUpperCase() + page.slice(1);

  return (
    <Link className="text-header" to={`/${page}`}>
      {title}
    </Link>
  );
};
export default Header;
