const request = require('postman-request');

const getCurrentWeather = (address, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=405a4c8869ae6ba1797ce8ea2a18c7cc&query=' + encodeURIComponent(address) + '&units=m';
  
  request({ url, json: true }, (error, response, body) => {
    const { current } = body;

      if (current) {
        callback(undefined, current);
      } else {
        callback('Unable to connect!', undefined);
      }
  });
};

module.exports = { getCurrentWeather };
