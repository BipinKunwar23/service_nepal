import React from 'react'
import CryptoJS from 'crypto-js';
import 'crypto-js/hmac-sha256';
import 'crypto-js/enc-base64';

const signature = (Message,Secret) => {
        const hash = CryptoJS.HmacSHA256(Message, Secret);
        const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
        console.log(hashInBase64);
        return hashInBase64
}

export default signature