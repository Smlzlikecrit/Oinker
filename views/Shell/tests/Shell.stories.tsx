import { Shell } from "../Shell";
import { MockContainer } from "./Shell.mocks";

export default {
  title: "views/Shell",
};

export const Loading = () => (
  <MockContainer transformApi={api => ({...api, getUser: () => new Promise(() => {})})}>
    <Shell active="feed" title="Test">
      <div>You have access to the app</div>
    </Shell>
  </MockContainer>
);

export const LoggedIn = () => (
  <MockContainer>
    <Shell active="feed" title="Test">
      <div>You have access to the app</div>
    </Shell>
  </MockContainer>
);

export const LoggedOut = () => (
  <MockContainer transformApi={api => ({...api, getUser: () => Promise.resolve(null) })}>
    <Shell active="feed" title="Test">
      <div>123</div>
    </Shell>
  </MockContainer>
);
