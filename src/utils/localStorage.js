
const LOCAL_STORAGE_PREFIX = 'chat-app-';

const setInLocalStorage = (key, data) => {
  localStorage.setItem(`${LOCAL_STORAGE_PREFIX}${key}`, JSON.stringify(data));
};

const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${key}`));
}

export { setInLocalStorage, getFromLocalStorage };
