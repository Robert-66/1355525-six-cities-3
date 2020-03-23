import {extend} from '../../utils';

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  email: ``,
};

const ActionType = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const ActionCreator = {
  auth: (authInfo) => {
    return {
      type: ActionType.AUTH,
      payload: authInfo,
    };
  },
  noAuth: () => {
    return {
      type: ActionType.NO_AUTH,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.AUTH:
      return extend(state, {authorizationStatus: AuthorizationStatus.AUTH, email: action.payload.email});
    case ActionType.NO_AUTH:
      return initialState;
  }

  return state;
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((res) => {
        dispatch(ActionCreator.auth(res.data));
      });
  },
  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.email,
      password: authData.password,
    })
      .then((res) => {
        dispatch(ActionCreator.auth(res.data));
      });
  },
};


export {
  ActionCreator,
  ActionType,
  AuthorizationStatus,
  Operation,
  reducer,
};
