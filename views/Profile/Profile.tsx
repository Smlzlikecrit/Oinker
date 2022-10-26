import styled from "@emotion/styled";
import { useContext } from "react";
import { useStore } from "zustand";
import { Typography } from "@mui/material";

import { Oink, Placeholder } from "../../components/Oink";
import { Shell } from "../_Shell";
import { context } from "./Profile.store";

const CoverImage = styled.img`
  height: 10rem;
  object-fit: cover;
  width: 100%;
`;

const Header = styled.div`
  position: relative;
`;

const ProfileImage = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  left: 2rem;
  bottom: -2.5rem;
  border: 2px solid white;
  z-index: 10;
`;
const Name = styled(Typography)`
  font-size: 1.25rem;
  font-weight: bold;
`;

const Bio = styled(Typography)`
  font-size: 0.9rem;
  opacity: 0.75;
`;

const Content = styled.div`
  padding: 4rem 2rem 0.5rem;
`;

const Info = styled.div`
  background: white;
`;

const List = styled.ul`
  margin: 2rem 1rem 4rem 1rem;
  padding: 0;
  list-style: none;
`;

const Item = styled.li`
  margin: 0.5rem 0;
`;

const Totals = styled.dl`
    display: flex;
    width: 100%;
    padding: 2rem;
    margin: 0;
    justify-content: space-between;
`

const Pair = styled.div`
    display: flex;
    font-size: 0.9rem;
    flex-direction: row-reverse;
`
const Value = styled.dt`
    padding: 0;
    margin: 0 0.25rem;
    font-weight: bold;
`
const Label = styled.dd`
    opacity: 0.75;
    margin: 0;
`

export const Profile = () => {
  const store = useContext(context);
  const phase = useStore(store, (state) => state.phase);
  const oinks = useStore(store, (state) => state.oinks);
  const profile = useStore(store, (state) => state.profile);
  const count = useStore(store, (state) => state.count);
  if (phase === "loading")
    return (
      <Shell active="profile" title="Profile">
        <div>Loading...</div>
      </Shell>
    );

  if (!oinks) {
    throw new Error('"oinks" expected when not "loading"');
  }

  if (!profile) {
    throw new Error('"profile" expected when not "loading"');
  }

  const followingCount = profile.followerIds.length;
  const followersCount = profile.followingIds.length;

  return (
    <Shell active="profile" title="Profile">
      <>
        <Info>
          <Header>
            <CoverImage src={profile.coverImg || "#"} />
            <ProfileImage src={profile.profileImg || "#"} />
          </Header>

          <Content>
            <Name>{profile.displayName}</Name>
            <Bio>{profile.bio}</Bio>
          </Content>

          <Totals>
            <Pair>
              <Label>Oinks</Label>
              <Value>{count}</Value>
            </Pair>
            <Pair>
              <Label>Following</Label>
              <Value>{followingCount}</Value>
            </Pair>
            <Pair>
              <Label>Followers</Label>
              <Value>{followersCount}</Value>
            </Pair>
          </Totals>
        </Info>
        <List>
          {oinks.map(({ key, text, createdDate, image }) => {
            return (
              <Item key={key}>
                <Oink
                  date={createdDate}
                  text={text}
                  name={profile.displayName || ""}
                  imageUrl={profile.profileImg}
                  embedImage={image}
                />
              </Item>
            );
          })}
        </List>
      </>
    </Shell>
  );
};

export default Profile;
