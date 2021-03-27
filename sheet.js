import config from './config'
import request from "request-promise-native"

var date = new Date() ;
var a = date.getTime() ;
var b = Math.floor( a / 1000 ) ;

async function postData( data ) {
  var options = {
    url: config.sheetUrl,
    method: 'POST',
    form: data,
    followAllRedirects: true,
  }

  await request(options)
  .then(function (body) {
          console.log(body);
  })
  .catch(function (err) {
          console.log(err);
  });
}

export {postData}
