const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const app = express();

server = http.createServer(app);
const io = socketio(server);

var clients = [];

app.use(
    express.urlencoded({
        extended: true
    })
);

/**
 * Initialize Server
 */
server.listen(8888, function() {
    console.log("Servidor Rodando na Porta 8888");
});

/**
 * Página de Teste
 */
app.get("/", function(req, res) {
    res.send("Servidor Rodando...");
});

// Recebe requisição do Laravel
app.post("/check-in", function(req, res) {

    var params = req.body;

    let client = clients.find(client => client.id = params.medico_id)

    if(client) {
        io.sockets.connected[client.socket].emit('check_in', params)
    }

    res.send()

});

// Recebe conexão dos usuários no servidor
io.on("connection", function(client) {

    id = client.request._query['id']

    clients = clients.filter(client => client.id !== id)

    clients.push({
        id: id,
        socket: client.id
    })

    console.log('cliente conectado!')

})