module.exports = (req,res) => {
    let id = req.url.split('/')[3];
    if(req.url === "/api/movies"){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(req.movies));
        res.end();
    }else if(req.url === `/api/movies/${id}`){
        const movie = req.movies.filter((movie)=>{
            return movie.id === id;
        });
        if(movie.length > 0){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(movie));
            res.end();
        }else{
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify({title: "NOT FOUND",message: "Movie not found"}));
            res.end();
        } 
    }
    else{
        res.writeHead(404,'Content-Type', 'application/json');
        res.end(JSON.stringify({title: "NOT FOUND",message: "Route not found"}));
    }
}