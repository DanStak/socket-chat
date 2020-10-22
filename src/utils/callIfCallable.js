const callIfCallable = (callback, ...params) => {
  if(typeof callback === 'function') {
    callback(...params)
  }
}

export default callIfCallable;
