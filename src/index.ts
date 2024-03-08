import { Config, Plugin } from 'payload/config';
import { PluginConfig, setPluginConfig } from './config';

const payloadAccess =
  (pluginConfig: PluginConfig): Plugin =>
  (config: Config): Config => {
    // Set the plugin config as singleton so we can use it in other parts of the package
    setPluginConfig(pluginConfig);
    return {
      ...config,
      //   Add our own config to the payload config object
      ...pluginConfig,
    };
  };

export default payloadAccess;
