export const getParamsStr = (params) => {
  const arr = [];
  for (const key in params) {
    if (params[key]) {
      arr.push(`${key}=${params[key]}`);
    }
  }
  return "?" + arr.join("&");
};