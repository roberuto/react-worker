const { loaderByName, addBeforeLoader } = require('@craco/craco');

module.exports = {
  jest: {
    configure: {
      moduleNameMapper: {
        '^worker-loader': '<rootDir>/__mocks__/workerMock.ts'
      }
    }
  },
  webpack: {
    configure: function(webpackConfig) {
      const workerLoader = {
        test: /\.worker\.ts$/,
        use: ['worker-loader']
      };

      const output = {
        ...webpackConfig.output,
        globalObject: 'this'
      };

      addBeforeLoader(webpackConfig, loaderByName('file-loader'), workerLoader);

      return { ...webpackConfig, output: { ...output } };
    }
  }
};
