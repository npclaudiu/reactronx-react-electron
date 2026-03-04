import { app } from "electron";

export class AppElement {
    public type = "app";
    public props: any;

    constructor(props: any) {
        this.props = props;
    }

    appendChild(child: any) {
        // App is a container
    }

    removeChild(child: any) {
        // Handle child removal
    }

    updateProps(newProps: any) {
        this.props = newProps;
        // Bind app lifecycle events if passed (e.g., onReady, onWindowAllClosed)
        if (this.props.onWindowAllClosed) {
            app.on("window-all-closed", this.props.onWindowAllClosed);
        } else {
            app.on("window-all-closed", () => {
                if (process.platform !== "darwin") app.quit();
            });
        }
    }
}
