export const argsKeywords = Object.freeze({
  '--username': 0,

  *[Symbol.iterator]() {
    for (let key of Object.keys(this)) yield key;
  }
  
});