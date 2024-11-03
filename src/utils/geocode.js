const request = require("request");
const geocode = (address, callback) => {
  // encodeURIComponent(address)
  const url = `https://api.positionstack.com/v1/forward?access_key=8de56964e17cc07e204056b62bc2250d&query=${address}&limit=1`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (response.body.error) {
      callback("Unable to load data", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.data[0].latitude,
        longitude: response.body.data[0].longitude,
        location: response.body.data[0].region,
        country: response.body.data[0].country,
      });
    }
  });
};

module.exports = geocode;
