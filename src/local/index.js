/**
 * Local
 * functions to manage login sessions and 
*/
import { SESSION_KEY, SUBMISSION_STORE_KEY } from "../utils/constants";

let submissionStorage = undefined;

// Function to set a cookie with expiry (days)
export const setCookie = (cname, cvalue, exdays) => {
  const date = new Date();
  date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
}

// Function to get a cookie
export const getCookie = (cname)  => {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

// Deletes all cookies
export const deleteAllCookies = () => {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
}

export const setSessionCookie = (sessionValue) => {
	// Expires in 3 Days
	const expiryDays = 3;
	setCookie(SESSION_KEY, sessionValue, expiryDays);
}

export const getSessionId = (sessionValue) => {
	return getCookie(SESSION_KEY);
}

/**
 * init response object
*/
const getSubmissionStore = () => {
  if (submissionStorage) {
    return submissionStorage;
  }  
  try {
    const storeString = localStorage.getItem(SUBMISSION_STORE_KEY);
    const store = JSON.parse(storeString);
    submissionStorage = store || {};
  } catch {
    submissionStorage = {};
  }
  return submissionStorage;
}

/**
 * Returns submission_id based on form_id
*/
export const getSubmissionId = (formId) => {
  const store = getSubmissionStore()
  return store[formId];
}

/**
 * Set submission_id for form_id
*/
export const setSubmissionId = (formId, submissionId) => {
  getSubmissionStore();
  submissionStorage[formId] = submissionId;
  localStorage.setItem(SUBMISSION_STORE_KEY, JSON.stringify(submissionStorage));
}


export const clearStorage = () => {
  localStorage.setItem(SUBMISSION_STORE_KEY, null);
}