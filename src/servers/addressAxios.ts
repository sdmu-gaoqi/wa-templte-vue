import createAxios from "./axios";

const appKey = "cd0a8016f70d36c1a686d9af7042db97";

const axios = createAxios("https://restapi.amap.com/");

export const getAddressRequest = () => {
  return axios.get("/v3/config/district", {
    params: {
      key: appKey,
      subdistrict: 3,
    },
  });
};
