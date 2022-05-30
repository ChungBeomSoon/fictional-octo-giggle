const express = require('express');
const mongoose = require('mongoose');
const server = express();
const User = require('./models/User');
const bodyParser = require('body-parser');

server.use(bodyParser.json());


//get to-do list all
server.get('/user', (req,res, next)=>{
        User.find({})
            .then(data => {
                if(!data) return res.status(404).json({message: "not found!"});
                console.log("Users in Database Courses:")
                //  console.log(data);
                res.status(200).json(data);
                data.map((d,k)=>{
                    db.push(d._id);
                });
            })
            .catch(error => {
                 res.status(500).json({
                     message: err
                 })
            });
            console.log(req.params.id);
    
        
})


//post what to do
server.post('/user', (req,res)=>{
    const newUser = new User();
    newUser.contents = req.body.contents;
    newUser.date = req.body.date;
    newUser.important = req.body.important;
    newUser.success = req.body.success;

    newUser.save()
        .then((user)=>{
            console.log(user);
            res.json({
                message: 'successfully posted!'
            })
        })
        .catch((err)=>{
            console.log(err);
            res.json({
                message: 'posting failed'
            })
        })

})

//modify to-do list
server.put('/user/:id', async (req, res)=>{
    const id = req.params.id;
    const { contents, date } = req.body;

    try{
        var post = await User.findById(id);
        if (!post) return res.status(404).json({ message: "not found!"});
        post.contents = contents;
        post.date = date;
        var output = await post.save();
        console.log('update complete');
        res.status(200).json({
            message: "update success",
            data: output,
        });
    }catch(err){
        res.status(500).json({
            message: err
        })
    }

})

//delete list one-by-one || success one of the list.
server.delete('/user/:id', (req, res) => {
    const id = req.params.id;

    User
        .deleteOne({_id:id})
        .then(output => {
            if(output.n == 0){
                return res.status(404).json({message: "not found!"});
            }
            console.log("delete succsess");
            res.status(200).json({
                message: "delete success"
            });
        }

            )
            .catch(err => {
                res.status(500).json({
                    message: err
                });
            })
        })

        //get to-do detail
        server.get('/user/:id', (req,res)=>{
            const id = req.params.id;

            User.find({_id : id})
            .then(output=> {
                if(output == null){
                    return res.status(404).json({message: "not found!"});
                }else{
                console.log(output);
                res.json(output);
                }
            })
            .catch(err=>{
                res.status(500).json({
                    message: err
                });
            })
        
            
    })
    
    




    // console.log(db);
    // newUser.save()
    // .then((user)=>{
    //     console.log(user);
    //     res.json({
    //         message: 'successfully changed!'
    //     })
    // })
    // .catch((err)=>{
    //     console.log(err);
    //     res.json({
    //         message: 'change failed'
    //     })
    // })



server.listen(27017, (err)=> {
    if(err){
        return console.log(err);
    }else{
        mongoose.connect('mongodb://localhost:27017', 
        {
        useNewUrlParser:true,
        useUnifiedTopology: true,
        },
        (err)=>{
            if(err){
                console.error('error', err);
            }
            console.log('mongo connected');
        });

    }    

})    

var db = [];
    User.find({})
        .then(data => {
            console.log("Users in Database Courses:");
            //  console.log(data);
             data.map((d,k)=>{
                db.push(d);
               });
        })
        .catch(error => {
             console.log(error);
        })