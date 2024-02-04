const port = process.env.PORT || 80;
const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use("/static", express.static('static'));   //using static file for download
app.set('view engine', 'pug');  //setting pug as view engine
app.set('views', path.join(__dirname, 'views'));    //using folder views

app.get('/',(req,res)=>{
    res.status(200).render('index.pug')
})



const users = {};

io.on('connection', socket =>{
    socket.on( 'new-user-joined' , name => {
        console.log(name)
        users[socket.id] = name;
        socket.broadcast.emit("user-joined", name);
    })
    socket.on('send', message=>{
        socket.broadcast.emit("recieve", {message : message, name: users[socket.id]});
    })
    socket.on('disconnect', ()=>{
        socket.broadcast.emit("user-left", users[socket.id]);
        delete users[socket.id]
    })
})

server.listen(port,()=>{
    console.log(`http://localhost:${port}`)
});