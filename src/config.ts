export type PluginConfig = {
  roles: string[];
  organisations: string[];
};

export const defaultConfig: PluginConfig = {
  roles: ['guest', 'editor', 'admin', 'root'],
  organisations: [],
};
