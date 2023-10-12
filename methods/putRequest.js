const bodyParser = require('../utils/bodyParser');
const WriteToFile = require('../utils/writeToFile');

module.exports = async(req,res) => {
    try{

        let id = req.url.split('/')[3];

        if(req.url === `/api/movies/${id}`){
            const index = req.movies.findIndex(m => m.id === id);
            if(index == -1){
                res.writeHead(404, { 'Content-Type': 'application/json'});
                res.end(JSON.stringify({"message":"Movie Not Found"}));
            }
            else{
                let body = await bodyParser(req);
                req.movies[index] = {id, ...body};
                WriteToFile(req.movies);
                res.writeHead(201, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({'message':"updated", 'data':body}));
            }
        }
       

    }catch(err){
        console.log(err.message)
    }
}