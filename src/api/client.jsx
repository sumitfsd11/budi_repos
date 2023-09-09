import axios from "axios";
import qs from 'qs';
import {
  getLocalStorage,
  isPublicApi,
  stringifyError
} from 'utils/common.utils'
import { AUTH_TOKEN } from "constants/localstorage.constants";
import { baseURL } from "constants/config.constants";
const axiosConfig = {
  baseURL,
};
export const METHODS = {
  GET: "get",
  DELETE: "delete",
  HEAD: "head",
  OPTIONS: "options",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
};

function createAxiosInstance() {
  return axios.create(axiosConfig);
}

const request = createAxiosInstance();
const cache = {};

const client = ({
  method = METHODS.POST,
  url = baseURL,
  data,
  useCache = false,
  invalidateQuery = false,
  ...rest
}) =>
  useCache && !invalidateQuery && cache[url]
    ? Promise.resolve(cache[url])
    : request({
      method,
      url,
      data,
      // eslint-disable-next-line no-undef
      paramsSerializer,
      ...rest,
    }).then((res) => {
      if (useCache) cache[url] = res.data;
      return res.data;
    });

export const clientWithHeaders = ({
  method = METHODS.POST,
  url = baseURL,
  data,
  useCache = false,
  invalidateQuery = false,
  ...rest
}) =>
  request({
    method,
    url,
    data,
    // eslint-disable-next-line no-undef
    paramsSerializer,
    ...rest,
  }).then((res) => {
    return res;
  });

request.interceptors.request.use(
  (req) => {
    req.headers.Accept = "application/json";
    if (isPublicApi(req.url) || req.isPublic) {

      delete req.headers.Authorization;
    }
    if (
      !req.headers.Authorization && getLocalStorage(
        AUTH_TOKEN,
        null
      )
    ) {
      req.headers["Accept"] = "application/json";
      req.headers.Authorization = `Bearer ${getLocalStorage(
        AUTH_TOKEN,
        null
      )}`;

    }
    return req;
  },
  (error) => { }
);
request.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    const originalRequest = err.config;
    const status = err.response?.status;
    if (status === 401) {
      const error = {
        originalRequest,
        status,
        // message:err?.message
        message: 'Invalid  credentails  '
        ,
      };
      localStorage.clear();
      // window.location.href='/';
      throw error;
    }
    if (status === 503) {
      const error = {
        originalRequest,
        status,
        message:
          "This service is unavailable right now, please try again later",
      };
      throw error;
    }
    if (status === 500) {
      const error = {
        originalRequest,
        status,
        message: "An unexpected error occurred, please try again later",
      };
      throw error;
    }
    if (status === 404) {
      const error = {
        originalRequest,
        status,
        message: "The requested content does not exist, please try again later",
      };
      throw error;
    }

    const response = err.response?.data;
    const message = response ? stringifyError(response) : err.message;

    const error = { originalRequest, message, status };
    throw error;
  }
);
export function setHeaderToken(token) {
  if (token) request.defaults.headers.Authorization = `Bearer ${token}`;
  else delete request.defaults.headers.Authorization;
}

function paramsSerializer(params) {
  return qs.stringify(params, { arrayFormat: "repeat" });
}

export default client;



