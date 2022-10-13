import * as types from "../user.types";


const mockPromise = <T extends object>(response: T): Promise<T> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(response), 2000);
  });


export const API: types.api = {
    getUser: () => Promise.resolve({
        email: "john@smith.com",
        id: '2g2yugtf287gvf2hfh2f982hfj2nm9gf2hg39g8h2',
        token: 'fu12hnfr29ugh98hfgsdiohf23892hg',
    }),
    signIn: () => Promise.resolve({
      status: 'success',
      user: {
        email: "john@smith.com",
        id: '2g2yugtf287gvf2hfh2f982hfj2nm9gf2hg39g8h2',
        token: 'fu12hnfr29ugh98hfgsdiohf23892hg',
      }
    }),
    signUp: () => Promise.resolve({
      status: 'success',
      error: null,
    }),
    signOut: () => Promise.resolve(),
    resetPassword: () => Promise.resolve(),
};
