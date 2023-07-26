import React, { useContext, useState } from "react";
import "rsuite/dist/rsuite.min.css";

import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';

import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';

import { NodeProps } from "../../../types/CommonType";
import {
  Logo, Image, NavbarContainer,
} from "./SideNavbarElements";
import { useNavigate, useLocation } from "react-router-dom";


const LogoImg = "HydroSense_logo.png";
const LogoImgIcon = "HydroSense_icon.png";
const SideNavbar = ({ children }: NodeProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeKey, setActiveKey] = useState(location.pathname);
  const [expanded, setExpanded] = useState(true);
  console.log(activeKey, location.pathname)
  const onSelectionChanged = (valueKey: string) => {
    setActiveKey(valueKey);
    navigate(valueKey);
  }
  return (
    <>
      {/* style={{backgroundColor: '#212123'}} */}
      <NavbarContainer>
          <Sidenav expanded={expanded} defaultOpenKeys={['manage-devices', 'manage-users']}>
            <Sidenav.Header>
              <Logo>
                {expanded ? <Image src={LogoImg} /> : <Image src={LogoImgIcon} />}
              </Logo>
              <hr />
            </Sidenav.Header>
            <Sidenav.Body >
              <Nav activeKey={activeKey} onSelect={onSelectionChanged}>
                <Nav.Item eventKey="/" icon={<DashboardIcon />}>
                  Dashboard
                </Nav.Item>
                <Nav.Item eventKey="/water-usage" icon={<GroupIcon />}>
                  Water Usage
                </Nav.Item>
                <Nav.Menu
                  placement="rightStart"
                  eventKey="manage-devices"
                  title="Manage Devices"
                  icon={<GearCircleIcon />}
                >
                  <Nav.Item eventKey="4-1" style={{ color: 'b3b3b3' }}>Devices</Nav.Item>
                  <Nav.Item eventKey="4-1" style={{ color: 'b3b3b3' }}>Device Locations</Nav.Item>
                </Nav.Menu>
                <Nav.Menu
                  placement="rightStart"
                  eventKey="manage-users"
                  title="Manage Users"
                  icon={<GearCircleIcon />}
                >
                  <Nav.Item eventKey="4-1" style={{ color: 'b3b3b3' }}>Users</Nav.Item>
                </Nav.Menu>
                {/* Below for reference if want dropdown */}
                {/* <Nav.Menu
                placement="rightStart"
                eventKey="4"
                title="Reference"
                icon={<GearCircleIcon />}
                >
                <Nav.Item eventKey="4-1" style={{color: 'b3b3b3'}}>Applications</Nav.Item>
                <Nav.Item eventKey="4-2">Channels</Nav.Item>
                <Nav.Item eventKey="4-3">Versions</Nav.Item>
                <Nav.Menu eventKey="4-5" title="Custom Action">
                <Nav.Item eventKey="4-5-1">Action Name</Nav.Item>
                  <Nav.Item eventKey="4-5-2">Action Params</Nav.Item>
                </Nav.Menu>
              </Nav.Menu> */}
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
