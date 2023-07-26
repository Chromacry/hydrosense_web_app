import React, { FC } from "react";
import SideNavbar from "./SideNavbar/SideNavbar";
import Footer from "./Footer/Footer";
import { NodeProps } from "../../types/CommonType";
import { Container, SideNavContainer, } from "./LayoutElements";

const Layout: FC<NodeProps> = ({ children, transparent }) => {
  return (
    <>
      <SideNavbar>
        <Container>
          {children}
          {/* <Footer /> */}
        </Container>
      </SideNavbar>
    </>
  );
};

export default Layout;
