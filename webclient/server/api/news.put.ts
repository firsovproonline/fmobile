import { getServerSession } from '#auth';
import productModel from "../database/models/news.model";
import {readBody} from "h3";
// @ts-ignore
export default eventHandler(async (event) => {
    const session = await getServerSession(event)
    const { data } = await readBody(event);
    // @ts-ignore
    if(session?.user?.admin == 1){
        const masters = await productModel.addNews(data);
// @ts-ignore
        event.wss.clients.forEach(client=>{
            client.send('reloadNews')
        })
        return masters
    }else{
        return {error:301}
    }
})