import { getServerSession } from '#auth';
import * as url from "url";
import productModel from '../database/models/realestate.model';


// @ts-ignore
export default eventHandler(async (event) => {
// @ts-ignore
    const params = await url.parse(event.node.req.url as string, true).query
    return await productModel.getRealEstate('5');
})