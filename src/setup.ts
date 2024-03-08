// setup.ts in your package
import { PayloadAccessConfig, config } from './config';

export const setup = (newConfig: PayloadAccessConfig) => {
    for (let key in newConfig) {
        if (key in config) {
            config[key as keyof PayloadAccessConfig] = newConfig[key as keyof PayloadAccessConfig];
        }
    }
};