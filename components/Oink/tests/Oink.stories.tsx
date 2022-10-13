import { Oink } from "../Oink";
import { createMockOink } from "../../../schema/oink/tests/oink.mocks";
import { createMockProfile } from "../../../schema/profile/tests/profile.mocks";

export default {
  title: "components/Oink",
};
const oink = createMockOink();
const profile = createMockProfile();

const BASE_PROPS = {
  date: oink.createdDate,
  embedImage: oink.image,
  imageUrl: profile.profileImg,
  name: profile.displayName,
  text: oink.text,
};

export const Default = () => <Oink {...BASE_PROPS} />;
export const NoImage = () => <Oink {...BASE_PROPS} embedImage={null} />;
export const ShortText = () => <Oink {...BASE_PROPS} text="1" />;
export const LongText = () => (
  <Oink
    {...BASE_PROPS}
    text="The prime minister of New Zealand is the country's head of government and the leader of the Cabinet, whose powers and responsibilities are defined by convention. Officially, the prime minister is appointed by the governor-general, but by convention, the prime minister must have the confidence of the House of Representatives. Originally, prime ministers headed loose coalitions of independents, which were often unstable; since the advent of political parties, the prime minister is usually the leader of the largest political party in the House. Some historians regard James FitzGerald as New Zealand's first prime minister, "
  />
);
export const ShortUserName = () => <Oink {...BASE_PROPS} name="R" />;
export const LongUserName = () => (
  <Oink
    {...BASE_PROPS}
    name="The Incredible, Phenominal, Mr.User Himself, the Very Best"
  />
);
export const FarBack = () => (
  <Oink {...BASE_PROPS} date={new Date("1970-01-01")} />
);
