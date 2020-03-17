var CryptoJS = require("crypto-js");
// 加密
const encrypt = (text, k) => {
    let key = CryptoJS.enc.Utf8.parse(k);
    let iv = CryptoJS.enc.Base64.parse('QUJDREVGR0g=');
    let encoded = CryptoJS.enc.Utf8.parse(text);
    let ciphertext = CryptoJS.TripleDES.encrypt(encoded, key, { mode: CryptoJS.mode.CBC, iv: iv });

    return ciphertext.toString();
};
// 解密
const decrypt = (encryptedText, k) => {
    let key = CryptoJS.enc.Utf8.parse(k);
    let iv = CryptoJS.enc.Base64.parse('QUJDREVGR0g=');
    let bytes = CryptoJS.TripleDES.decrypt(encryptedText, key, { mode: CryptoJS.mode.CBC, iv: iv });
    let decryptedText = bytes.toString(CryptoJS.enc.Utf8);

    return decryptedText;
};
module.exports = {
    encrypt,
    decrypt
}