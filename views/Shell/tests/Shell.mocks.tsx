import { createStore, Provider } from "../Shell.store";
import { types as userTypes } from "../../../environments/api/user";
import { API } from "../../../environments/api/user/tests";

export const MockContainer = (props: {
  children: JSX.Element;
  transformApi?: (api: userTypes.api) => userTypes.api;
}) => {
  const { children, transformApi } = props;
  const store = createStore(transformApi ? transformApi(API): API);
  return <Provider value={store}>{children}</Provider>;
};
