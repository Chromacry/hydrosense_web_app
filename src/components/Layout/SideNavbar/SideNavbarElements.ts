import styled from "styled-components";
import { NodeProps } from "../../../types/CommonType";
import { Link } from "react-router-dom";
import { darkGray, lightBlueAccent, lightGray, lightPurpleAccent, primaryColor, violetAccent } from "../../../constants/DesignConstant";

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

export const NavbarContainer = styled.div<NodeProps>`
  width: 100%;
  height: 100%; 
  display: flex;
  flex-direction: row;
  
  //* SideNav
  .rs-sidenav {
    background-color: ${primaryColor};
  }
  //* Header Color
  .rs-sidenav-header {
    background-color: ${primaryColor};
    color: #fff; !important;
  }
  //* SideNav expanded
  .rs-sidenav-collapse-in {
    width: 25%;
  }
  //* Botom body of menu items color
  .rs-sidenav-body {
    background-color: ${primaryColor};
    color: #fff; !important;
  }
  //* Toggle button collapse
  .rs-sidenav-toggle-button {
    background-color: ${primaryColor};
    color: #fff;
  }
  .rs-sidenav-toggle-button:hover {
    background-color: ${lightGray};
    color: #fff;
  }
  //* Item sub menu color
  .rs-dropdown-item {
    background-color: ${primaryColor};
    color: #fff; !important;
  }
  //* Main menu Item clicked
  .rs-sidenav-default.rs-sidenav-collapse-in .rs-dropdown-menu>.rs-dropdown-item.rs-dropdown-item-active, .rs-sidenav-default.rs-sidenav-collapse-in .rs-sidenav-item.rs-sidenav-item-active, .rs-sidenav-default.rs-sidenav-collapsing .rs-dropdown-menu>.rs-dropdown-item.rs-dropdown-item-active, .rs-sidenav-default.rs-sidenav-collapsing .rs-sidenav-item.rs-sidenav-item-active {
    color: ${lightBlueAccent}; !important;
  }
  //* Main menu item
  .rs-sidenav-default .rs-dropdown-toggle, .rs-sidenav-default .rs-sidenav-item {
    background-color: ${primaryColor};
    color: #fff; !important;
  }
  //* Main Menu item hover
  .rs-sidenav-default .rs-sidenav-item:hover {
    background-color: ${violetAccent};
    color: #fff; !important;
  }
  //* main sub menu item icon
  .rs-sidenav-item-icon .rs-icon {
    color: #fff !important;
  }
  //* main sub menu item text color
  .rs-sidenav-default .rs-dropdown-toggle {
    // color: 	#880808 !important;
  }
  //* sub menu item clicked
  .rs-dropdown-item-active {
    background-color: ${violetAccent};
    color: ${lightBlueAccent} !important;
  }
  //* sub menu item hovver
  .rs-dropdown-item:hover {
    background-color: ${violetAccent};
    color: #fff !important;
  }
`;

export const Logo = styled.div`
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
  // border-radius: 10px;
  // padding: 5px;
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