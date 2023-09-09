export const setCookie = (key, value, expires, isUpdate = false) => {
  if (value && typeof value === 'object') {
    value = JSON.stringify(value);
  }

  const domain = window.location.href.includes('localhost') ? '' : 'travena.io';
  const mCookie = `${key}=${value};domain=${domain};secure;samesite=lax;expires=${expires};path=/`;

  // New Cookie, Save
  if (!doesCookieExist(key)) {
    document.cookie = mCookie;
  }
  // Only Update if it's specified
  else if (isUpdate) {
    document.cookie = mCookie;
  }
};

export const doesCookieExist = (key) => document.cookie.includes(`${key}=`);

// invalidates cookies by setting expiry to a past date
export const inValidateCookies = (clearAll) => {
  const cookieExp = 'Thu, 01 Jan 1970 00:00:00';

  const allCookies = document.cookie;

  allCookies.split(';').forEach((keyValuePair) => {
    const key = keyValuePair.split('=')[0]?.trim();

    // leave out refreshToken if clearAll is false
    if (clearAll || key !== 'refreshToken') setCookie(key, '', cookieExp, true);
  });
};

export const getCookie = (searchKey) => {
  const allCookies = document.cookie;

  if (!doesCookieExist(searchKey)) {
    return null;
  }

  let result;

  allCookies.split(';').forEach((keyValuePair) => {
    const key = keyValuePair.split('=')[0];
    const value = keyValuePair.split('=')[1];

    if (key.includes(searchKey)) {
      // IF Value is JSON object, convert to json
      try {
        result = JSON.parse(value);
      } catch (e) {
        result = value;
      }
    }
  });

  if (searchKey === 'UserInfo' && result) {
    // check if its expired
    const nowTime = +new Date();
    if (nowTime > result.expiresAt) {
      window.location = `${window.location.origin}/login`;
    }
  }

  return result;
};
