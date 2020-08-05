const postcss = require('postcss');



module.exports = (plugins = [], options = {}) => (plugin) => {

  const {rule, ...config} = options;
  const ps = postcss(plugins);

  plugin.registerFileHandler(options.rule || '**/*.css', async ({path, file}) => {
    const result = await ps.process(file, {from: path, to: path, ...config});
    let output = {path, file: result.css};
    if (result.map) {
      output = [output, {path: path + '.map', file: result.map}]
    }
    return output;
  });

}
