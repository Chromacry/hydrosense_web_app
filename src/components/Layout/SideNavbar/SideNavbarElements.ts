import styled from "styled-components";
import { NodeProps } from "../../../types/CommonType";
import { Link } from "react-router-dom";
import { darkGray, lightGray } from "../../../constants/DesignConstant";

export const Nav = styled.div<NodeProps>`
  // background-color: dodgerblue;
  background-color: ${(props) =>
    props.transparent ? "transparent" : "#197297"};
  color: #fff;
  height: 70px;
  // margin-top: -70px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  z-index: 10;
  top: 0;
  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

export const NavbarContainer = styled.div`
  width: 25%;
  height: 100vh; 
  display: flex;
  
  //* SideNav
  .rs-sidenav {
    background-color: ${darkGray};
  }
  //* Header Color
  .rs-sidenav-header {
    background-color: ${darkGray};
    color: #fff; !important;
  }
  //* Botom body of menu items color
  .rs-sidenav-body {
    background-color: ${darkGray};
    color: #fff; !important;
  }
  //* Toggle button collapse
  .rs-sidenav-toggle-button {
    background-color: ${darkGray};
    color: #fff;
  }
  .rs-sidenav-toggle-button:hover {
    background-color: ${lightGray};
    color: #fff;
  }
  //* Item sub menu color
  .rs-dropdown-item {
    background-color: ${darkGray};
    color: #fff; !important;
  }
  //* Main menu Item clicked
  .rs-sidenav-default.rs-sidenav-collapse-in .rs-dropdown-menu>.rs-dropdown-item.rs-dropdown-item-active, .rs-sidenav-default.rs-sidenav-collapse-in .rs-sidenav-item.rs-sidenav-item-active, .rs-sidenav-default.rs-sidenav-collapsing .rs-dropdown-menu>.rs-dropdown-item.rs-dropdown-item-active, .rs-sidenav-default.rs-sidenav-collapsing .rs-sidenav-item.rs-sidenav-item-active {
    color: #000; !important;
  }
  //* Main menu item
  .rs-sidenav-default .rs-dropdown-toggle, .rs-sidenav-default .rs-sidenav-item {
    background-color: ${darkGray};
    color: #fff; !important;
  }
  //* Main Menu item hover
  .rs-sidenav-default .rs-dropdown-toggle, .rs-sidenav-default .rs-sidenav-item:hover {
    // background-color: ${darkGray};
    color: #fff; !important;
  }
  //* main sub menu item icon
  .rs-sidenav-item-icon .rs-icon {
    color: #000 !important;
  }
  //* main sub menu item text color
  .rs-sidenav-default .rs-dropdown-toggle {
    // color: 	#880808 !important;
  }
  //* sub menu item clicked
  .rs-dropdown-item-active {
    color: #000 !important;
  }
`;

export const Logo = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 10px;
  overflow: hidden;
  margin: 0 auto;
  margin-top: 15px;
`;

export const Title = styled.h3`
  font-weight: bold;
  color: #fff;

  @media screen and (max-width: 700px) {
    display: none;
  }
`;
export const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export const AvatarMenu = styled.div`
  display: flex;
  align-items: center;
  padding: 3px 5px;
`;

export const NavItemContainer = styled.ul`
  color: #fff;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px;
`;