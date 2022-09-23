import { createStore, Provider } from "../Feed.store";
import { faker } from "@faker-js/faker";
import * as types from "../Feed.types";
import { createMockOink } from "../../../schema/oink/tests/oink.mocks";
import { createMockProfile, PROFILE_IDS } from "../../../schema/profile/tests/profile.mocks";

const mockPromise = <T extends object>(response: T): Promise<T> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(response), 2000);
  });

const profilesIds = PROFILE_IDS.slice(0, 50)

const API: types.api = {
  getOinks: async () =>
    mockPromise<types.oink.schema[]>(
      faker.datatype.array(300).map(() => createMockOink({
        profileIds: profilesIds,
      }))
    ),
    
    getProfiles: async () => mockPromise<types.profile.schema[]>(
        profilesIds.map((id) => createMockProfile({ id }))
    )
};

export const MockContainer = (props: { children: JSX.Element }) => {
  const { children } = props;
  const store = createStore(API);
  return <Provider value={store}>{children}</Provider>;
};
