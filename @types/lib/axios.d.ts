export default class Ajax {
    protected http: any;
    constructor(option: {
        baseURL: string;
    });
    protected get(api: any, params?: {}): any;
    protected post(api: any, params?: {}): any;
}
