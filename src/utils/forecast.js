const request = require("request");

const forecast = (lat, lon, callback) => {
  const url = `https://api.weatherstack.com/current?access_key=cfae95b86ebd388cd8614fe96d24ab4c&query=${lat},${lon}&units=m`;
  // const url = `https://api.weatherstack.com/current?access_key=cfae95b86ebd388cd8614fe96d24ab4c&query=42,-71&units=m`;
  request({ url: url, json: true }, (error, response) => {
    const weatherData = response.body.current;
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${weatherData.weather_descriptions[0]} It is currently ${weatherData.temperature}°C degress out. It feels like ${weatherData.feelslike}°C degress out.`
      );
    }
  });
};

module.exports = forecast;
