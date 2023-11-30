import connectionMysql from '../config/mysql';
// @ts-ignore
import gm from 'gm'
// @ts-ignore
const decodeBase64Img = (base64String) => {
    const matches = base64String.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
        obj = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    const [, extension, base64] = matches;

    // @ts-ignore
    obj.type = extension;
    // @ts-ignore
    obj.buffer = Buffer.from(base64, 'base64');

    return obj;
    // Based on: https://stackoverflow.com/Questions/20267939/Nodejs-Write-Base64-Image-File
};
// @ts-ignore
function rotate (readStream) {
    return new Promise(function (resolve, reject) {
        gm(readStream, '1111.jpg')
            // @ts-ignore
        .resize(300, false)
        .toBuffer('JPG',  (err, buffer)=> {
            // @ts-ignore
            resolve(buffer)
        })
    })
}


export default {
    async imageGet(params: any) {
        const query = `SELECT img`+params.i+` from `+params.d+` WHERE id = `+params.r
        const [img] = await connectionMysql.execute(query);
        if(img.length> 0 && img[0].img1){
            // @ts-ignore
            return await rotate(decodeBase64Img(img[0].img1).buffer);
        }else{
            return ''
        }

    },
}