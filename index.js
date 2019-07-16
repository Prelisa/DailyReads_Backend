const fs= require('fs');

const textin=fs.readFileSync('./starter/txt/input.txt','utf-8');
console.log(textin);

const textout= `THis is what we know about the avocado ${textin}.\n Created in ${Date.now()}`;
fs.writeFileSync('./starter/txt/output.txt',textout);
console.log('file written');
