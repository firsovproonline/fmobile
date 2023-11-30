import { getServerSession } from '#auth';
import * as url from "url";
import masterModel from '../database/models/news.model';

// @ts-ignore
export default eventHandler(async (event) => {
//    const session = await getServerSession(event)

    const params = await url.parse(event.node.req.url as string, true).query
    if(!params.email){
        //const data = await useStorage().getItem('redis:nuxt3-redis')
        const masters = await masterModel.findAllNews();
        return masters
    }else{
        //const data = await useStorage().getItem('redis:nuxt3-redis')
        const master= await masterModel.findNews(params.email as string);
        return master;
    }
})