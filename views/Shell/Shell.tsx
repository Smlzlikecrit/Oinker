import { Dialog } from '@mui/material'

import styled from "@emotion/styled";
import { ArrowBack as ArrowIcon } from "@mui/icons-material";
import { IconButton, CircularProgress, TextField, Button } from "@mui/material";

import {
  AccountCircle as PersonIcon,
  Home as HomeIcon,
  Groups as GroupIcon,
} from "@mui/icons-material";

import {
  Typography,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";

import { useData } from './Shell.useData'
import * as types from "./Shell.types";
import { Auth, Create, Email, Reset } from './Shell.components'


const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3.5rem;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.75);
  border-bottom: 1px solid #eee;
`;

const Image = styled.img`
  border: 1px solid red;
  background: blue;
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
  background: #eee;
  min-height: 100vh;
  border: 1px solid transparent;
`;

const Main = styled.main`
  padding-top: 3.5rem;
`;

const LoadingWrap = styled.div`
  padding-top: 10rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const FormTitle = styled.h2`
  font-size: 3rem;
  margin: 1rem;
  text-align: center;
`

const InputWrap = styled.div`
  width: 100%;
  padding: 0.5rem;
`

const Content = styled.form`
  padding: 2rem;
`

const Modal = styled(Dialog)`
  & .MuiPaper-root {
    width: 100%;
    max-width: 30rem;
  }
`

const Header = (props: { title: string }) => {
  const { title } = props;

  return (
    <HeaderWrapper>
      {title !== "Profile" && (
        <Image src="https://picsum.photos/200/300" alt="" />
      )}

      {title === "Profile" && (
        <IconButton>
          <ArrowIcon />
        </IconButton>
      )}
      <Title>{title}</Title>
    </HeaderWrapper>
  );
};

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem;
`

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
  const { children, active, title } = props;
  const data = useData()

  return (
    <>
      <Wrapper>
        <Header title={title} />
        <Main>
        {data.phase === 'resetting' && <Reset />}
        {data.phase === 'creating' && <Create />}
        {data.phase === 'authenticating' && <Auth />}
        {data.phase === 'emailed-confirm' || data.phase === 'emailed-reset' && <Email />}
        {data.phase === 'accessed' && children}
        {data.phase === 'loading' && (
          <LoadingWrap>
            <CircularProgress size={90} />
          </LoadingWrap>
        )}
        </Main>
        <Footer active={active} />
      </Wrapper>
    </>
  );
};

export default Shell;
