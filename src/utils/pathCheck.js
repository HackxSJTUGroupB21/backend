/**
 * 用来检测路径是否需要通过该 middleware
 * @param {string} path 路径
 * @param {object} option { includes: [], excludes: [] }
 */
export default function (path, option = {}) {
  if (option.includes instanceof Array) {
    let hit = false;
    option.includes.forEach(urlPattern => {
      const reg = new RegExp(`^${urlPattern}/{0,1}$`);
      const result = reg.exec(path);
      if (result && result.length > 0) {
        hit = true;
      }
    });
    if (!hit) {
      return false;
    }
  }
  if (option.excludes instanceof Array && option.excludes.includes(path)) {
    return false;
  }
  return true;
}
