import http from 'node:http';
import { routes } from './middlewares/routes.js';

import { json } from './middlewares/json.js';
import { extractQueryParams } from './utils/extract-query-params.js';

const server = http.createServer((async (req, res) => {
    const { url, method } = req;

    await json(req, res);

    const route = routes.find((route) => {
        return route.method === method && route.path.test(url);
    });

    if (route) {
        const routeParams = req.url.match(route.path);

        // console.log(extractQueryParams(routeParams.groups.query));

        const { query, ...params } = routeParams.groups;

        req.query = params;

        req.query = query ? extractQueryParams(query) : {};

        // req.params = { ...routeParams.groups };

        return route.handler(req, res);
    } 
   
    return res.writeHead(404).end('Oh Oh! Not Found!!');
}))

server.listen(3333);