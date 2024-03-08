import { Config, Plugin } from 'payload/config';
import { PluginConfig, setPluginConfig } from './config';

const payloadAccess =
  (pluginConfig: PluginConfig): Plugin =>
  (config: Config): Config => {
    setPluginConfig(pluginConfig);
    return {
      ...config,
      //   Add our own config to the payload config object
      ...pluginConfig,
    };
  };

export default payloadAccess;
