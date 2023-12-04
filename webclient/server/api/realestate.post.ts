import { getServerSession } from '#auth';
import {readBody} from "h3";
import realestateModel from "../database/models/realestate.model";
// @ts-ignore
export default eventHandler(async (event) => {
    const session = await getServerSession(event)
    const { data } = await readBody(event);
    // @ts-ignore
    if(data.email==session?.user?.email || session?.user?.admin == 1){
        const RealEstate = await realestateModel.updateRealEstate(data);
        return RealEstate
    }else{
        return {error:301}
    }

})