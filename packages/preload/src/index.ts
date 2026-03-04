import { contextBridge, ipcRenderer } from "electron";

export function exposeReactronxIpc(namespace: string = "__reactronx") {
    contextBridge.exposeInMainWorld(namespace, {
        send: (channel: string, ...args: any[]) => ipcRenderer.send(channel, ...args),
        invoke: (channel: string, ...args: any[]) => ipcRenderer.invoke(channel, ...args),
        on: (channel: string, listener: (...args: any[]) => void) => {
            const subscription = (event: any, ...args: any[]) => listener(...args);
            ipcRenderer.on(channel, subscription);
            return () => {
                ipcRenderer.removeListener(channel, subscription);
            };
        },
    });
}
