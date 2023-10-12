const WriteToFile = require('../utils/writeToFile');

module.exports = (req,res) => {

    let id = req.url.split('/')[3];

    if(req.url === `/api/movies/${id}`){

      const index = req.movies.findIndex(m => m.id === id);
      if(index == -1){
        res.writeHead(404, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify({"message":"Movie Not Found"}));
      }
      else{
        req.movies.splice(index, 1);
        WriteToFile(req.movies); 
        res.writeHead(200, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify({"message":"Data deleted!"}));
      }
    }
    else{
        res.writeHead(404, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify({"message":"Not Found"}));
    }
}