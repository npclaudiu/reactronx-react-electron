export interface IpcTransport {
    send(channel: string, ...args: any[]): void;
    invoke(channel: string, ...args: any[]): Promise<any>;
    on(channel: string, listener: (...args: any[]) => void): () => void;
}

import { ipcMain } from "electron";

export class DefaultElectronMainTransport implements IpcTransport {
    send(channel: string, ...args: any[]): void {
        // Broadly sending to all windows for the default transport unless specified.
        // In a more robust system, you'd target specific WebContents.
        import("electron").then(({ BrowserWindow }) => {
            BrowserWindow.getAllWindows().forEach((win) => {
                win.webContents.send(channel, ...args);
            });
        });
    }

    invoke(channel: string, ...args: any[]): Promise<any> {
        throw new Error("Main process cannot invoke renderer directly without specific WebContents targeting.");
    }

    on(channel: string, listener: (...args: any[]) => void): () => void {
        const handler = (event: any, ...args: any[]) => listener(event, ...args);
        ipcMain.on(channel, handler);
        return () => {
            ipcMain.removeListener(channel, handler);
        };
    }
}
