import { useContext } from "react";
import styled from "@emotion/styled";

import { useStore } from "zustand";
import { context } from "./Feed.store";
import { Oink, Placeholder } from "../../components/Oink";
import { Shell } from "../_Shell";

const List = styled.ul`
  margin: 2rem 1rem 4rem 1rem;
  padding: 0;
  list-style: none;
`;

const Item = styled.li`
  margin: 0.5rem 0;
`;

const PlaceholderList = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((id) => {
        return (
          <Item key={id}>
            <Placeholder />
          </Item>
        );
      })}
    </>
  );
};

export const Content = () => {
  const store = useContext(context);

  const feed = useStore(store, (state) => state.feed);
  const phase = useStore(store, (state) => state.phase);
  const profiles = useStore(store, (state) => state.profiles);

  if (phase === "loading") {
    return <PlaceholderList />;
  }

  if (!feed) {
    throw new Error('"feed" expected when not "loading"');
  }
  if (!profiles) {
    throw new Error('"profiles" expected when not "loading"');
  }

  return (
    <>
      {feed.map(({ key, text, profileId, createdDate, image }) => {
        const profile = profiles.find(({ key }) => key === profileId);
        if (!profile) throw new Error("Profile does not exist");

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

      <PlaceholderList />
    </>
  );
};
export const Feed = () => {
  return (
    <Shell active="feed" title="Home">
      <List>
        <Content />
      </List>
    </Shell>
  );
};

export default Feed;
