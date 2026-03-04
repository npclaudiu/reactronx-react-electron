export interface IpcTransport {
    send(channel: string, ...args: any[]): void;
    invoke(channel: string, ...args: any[]): Promise<any>;
    on(channel: string, listener: (...args: any[]) => void): () => void;
}

export class DefaultElectronGuestTransport implements IpcTransport {
    private namespace: string;

    constructor(namespace: string = "__reactronx") {
        this.namespace = namespace;
        if (typeof window === "undefined" || !(window as any)[this.namespace]) {
            console.warn(
                `Reactronx: Window namespace '${this.namespace}' not found. Did you run exposeReactronxIpc() in the preload script?`,
            );
        }
    }

    send(channel: string, ...args: any[]): void {
        (window as any)[this.namespace]?.send(channel, ...args);
    }

    invoke(channel: string, ...args: any[]): Promise<any> {
        return (window as any)[this.namespace]?.invoke(channel, ...args) || Promise.reject("IPC Bridge not found");
    }

    on(channel: string, listener: (...args: any[]) => void): () => void {
        return (window as any)[this.namespace]?.on(channel, listener) || (() => {});
    }
}
