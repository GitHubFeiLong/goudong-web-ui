const glob = require('glob');

/**
 * 创建多入口配置文件对象
 */
const createPages = () => {
  const pages = {};
  const files = glob.sync('./src/pages/*/*@(.html|.ts)');

  for (let i = 0; i < files.length; i += 2) {
    const file = files[i].substring(files[i].lastIndexOf('/') + 1, files[i].lastIndexOf('.'));
    const fileName = files[i].substring(files[i].lastIndexOf('/') + 1);
    // entry 入口文件，template模板文件，filename 打包后的文件名
    const obj = { entry: files[i + 1], template: files[i], filename: fileName };
    // @ts-ignore
    pages[file] = obj;
  }
  // console.log(pages)
  return pages;
};

module.exports = {
  createPages,
};
