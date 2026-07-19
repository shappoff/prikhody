const LOCAL = ['shap', 'poff'].join('');
const DOMAIN = ['gmail', 'com'].join('.');

export function getAdminEmail(): string {
    return `${LOCAL}@${DOMAIN}`;
}

export function getAdminMailtoHref(): string {
    return `mailto:${getAdminEmail()}`;
}
