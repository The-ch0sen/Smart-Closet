module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // 若有用 Reanimated 再打開：
    // plugins: ['react-native-reanimated/plugin'],
  };
};
