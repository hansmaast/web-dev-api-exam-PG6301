/**
 * Implementing chat from this code:
 * https://github.com/arcuri82/web_development_and_api_design/blob/1fca518cd9d8da65bf6c38bbab5ce1a654ff0e90/les09/chat/websocket-rest/src/server/app.js
 */

let {messages, counter} = require('../db/messages');
const {expressWs, WS} = require('../app');


exports.getMessages = (req, res) => {

    const since = req.query["since"];

    const data = messages;

    if (since) {
        res.json(data.filter(m => m.id > since));
    } else {
        res.json(data);
    }
};

exports.postMessage = (req, res) => {

    const dto = req.body;

    const id = counter++;

    const msg = {id: id, author: dto.author, text: dto.text};

    messages.push(msg);

    res.status(201); //created
    res.send();

    const numberOfClients = expressWs.getWss().clients.size;
    console.log("Going to broadcast message to " + numberOfClients + " clients");

    expressWs.getWss().clients.forEach((client) => {
        if (client.readyState === WS.OPEN) {
            const json = JSON.stringify(msg);
            console.log("Broadcasting to client: " + JSON.stringify(msg));
            client.send(json);
        } else {
            console.log("Client not ready");
        }
    });
};
