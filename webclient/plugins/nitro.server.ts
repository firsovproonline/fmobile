// @ts-ignore
import { WebSocketServer } from "ws";

export default defineNitroPlugin((nitroApp) => {
    // @ts-ignore
    nitroApp.hooks.hook("request", (event) => {
        // @ts-ignore
        if(!nitroApp.router.wss){
            const wss = new WebSocketServer({ port:3011 });
            // @ts-ignore
            nitroApp.router.wss = wss
//nuxt.hook("close", () => wss.close());
            // @ts-ignore
            wss.on("connection", (ws) => {
                // @ts-ignore
                ws.on("message", (data) => console.log("received: %s", data));
                ws.send("someting");
            });

        }
        // @ts-ignore
        event.wss= nitroApp.router.wss
    });
});