const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const address = process.argv[2];

if (address) {
  geocode(address, (error, { latitude, longitude }) => {
    if (error) {
      console.log(error);
      return;
    }

    forecast(
      latitude,
      longitude,
      (error, { temperature, precipProbability, summary }) => {
        if (error) {
          console.log(error);
          return;
        }

        console.log(
          `${summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain`
        );
      }
    );
  });
} else {
  console.log("Please provide the address");
}
