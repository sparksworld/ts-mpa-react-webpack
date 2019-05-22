// @ts-ignore
import Ajax from '~/lib/axios'
import config from './config'

class Api extends Ajax {
    constructor() {
        super(config)
    }

    public getSearchType() {
        return this.get('/search/getSearchType')
    }
}

export default new Api()