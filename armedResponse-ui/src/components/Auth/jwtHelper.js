import decode from "jwt-decode";

class Decoder {
  getTokenExpirationDate(token) {
    const decoded = decode(token);
    if (!decoded.exp) {
      return null;
    }
    const date = new Date(0); // The 0 here is the key, which sets the date to the epoch
    date.setUTCSeconds(decoded.exp);
    return date;
  }
  isTokenExpired(token) {
    const date = this.getTokenExpirationDate(token);
    if (date === null) {
      return false;
    }
    if (date.valueOf() > new Date().valueOf()) {
      return true;
    } else return false;
  }
}
const tokenDecoder = new Decoder();
export default tokenDecoder;
