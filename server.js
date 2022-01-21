const http = require('http');
const fs = require('fs');
const stringDecoder = require('string_decoder').StringDecoder;

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req,res) =>{

    readStatic('/index.html', function(data){

        let reqUrl = req.url;

        if(reqUrl === '/app.css'){
            readStatic('/app.css',function(data){
                res.setHeader('Content-Type','text/css');
                res.end(data);
            })
        }
        else if(reqUrl === '/img/mic1.jpg'){
            readStatic('/img/mic1.jpg',function(data){
                res.setHeader('Content-Type','image/jpg');
                res.end(data);
            })
        }
        else if(reqUrl === '/img/mic2.jpg'){
            readStatic('/img/mic2.jpg',function(data){
                res.setHeader('Content-Type','image/jpg');
                res.end(data);
            })
        }
        else if(reqUrl === '/img/mic3.jpg'){
            readStatic('/img/mic3.jpg',function(data){
                res.setHeader('Content-Type','image/jpg');
                res.end(data);
            })
        }
        else if(reqUrl === '/img/mic4.jpg'){
            readStatic('/img/mic4.jpg',function(data){
                res.setHeader('Content-Type','image/jpg');
                res.end(data);
            })
        }
        else if(reqUrl === '/img/mic5.png'){
            readStatic('/img/mic5.png',function(data){
                res.setHeader('Content-Type','image/png');
                res.end(data);
            })
        }
        else if(reqUrl === '/app.js'){
            readStatic('/app.js',function(data){
                res.setHeader('Content-Type','text/javascript');
                res.end(data);
            })
        }
        else if(reqUrl === '/'){
            let buffer = "";
            let decoder = new stringDecoder('utf-8');
            req.on('data',function(data){
                buffer += decoder.write(data);
            });
            req.on('end',function(){
                buffer += decoder.end();
                if(buffer.length > 0){
                    fs.open(__dirname+'/db/'+createRandomString(5)+'.json','wx',function(err,data){
                        fs.writeFile(data,buffer,function(){
                            fs.close(data,function(){
                                console.log('Data saved successfully');
                            })
                        })
                    })
                }
                res.end(data);
            })
        }




        else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        }
        
    
  
    })
  
})

/* server.listen(port,hostname, () =>{
    console.log('Server running on port:' + port);
}) */

server.listen(port,hostname,function(){
    console.log('Server running on port: ' + port);

})

// Helpers functions

let readStatic = function(filename,callback){
    fs.readFile(__dirname+filename, function(err,data){
        if(!err && data){
            callback(data);
        } else {
            callback(err);
        }
    })
}

let createRandomString = function(stringLength){
    stringLength = typeof(stringLength) == "number" && stringLength > 0 ? stringLength : false;
    if(stringLength){
        let possibleCharacters = "abcdefghilmnoprstuvzxwykj0123456789";

        let str = "";
        for(let i=1;i<=stringLength;i++){
            let randomCharacter = possibleCharacters.charAt(Math.floor(Math.random()*possibleCharacters.length));
            str+=randomCharacter
        } 
        return str;
    } else {
        return false;
    }
};

