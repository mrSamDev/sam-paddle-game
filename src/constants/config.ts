import type { BaseConfig } from "../types/config";

const createBase = (siteUrl: string, apiBaseUrl: string): BaseConfig => ({
  SITE_URL: siteUrl,
  API_BASE_URL: apiBaseUrl,
  CALLBACK_URL: `${siteUrl}/github/callback`,
});

const dev_base = createBase("http://localhost:3000", "http://localhost:8000");

const prod_base = createBase("https://mrsamdev-paddle-game.netlify.app", "https://light-alligator-70.deno.dev");

export const base: BaseConfig = import.meta.env.DEV ? dev_base : prod_base;
