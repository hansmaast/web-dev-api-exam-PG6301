/**
 * Implementing code from this source:
 * https://github.com/arcuri82/web_development_and_api_design/blob/1fca518cd9d8da65bf6c38bbab5ce1a654ff0e90/les09/chat/websocket-rest/src/server/app.js
 */
let counter = 0;

let messages = [];

function clearMessages(){
    //yep, that's how you "clear" an array in JS...
    messages.length = 0;
}

module.exports = {counter, messages, clearMessages}