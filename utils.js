import { Logger } from 'react-logger-lib';

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (_, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

export const request = (
  url,
  method,
  data = null,
  action = "",
  access_token = ""
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const responseObj = await fetch(url, {
        method: method,
        body: data && JSON.stringify(data, getCircularReplacer()),
        headers: {
          "action-type": action,
          authorization: access_token,
        },
      });

      const response = await responseObj.json();
      resolve(response);
    } catch (error) {
      Logger.of(`API Request to ${url}`).error('Promise rejected: ', error);
      reject(error);
    }
  });
};

export const global = {
  API_URL: "http://localhost:3000/api/",
};
