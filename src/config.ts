export type PluginConfig = {
  roles: string[];
  organisations: string[];
};

export let pluginConfig: PluginConfig;

export const setPluginConfig = (config: PluginConfig) => {
  pluginConfig = config;
};

export const defaultConfig: PluginConfig = {
  roles: ['guest', 'editor', 'admin', 'root'],
  organisations: [],
};
