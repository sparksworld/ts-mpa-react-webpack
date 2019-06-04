// @ts-ignore
import Ajax from '~/lib/axios'
import config from './config'

class Api extends Ajax {
    [x: string]: any;
    constructor() {
        super(config)
    }

    public getSearchType() {
        return this.get('/search/getSearchType')
    }
    public test() {
        return this.post('/test/getDate')
    }
}

export default new Api()