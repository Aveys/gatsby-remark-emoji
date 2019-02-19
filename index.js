const emoji = require(`emojione`);
const Promise = require(`bluebird`);

const defaultPluginOptions = {
  emojiConversion: 'shortnameToUnicode',
  sprites: false,
  emojiSize: 32
};

module.exports = {
  mutateSource: ({ markdownNode }, pluginOptions = defaultPluginOptions) => {
    const emojiConversion =
      pluginOptions.emojiConversion || defaultPluginOptions.emojiConversion;
    if(pluginOptions.emojiSize){
      emoji.emojiSize = pluginOptions.emojiSize
    }
    if(pluginOptions.sprites || defaultPluginOptions.sprites ){
      emoji.imageType = 'png';
      emoji.sprites = true;
    }
    return new Promise((resolve, reject) => {
      try {
        markdownNode.internal.content = emoji[emojiConversion](
          markdownNode.internal.content,
        );
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  },
};
