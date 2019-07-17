const fs= require('fs');


//BLOCKING,SYNCHRONOUS

const textin=fs.readFileSync('./starter/txt/input.txt','utf-8');
console.log(textin);

const textout= `THis is what we know about the avocado ${textin}.\n Created in ${Date.now()}`;
fs.writeFileSync('./starter/txt/output.txt',textout);
console.log('file written');


//NOn blocking asynchronous

fs.readFile('./starter/txt/start.txt','utf-8',(err,data1)=>{
    fs.readFile(`./starter/txt/${data1}`,'utf-8',(err,data2)=>{
        console.log(data2);
    });

});
console.log("read this");