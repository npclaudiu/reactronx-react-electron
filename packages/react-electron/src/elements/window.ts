import { BrowserWindow, BrowserWindowConstructorOptions } from "electron";

export class WindowElement {
    public type = "window";
    public props: any;
    public window: BrowserWindow;

    constructor(props: any) {
        this.props = props;

        const options: BrowserWindowConstructorOptions = {
            width: props.width || 800,
            height: props.height || 600,
            title: props.title || "Reactronx App",
            webPreferences: {
                preload: props.preload,
            },
        };

        this.window = new BrowserWindow(options);

        if (props.onClose) {
            this.window.on("closed", props.onClose);
        }
    }

    appendChild(child: any) {
        if (child.type === "webcontents") {
            if (child.props.url) {
                this.window.loadURL(child.props.url);
            } else if (child.props.file) {
                this.window.loadFile(child.props.file);
            }
        }
    }

    removeChild(child: any) {
        // Remove child logic
    }

    updateProps(newProps: any) {
        if (newProps.title && newProps.title !== this.props.title) {
            this.window.setTitle(newProps.title);
        }
        if (newProps.width !== this.props.width || newProps.height !== this.props.height) {
            this.window.setSize(newProps.width || 800, newProps.height || 600);
        }
        this.props = newProps;
    }

    destroy() {
        if (!this.window.isDestroyed()) {
            this.window.destroy();
        }
    }
}
