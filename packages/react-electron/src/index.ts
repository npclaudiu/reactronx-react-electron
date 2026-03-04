export { render } from "./reconciler";
export type { IpcTransport } from "./transport";
export { DefaultElectronMainTransport } from "./transport";

// Add global JSX declarations
declare global {
    namespace JSX {
        interface IntrinsicElements {
            app: any;
            window: any;
            webcontents: any;
        }
    }
}
