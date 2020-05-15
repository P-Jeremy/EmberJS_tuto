/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

const Hapi = require('@hapi/hapi');
const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
          cors: true
      }
    });

    server.route({
      method: 'GET',
      path: `/api/rentals/{id?}`,
      handler: (_request, _h) => {
        const id = _request.params.id
        const url = id ? `../public/api/rentals/${id}.json` : '../public/api/rentals.json';
        const rental = require(url)
        return rental;
      }
  });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();