const express = require('express');
const app = express()
const fs = require('fs');
app.use(express.json());

var data = JSON.parse(fs.readFileSync('imdb.json'));

//1. getting the total data
app.get('/',(req,res)=>{
    res.send(data);
});

//2.for getting specific movie data

app.get('/:id',(req,res)=>{
    for(var i of data){
        if(req.params.id == i.position){
            res.send(i)
        }
    }
})

// 3.posting data into json file

app.post('/',(req,res)=>{
    var movie = req.body;
    data.push(movie);
    fs.writeFileSync('imdb.json',JSON.stringify(data,null,4));
    res.send("done!");
})



//delete method for deleting data

app.delete('/:id',(req,res)=>{
    for(var i of data){
        if(req.params.id == i.position){
            var removed = data.splice(i,1);
            res.send(data);
        }
    }
});



app.put('/:id',(req,res)=>{
    var id = req.params.id;
    var updating = req.body;
    for(var j in updating){
        var key = j;
        console.log(key);
        
        var Up = updating[j];
    }

    for(var i of data){
        if(id == i.position){
            delete key[i];
            key[i] = Up;
            data.push(i);
            fs.writeFileSync('imdb.json',JSON.stringify(data,null,4));
            res.send("successfully updated!");
        }
    }
})


app.listen(4000,()=>{
    console.log("Your port is working!");
})