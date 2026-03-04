export class WebContentsElement {
    public type = "webcontents";
    public props: any;

    constructor(props: any) {
        this.props = props;
    }

    updateProps(newProps: any) {
        this.props = newProps;
    }
}
