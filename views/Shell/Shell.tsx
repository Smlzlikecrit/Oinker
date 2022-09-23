import { useContext } from "react";
import styled from "@emotion/styled";
import "./Shell.styles.css";
import * as types from "./Shell.types";

import { useStore } from "zustand";
import { context } from "./Shell.store";
import {
  AccountCircle as PersonIcon,
  Home as HomeIcon,
  Groups as GroupIcon,
} from "@mui/icons-material";
import {
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  CssBaseline,
} from "@mui/material";

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.75);
  border-bottom: 1px solid #eee;
`;

const Image = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
`;

const Title = styled(Typography)`
  font-size: 1.1rem;
  font-weight: bold;
  padding: 0 1rem;
`;

const FooterWrapper = styled.footer`
  border-top: 1px solid #eee;
  position: fixed;
  background: white;
  bottom: 0;
  left: 0;
  width: 100%;
`;

const Wrapper = styled.div`
  background: #EEE;
  min-height: 100vh;
  border: 1px solid transparent;
`

const Header = () => {
  return (
    <HeaderWrapper>
      <img src="https://picsum.photos/200/300" alt="" />
    </HeaderWrapper>
  );
};

const Footer = (props: { active: types.active }) => {
  const { active } = props;
  return (
    <FooterWrapper>
      <BottomNavigation showLabels value={active} onChange={console.log}>
        <BottomNavigationAction value="feed" label="Feed" icon={<HomeIcon />} />
        <BottomNavigationAction
          value="following"
          label="Following"
          icon={<GroupIcon />}
        />
        <BottomNavigationAction
          value="profile"
          label="Profile"
          icon={<PersonIcon />}
        />
      </BottomNavigation>
    </FooterWrapper>
  );
};
export const Shell = (props: types.props) => {
  const { children, active } = props;

  const store = useContext(context);
  const state = useStore(store, (state) => state);

  return (
    <>
      <CssBaseline />
      <Wrapper>
      <Header />
      <main>{children}</main>
      <Footer active={active} />
      </Wrapper>
    </>
  );
};

export default Shell;
