const cookieName = "auth_token";

export const setAuthCookie = (token) => {
  document.cookie = `${cookieName}=${JSON.stringify(
    token
  )}; path=/; samesite=strict`;
};

export const getAuthCookie = () => {
  const cookie = getC(cookieName);
  if (!cookie) return null;
  return JSON.parse(cookie);
};

export const deleteAuthCookie = () => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

function getC(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
