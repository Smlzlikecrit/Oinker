import { useContext, FormEvent, useState } from "react";
import { Dialog } from '@mui/material'
import { useStore } from "zustand";
import { context as userContext } from "../../environments/api/user";
import { context } from "./Shell.store";

import styled from "@emotion/styled";
import { ArrowBack as ArrowIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import * as types from "./Shell.types";

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
  const store = useContext(context)
  const phase = useStore(store, (state) => state.phase)

  // const userStore = useContext(userContext);
  // const userPhase = useStore(userStore, (state) => state.phase);
  // const user = useStore(userStore, (state) => state.user);
  // const signIn = useStore(userStore, (state) => state.actions.signIn);
  // const signUp = useStore(userStore, (state) => state.actions.signUp);
  // const signOut = useStore(userStore, (state) => state.actions.signOut);
  

  const dataFromSubmit = (event: FormEvent<HTMLFormElement>): Record<string, string> => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    if (!form) throw new Error("Form is required");
    return Object.fromEntries(new FormData(form)) as any
  }


  return (
    <>
      <Wrapper>
        <Header title={title} />
        <Main>

          <Dialog open={phase === 'creating-account'}>
            <div>creating account</div>
          </Dialog>

          <Dialog open={phase === 'logging-in'}>
            <div>logging in</div>
          </Dialog>

          <Dialog open={phase === 'request-password-reset'}>
            <div>password reset</div>
          </Dialog>
          
          {phase === 'logged-in' && children}
          {phase === 'loading' && <div>Loading</div>}
          
        </Main>
        <Footer active={active} />
      </Wrapper>
    </>
  );
};

export default Shell;

/* <div style={{ padding: "2rem" }}>
            {userPhase === "loading" && <div>Loading...</div>}

            {alert && <div>{alert}</div>}

            {userPhase === 'logged-in' && <div><button onClick={signOut}>SIGN OUT</button>{JSON.stringify(user, null, 2)}</div>}

            {userPhase === "logged-out" && (
              <div>
                <div>SIGN IN</div>
                <form
                  onSubmit={async (event) => {
                    const { email, password } = dataFromSubmit(event)
                    const error = await signIn({ email, password })
                    if (error) setAlert(error)
                  }}
                >
                  <input name="email" placeholder="email"></input>
                  <input name="password" type="password" placeholder="password"></input>
                  <button type="submit">GO</button>
                </form>

                <div>CREATE ACCOUNT</div>
                <form
                  onSubmit={async (event) => {
                    const { email, password } = dataFromSubmit(event)
                    const error = await signUp({ email, password })
                    if (error) setAlert(error)

                    setModal(true)
                  }}
                >
                  <input name="email" placeholder="email"></input>
                  <input name="password" type="password" placeholder="password"></input>
                  <button type="submit">GO</button>
                </form>
              </div>
            )}
          </div> */