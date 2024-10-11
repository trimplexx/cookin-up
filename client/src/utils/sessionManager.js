let logoutFunction = null;

export const setLogoutFunction = (fn) => {
  logoutFunction = fn;
};

export const executeLogout = () => {
  if (logoutFunction) {
    logoutFunction();
  }
};
