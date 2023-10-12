const crypto = require('crypto');
const bodyParser = require('../utils/bodyParser');
const WriteToFile = require('../utils/writeToFile');

module.exports = async(req,res) => {
    if(req.url === '/api/movies'){
        try{
            let body = await bodyParser(req);
            body.id = crypto.randomUUID();
            req.movies.push(body);
            WriteToFile(req.movies);
            res.writeHead(201, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({'message':"created", 'data':body}));
        }catch(err){
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({'message':'Something went wrong'}));
        }
    }
    else{
        res.writeHead(404, {'Content-type':'application/json'});
        res.end(JSON.stringify({'message':'Not Found'}));
    }
}