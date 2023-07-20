import React, { useContext, useState } from "react";
import "rsuite/dist/rsuite.min.css";

import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';

import MagicIcon from '@rsuite/icons/legacy/Magic';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';

import { NodeProps } from "../../../types/CommonType";
import {
  Logo, Image, NavbarContainer,
} from "./SideNavbarElements";


const LogoImg = "logo512.png";

const SideNavbar = ({ children }: NodeProps) => {
  const [activeKey, setActiveKey] = useState('1');
  const [expanded, setExpanded] = useState(true);

  const onSelectionChanged = (valueKey : string) => {
    console.log(valueKey);
    setActiveKey(valueKey);
  } 
  return (
    <>
    {/* style={{backgroundColor: '#212123'}} */}
      <NavbarContainer >
        <Sidenav expanded={expanded} defaultOpenKeys={['3', '4']}>
        <Sidenav.Header>
            <Logo>
              <Image src={LogoImg} />
            </Logo>
            <hr />
          </Sidenav.Header>
          <Sidenav.Body >
            <Nav activeKey={activeKey} onSelect={onSelectionChanged}>
              <Nav.Item eventKey="1" icon={<DashboardIcon />}>
                Dashboard
              </Nav.Item>
              <Nav.Item eventKey="2" icon={<GroupIcon />}>
                User Group
              </Nav.Item>
              <Nav.Menu placement="rightStart" eventKey="3" title="Advanced" icon={<MagicIcon />}>
                <Nav.Item eventKey="3-1">Geo</Nav.Item>
                <Nav.Item eventKey="3-2">Devices</Nav.Item>
                <Nav.Item eventKey="3-3">Loyalty</Nav.Item>
                <Nav.Item eventKey="3-4">Visit Depth</Nav.Item>
              </Nav.Menu>
              <Nav.Menu
                placement="rightStart"
                eventKey="4"
                title="Settings"
                icon={<GearCircleIcon />}
              >
                <Nav.Item eventKey="4-1" style={{color: 'b3b3b3'}}>Applications</Nav.Item>
                <Nav.Item eventKey="4-2">Channels</Nav.Item>
                <Nav.Item eventKey="4-3">Versions</Nav.Item>
                <Nav.Menu eventKey="4-5" title="Custom Action">
                  <Nav.Item eventKey="4-5-1">Action Name</Nav.Item>
                  <Nav.Item eventKey="4-5-2">Action Params</Nav.Item>
                </Nav.Menu>
              </Nav.Menu>
            </Nav>
          </Sidenav.Body>
          <Sidenav.Toggle expanded={expanded} onToggle={expanded => setExpanded(expanded)} />
        </Sidenav>
        {children}
      </NavbarContainer>
    </>
  );
};

export default SideNavbar;
