/// <reference types="astro/client" />

declare module "@pagefind/default-ui" {
	declare class PagefindUI {
		constructor(arg: unknown);
	}
}

interface ImportMetaEnv {
	readonly WEBMENTION_API_KEY: string;
	readonly WEBMENTION_URL: string;
	readonly WEBMENTION_PINGBACK: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
