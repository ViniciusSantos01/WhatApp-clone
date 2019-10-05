export class Base64 {

    static getMimeType(urlBase64){

        let regEx = /^data:(.+);base64,(.*)$/;
        let result = urlBase64.match(regEx);
        return result[1];

    }

    static toFile(urlBase64){

        let mimeType = Base64.getMimeType(urlBase64);

        let ext = mimeType.split('/')[1];
        let filename = `file${Date.now()}.${ext}`;

        return fetch(urlBase64)
            .then(resp => { return resp.arrayBuffer(); })
            .then(buffer => { return new File([buffer], filename, {type: mimeType}); });

    }

}