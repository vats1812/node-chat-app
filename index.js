const app = require('express')()
const httpServer = require("http").createServer(app);
const io = require("socket.io", "socket.io-client")(httpServer, {
    origin: '*',
});
// const server = require('http').createServer(app)
//     // const io = require('socket.io')(server, {
//     //     cors: {
//     //         origin: '*',
//     //     }
//     // })
var port = process.env.PORT || 7000

const users = {};

io.on("connection", (socket) => {
    socket.on('new-user-joined', name => {
        // console.log("New User", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    });
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})

httpServer.listen(port, function() {
    console.log("i am listening at port 7000");
})