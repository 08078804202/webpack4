const dev = require('./webpack/webpack.dev.js');
const prod = require('./webpack/webpack.prod.js');

let TARGET = process.env.npm_lifecycle_event;
console.log("TARGET",TARGET)
TARGET='dev'
// TARGET='prod'

if(TARGET === 'dev') {
  module.exports = dev
}
if(TARGET === 'prod') {
  module.exports = prod
}