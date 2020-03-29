const request = require("request");

const darkSkyUrl =
  "https://api.darksky.net/forecast/71ed50b9f93fc46e0b11db6617dc1c70/37.8267,-122.4233";
const mapBoxUrl =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoidGFudmVlcnMiLCJhIjoiY2s4YnN5c25xMGNleTNkbzU4NWlkaDJjdSJ9.lpvY3rA_85Ab1iitFfxRJw&limit=1";

request({ url: darkSkyUrl, json: true }, (error, response) => {
  const hasError = resolveError(error, response.body.error);
  if (!hasError) {
    const { temperature, precipProbability } = response.body.currently;
    console.log(
      `${response.body.daily.data[0].summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain`
    );
  }
});

request({ url: mapBoxUrl, json: true }, (error, response) => {
  const hasError = resolveError(error, response.body.features.length == 0);
  if (!hasError) {
    const [latitude, longitude] = response.body.features[0].center;
    console.log(latitude, longitude);
  }
});

const resolveError = (error, responseError) => {
  let hasError = false;
  if (error) {
    console.log("Could not reach to the server site");
    hasError = true;
    return hasError;
  }
  if (responseError) {
    console.log("Unable to find details");
    hasError = true;
    return hasError;
  }
  return hasError;
};
