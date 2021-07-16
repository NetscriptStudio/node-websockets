'use strict';

const http = require("http")
const websocketServer = require("ws")
const httpServer = http.createServer()

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

var messages = []

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wsServer = new websocketServer({
  "httpServer": httpServer
})

wsServer.on("request", request => {
  const connection = request.accept(null, request.origin)

  connection.on("open", () => console.log("Opened Connection"))
  connection.on("close", () => console.log("Closed Connection"))

  connection.on("message", message => {
      var data = JSON.parse(message.binaryData.toString())

      const msg = data
      console.log(msg)
      })
      
      messages.push(msg)
      const payload = {
          "message": messages.values
      }
      connection.send(JSON.stringify(payload))
})
