//Ndoe server handle socket io connections
const io=require('socket.io')(8000)

const users={};

io.on('connection', socket =>{
    socket.on('new-user-joined', abc =>{
        console.log("New user", abc)
        users[socket.id] =abc;
        socket.broadcast.emit('user-joined', abc);
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, abc: users[socket.id]})
    });

    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id];
    });
})