const request = require("request");
const geocode = (address, callback) => {
  const mapBoxUrl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoidGFudmVlcnMiLCJhIjoiY2s4YnN5c25xMGNleTNkbzU4NWlkaDJjdSJ9.lpvY3rA_85Ab1iitFfxRJw&limit=1";
  request({ url: mapBoxUrl, json: true }, (error, { body: { features } }) => {
    if (error) {
      callback(error, undefined);
    } else if (features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      const {
        place_name: location,
        center: [longitude, latitude]
      } = features[0];
      callback(undefined, { latitude, longitude, location });
    }
  });
};

module.exports = geocode;
