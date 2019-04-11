// app/services/apiService.js

import ApiEndpoint from "../classes/ApiEndpoint";
import { getToken } from "./authService";

const API_ADDRESS_PREFIX = "http://";
const API_ADDRESS = "10.149.2.118";
const API_ADDRESS_PORT = ":3000";
const API_ADDRESS_SUFFIX = "/api/v1";

const API_ROUTE_AUTHENTICATE = "/auth/authenticate";
const API_ROUTE_CREATE_USER_BUDGET = "/budgets/budget/";
const API_ROUTE_FORGOT_PASSWORD = "/users/changepassword";
const API_ROUTE_GET_USER_BUDGETS = "/budgets/user/";
const API_ROUTE_USERS = "/users/";
const API_ROUTE_USER_MAIL = "/users/changemail";
const API_ROUTE_UPDATE_PASSWORD = "/users/updatepassword";

function makeRoute(route) {
  return API_ADDRESS_PREFIX + API_ADDRESS + API_ADDRESS_PORT + API_ADDRESS_SUFFIX + route;
}

export const ENDPOINT_AUTHENTICATE = "authenticate";
export const ENDPOINT_CREATE_USER_BUDGET = "createUserBudget";
export const ENDPOINT_FORGOT_PASSWORD = "forgotPassword";
export const ENDPOINT_REGISTER = "register";
export const ENDPOINT_GET_USER_BUDGETS = "getUserBudgets";
export const ENDPOINT_GET_USER_INFO = "getUserInfo";
export const ENDPOINT_UPDATE_USER_INFO = "updateUserInfo";
export const ENDPOINT_UPDATE_USER_MAIL = "updateUserMail";
export const ENDPOINT_UPDATE_PASSWORD = "updatePassword";

let API_ENDPOINTS = {};

API_ENDPOINTS[ENDPOINT_AUTHENTICATE] = new ApiEndpoint(makeRoute(API_ROUTE_AUTHENTICATE), "POST", true, false);
API_ENDPOINTS[ENDPOINT_CREATE_USER_BUDGET] = new ApiEndpoint(makeRoute(API_ROUTE_CREATE_USER_BUDGET), "POST", true, true);
API_ENDPOINTS[ENDPOINT_FORGOT_PASSWORD] = new ApiEndpoint(makeRoute(API_ROUTE_FORGOT_PASSWORD), "POST", true, false);
API_ENDPOINTS[ENDPOINT_REGISTER] = new ApiEndpoint(makeRoute(API_ROUTE_USERS), "POST", true, false);
API_ENDPOINTS[ENDPOINT_GET_USER_BUDGETS] = new ApiEndpoint(makeRoute(API_ROUTE_GET_USER_BUDGETS), "GET", false, true);
API_ENDPOINTS[ENDPOINT_GET_USER_INFO] = new ApiEndpoint(makeRoute(API_ROUTE_USERS), "GET", false, true);
API_ENDPOINTS[ENDPOINT_UPDATE_USER_INFO] = new ApiEndpoint(makeRoute(API_ROUTE_USERS), "PUT", true, true);
API_ENDPOINTS[ENDPOINT_UPDATE_USER_MAIL] = new ApiEndpoint(makeRoute(API_ROUTE_USER_MAIL), "PUT", true, true);
API_ENDPOINTS[ENDPOINT_UPDATE_PASSWORD] = new ApiEndpoint(makeRoute(API_ROUTE_UPDATE_PASSWORD), "POST", true, true);

function makeRequest(requestParameters) {
  return fetch(requestParameters.url, {
    method: requestParameters.method,
    headers: requestParameters.headers,
    body: requestParameters.body
  }).then((response) => response.json());
}

export async function makeAPIRequest(apiEndpoint: string, body = null) {
  const selectedEndpoint: ApiEndpoint = API_ENDPOINTS[apiEndpoint];
  let userToken = null;
  let headers = {
    "Content-Type": "application/json"
  };

  if (selectedEndpoint.hasBody && body === null) {
    console.log("error: missing body");
  }

  if (selectedEndpoint.hasToken) {
    userToken = await getToken();

    headers["token"] = userToken;
  }

  const requestParameters = {
    url: selectedEndpoint.route,
    method: selectedEndpoint.method,
    headers: headers
  };

  if (body) {
    if (selectedEndpoint.hasBody === false) {
      console.error("error: request does not need body");
    } else {
      requestParameters["body"] = body;
    }
  }

  console.debug(requestParameters);

  return makeRequest(requestParameters);
}
