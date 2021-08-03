const { CommandCore } = require('@midwayjs/command-core');
const { loadSpec } = require('@midwayjs/serverless-spec-builder');
const { PackagePlugin } = require('@midwayjs/fcli-plugin-package');
const { WeChatPlugin } = require('@midwayjs/fcli-plugin-wechat');

(async() => {
  const core = new CommandCore({
    config: {
      servicePath: process.env.baseDir,
    },
    options: {
      verbose: process.env.MIDWAY_FAAS_VERBOSE,
    },
    commands: ['package'],
    service: loadSpec(process.env.baseDir),
    provider: 'wechat',
    log: {
      ...console,
      log: (...args) => {
        if (process.env.MIDWAY_FAAS_VERBOSE) {
          console.log(...args);
        }
      },
    },
  });
  core.addPlugin(PackagePlugin);
  core.addPlugin(WeChatPlugin);
  await core.ready();
  await core.invoke(['package']);
})();
