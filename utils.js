import { useCallback, useEffect, useState } from 'react';

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (_, value) => {
    if (typeof value === 'object' && value !== null) {
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
  action = '',
  access_token = ''
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const responseObj = await fetch(url, {
        method: method,
        body: data && JSON.stringify(data, getCircularReplacer()),
        headers: {
          'action-type': action,
          authorization: access_token,
        },
      });

      const response = await responseObj.json();
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const global = {
  API_URL: process.env.NODE_ENV == 'production' ? 'https://blog-creator-rauloliva12.vercel.app/api/' : 'http://localhost:3000/api/',
};

export const icons = {
  email:
    'https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/100/000000/external-email-advertising-kiranshastry-lineal-color-kiranshastry-1.png',
  facebook: 'https://img.icons8.com/fluency/100/000000/facebook-new.png',
  github: 'https://img.icons8.com/ios-filled/100/000000/github.png',
  instagram: 'https://img.icons8.com/color/100/000000/instagram-new--v1.png',
};

// custom hook to authenticate the user with the access token
export const useAuthenticate = access_token => {
  const [user, setUser] = useState({});
  const [notAuth, setNotAuth] = useState(false);

  const authenticate = useCallback(async () => {
    try {
      const res = await request(
        `${global.API_URL}user`,
        'GET',
        undefined,
        'authenticate',
        access_token
      );
      setUser(res.user);
    } catch (error) {
      console.error(error);
      localStorage.removeItem('access_token');
      setNotAuth(true);
    }
  }, [access_token]);

  useEffect(() => {
    authenticate();
  }, [authenticate]);

  return [user, notAuth, authenticate];
};
