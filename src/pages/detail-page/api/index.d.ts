import Ajax from '~/lib/axios';
declare class Api extends Ajax {
    [x: string]: any;
    constructor();
    getSearchType(): any;
    test(): any;
}
declare const _default: Api;
export default _default;
