var calc2 = require('./calc2');

console.log('모듈로 분리한 후 - calc2.add : ' + calc2.add(30, 30));

//npm init
//npm install nconf
//package.json 파일 내용 확인
var nconf = require('nconf');
nconf.env();
var value = nconf.get('OS');
console.log('OS 환경벼수의 값 : ' + value);