export default function authHeader() {
  const userToken = JSON.parse(localStorage.getItem("userToken"));

  if (userToken) {
    return userToken;
  } else {
    return {};
  }
}