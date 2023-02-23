export const decodeJwt = (token: string) => {
  var base64Payload = token.split(".")[1];
  if (base64Payload) {
    var base64 = decodeURIComponent(atob(base64Payload).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''));
    return JSON.parse(base64);
  }
  throw new Error("Invalid token");
}