import { useContext } from "react";
import styled from "@emotion/styled";

import { useStore } from "zustand";
import { context } from "./Feed.store";
import { Oink, Placeholder } from "./Feed.Oink";
import { Shell } from "../Shell";

const List = styled.ul`
  margin: 4rem 2rem;
  padding: 0;
  list-style: none;
`;

const Item = styled.li`
  margin: 0.5rem 0;
`;

export const Content = () => {
  const store = useContext(context);
  const feed = useStore(store, (state) => state.feed);
  const phase = useStore(store, (state) => state.phase);
  const profiles = useStore(store, (state) => state.profiles);

  if (phase === "loading") {
    return (
      <>
        <Item>
          <Placeholder />
        </Item>
        <Item>
          <Placeholder />
        </Item>
        <Item>
          <Placeholder />
        </Item>
        <Item>
          <Placeholder />
        </Item>
        <Item>
          <Placeholder />
        </Item>
        <Item>
          <Placeholder />
        </Item>
      </>
    );
  }

  if (!feed) throw new Error('"feed" expected when not "loading"');
  if (!profiles) throw new Error('"profiles" expected when not "loading"');

  return (
    <>
      {feed.map(({ key, text, profileId }) => {
        const profile = profiles.find(({ key }) => profileId);
        if (!profile) throw new Error("Profile does not exist");

        return (
          <Item key={key}>
            <Oink
              text={text}
              name={profile.displayName || ""}
              imageUrl="https://picsum.photos/200/300"
            />
          </Item>
        );
      })}
    </>
  );
};
export const Feed = () => {
  return (
    <Shell active="feed">
      <List>
        <Content />
      </List>
    </Shell>
  );
};

export default Feed;
