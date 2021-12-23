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

export const request = (url, method, data = null) => {
  return new Promise(async (resolve, reject) => {
    try {
      const responseObj = await fetch(url, {
        method: method,
        body: data && JSON.stringify(data, getCircularReplacer()),
      });

      const response = await responseObj.json();
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const global = {
  API_URL: "http://localhost:3000/api/",
};
