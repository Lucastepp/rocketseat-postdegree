// /users/:id is a route path that should be converted to /users/{id} for the OpenAPI documentation.

export function buildRoutePath(path) {
    const routeParametersRegex = /:([a-zA-Z]+)/g;
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)');

    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);

    return pathRegex;

    //console.log(Array.from(path.matchAll(routeParametersRegex)));
}