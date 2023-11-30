import { getServerSession } from '#auth';
import productModel from "../database/models/product.model";
import {readBody} from "h3";
// @ts-ignore
export default eventHandler(async (event) => {
    const session = await getServerSession(event)
    const { data } = await readBody(event);
    // @ts-ignore
    if(data.email==session?.user?.email || session?.user?.admin == 1){
        if(session?.user?.image && session?.user?.image !== '' && session?.user?.email == data.email)
            data.photo = session?.user?.image
        const masters = await productModel.updateProduct(data);
        return masters
    }else{
        return {error:301}
    }

})