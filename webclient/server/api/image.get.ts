import { getServerSession } from '#auth';
import * as url from "url";
import imageModel from '../database/models/image.model';

// @ts-ignore
export default eventHandler(async (event) => {
    const params = await url.parse(event.node.req.url as string, true).query
    const masters = await imageModel.imageGet(params);
    return masters

})