import { SETLOGININFO } from "../actions";

interface State {
  loginInfo: {
    account: string;
    token: string;
  };
}

const state: State = {
  loginInfo: {
    account: "",
    token: localStorage.getItem("token")!,
  },
};

const getters = {
  loginInfo(state: State, getters: any, rootState: any) {
    return state.loginInfo;
  },
};

const actions = {
  login(
    { state, commit }: any,
    payload: { type: string; data: typeof state.loginInfo }
  ) {
    commit(SETLOGININFO, payload.data);
  },
};

const mutations = {
  setLoginInfo(state: State, data: typeof state.loginInfo) {
    state.loginInfo.account = data.account;
    state.loginInfo.token = data.token;
    localStorage.setItem("token", data.token);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
