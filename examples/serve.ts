import { Remote } from "../src/server"

import express from "express"
import ws from "express-ws"

const app = express()
ws(app)

const router = express.Router()

router.ws("/", (ws, _) => {
    const remote = new Remote(ws)

    // Called when client connects
    function onOpen() {
        // Set the updated styles here
        // remote.sendMessage<SetProperties<HTMLDivElement>>({
        //     command: Command.SetProperties,
        //     selector: "#square",
        //     style: { backgroundColor: "blue" },
        // })
        remote.document.querySelector('#square').innerText = 'Hello'
    }
    ws.on("open", onOpen)

    if (ws.readyState === 1) {
        onOpen()
    }

})

app.use(router)
app.listen(3000)
