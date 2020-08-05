const postcss = require('postcss');



module.exports = (plugins = [], options = {}) => ({ registerFilePlugin }) => {

  const {rule, ...config} = options;
  const ps = postcss(plugins);

  registerFilePlugin(options.rule || '**/*.css', async (path, buffer, next) => {
    const result = await ps.process(buffer, Object.assign({from: path, to: path}, options));
    if (result.map) await next(path + '.map', result.map);
    return next(path, result.css);
  });

}
