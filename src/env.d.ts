/// <reference types="astro/client" />
/// <reference types="@pagefind/default-ui/exports" />

declare module "@pagefind/default-ui" {
	declare class PagefindUI {
		constructor(arg: unknown);
	}
}

interface ImportMetaEnv {
	readonly WEBMENTION_API_KEY: string;
	readonly PUBLIC_WEBMENTION_URL: string;
	readonly PUBLIC_WEBMENTION_PINGBACK: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
