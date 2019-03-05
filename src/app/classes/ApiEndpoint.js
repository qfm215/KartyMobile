// app/classes/apiEndpoint

// @flow
export default class ApiEndpoint {
  route: string;
  method: string;
  hasBody: boolean;
  hasToken: boolean;

  constructor(route: string, method: string, hasBody: boolean, hasToken: boolean) {
    this.route = route;
    this.method = method;
    this.hasBody = hasBody;
    this.hasToken = hasToken;
  }
}