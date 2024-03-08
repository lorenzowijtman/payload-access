export type PayloadAccessConfig = {
    roles: string[];
    organisations: string[];
}

export let config: PayloadAccessConfig = {
    roles: ['guest', 'editor', 'admin', 'root'],
    organisations: [],
}