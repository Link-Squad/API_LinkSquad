module.exports.normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

module.exports.generateRandomToken = () => {
  const characters =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let token = '';
  for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }
  return token;
};

module.exports.returnRandomSubArray = (array, amount) => {
  const randElements = [];
  const maxIndex = amount >= array.length ? array.length : amount;
  for (let i = 0; i < maxIndex; i++) {
    const randIndex = Math.floor(Math.random() * array.length);
    const randElement = array[randIndex];
    randElements.push(randElement);
  }
  randElements.filter((el, i) => randElements.indexOf(el) === i);
  return randElements;
};

module.exports.returnRandomElement = (array) => {
  const randIndex = Math.floor(Math.random() * array.length);
  const randElement = array[randIndex];

  return randElement;
};

module.exports.returnRandomNumer = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};
