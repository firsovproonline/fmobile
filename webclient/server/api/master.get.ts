import { getServerSession } from '#auth';
import * as url from "url";
import masterModel from '../database/models/master.model';

// @ts-ignore
export default eventHandler(async (event) => {
    const params = await url.parse(event.node.req.url as string, true).query
    const masters = await masterModel.findAllMaster(params as any);
    return masters
})