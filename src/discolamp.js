const GPIO = require('onoff').Gpio;

const gpio = new GPIO(20, 'out');
gpio.writeSync(0);

module.exports.on = () => {
  console.log("Lamp is on!");
  gpio.writeSync(1);
};

module.exports.off = () => {
  console.log("Lamp is off!");
  gpio.writeSync(0);
};

