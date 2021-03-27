import request from "request-promise-native"

var date = new Date() ;
var a = date.getTime() ;
var b = Math.floor( a / 1000 ) ;

var periods = 60;
var after = b - 300;
var before = b;



var options = {
  url: `https://api.cryptowat.ch/markets/bitflyer/btcjpy/ohlc?periods=${periods}&after=${after}&before=${before}`,
}

async function getRate() {
  var rate = null;
  await request(options)
  .then(function (body) {
          const r = JSON.parse(body).result['60'][0][1];
          console.log(r);
          rate = r;
  })
  .catch(function (err) {
          console.log(err);
  });
  return rate;
}

export {getRate}
