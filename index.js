(async function(){
  require = require("esm")(module/*, options*/);
  const { getRigInfo } = require("./hashpower");
  const { getRate } = require("./cryptwatch");
  const { postData } = require("./sheet");

  const rigInfo = await getRigInfo();
  const rate = await getRate();
  //const rigInfo = {
  //  balance: 0.002,
  //  speed: 66,
  //};
  //const rate = 5555555;

  const jpy = rigInfo.balance * rate;

  const elec = process.argv[2] || 150;

  console.log(rigInfo.balance);
  console.log(rigInfo.speed);
  console.log(rate);
  console.log(jpy);

  await postData({
    speed: rigInfo.speed,
    btc: rigInfo.balance,
    jpy: jpy,
    elec: elec,
  })
})();
