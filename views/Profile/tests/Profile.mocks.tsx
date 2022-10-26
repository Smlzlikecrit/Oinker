import faker from "@faker-js/faker";

import * as types from "../Profile.types";
// import { types } from "../../../components/Oink";
import { createMockOink } from "../../../schema/oink/tests/oink.mocks";
import {
  createMockProfile,
  PROFILE_IDS,
} from "../../../schema/profile/tests/profile.mocks";

const mockPromise = <T extends object>(response: T): Promise<T> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(response), 100);
  });

const USER_PROFILE_ID = faker.helpers.arrayElement(PROFILE_IDS);

const API: types.api = {
  getOinksAggregates: async () => {
    return mockPromise<{
        count:number;
    }>({ 
        count: faker.datatype.number(),
    })
},
    

  getOinks: async () =>
    mockPromise<types.oink.schema[]>(
      faker.datatype.array(50).map(() =>
        createMockOink({
          profilesIds: [USER_PROFILE_ID],
        })
      )
    ),

  getProfile: async () => {
    return mockPromise<types.profile.schema>(
      createMockProfile({
        id: USER_PROFILE_ID,
      })
    );
  },
};

export const MockContainer = (Props: { children: JSX.Element }) => {
  const { children } = props;
  const store = createStore(API);
  return <Provider value={store}>{children}</Provider>;
};
