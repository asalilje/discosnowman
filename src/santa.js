const GPIO = require('onoff').Gpio;

const gpio = new GPIO(21, 'out');
gpio.writeSync(0);

module.exports.dance = () => {
  gpio.writeSync(0);
  console.log("Santa is dancing!");
  gpio.writeSync(1);
};



