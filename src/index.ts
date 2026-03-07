export { render } from "./reconciler";

declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            app: Record<string, unknown>;
            window: Record<string, unknown>;
            webcontents: Record<string, unknown>;
        }
    }
}
