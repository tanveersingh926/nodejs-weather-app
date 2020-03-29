const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const darkSkyUrl =
    "https://api.darksky.net/forecast/71ed50b9f93fc46e0b11db6617dc1c70/" +
    latitude +
    "," +
    longitude;

  request({ url: darkSkyUrl, json: true }, (error, { body }) => {
    if (error) {
      callback(error, undefined);
    } else if (body.error) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      const { temperature, precipProbability } = body.currently;

      callback(undefined, {
        temperature,
        precipProbability,
        summary: body.daily.data[0].summary
      });
    }
  });
};

module.exports = forecast;
