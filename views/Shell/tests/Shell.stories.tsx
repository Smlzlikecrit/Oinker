import { Shell } from "../Shell";
import { MockContainer } from "./Shell.mocks";

export default {
  title: "views/Shell",
};

export const LoggedIn = () => (
  <MockContainer>
    <Shell active="feed" title="Test">
      <div>123</div>
    </Shell>
  </MockContainer>
);

export const LoggedOut = () => (
  <MockContainer transformApi={api => ({...api, getUser: () => null })}>
    <Shell active="feed" title="Test">
      <div>123</div>
    </Shell>
  </MockContainer>
);
