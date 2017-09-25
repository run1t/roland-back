"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const Observable_1 = require("rxjs/Observable");
/**
 * Should handle the commande line interface
 */
class GitlabDeploy {
    constructor(options) {
        this.setAuth(options.user, options.pass);
    }
    setAuth(user, pass) {
        this.auth = { user, pass };
    }
    static getInstance(options) {
        if (!GitlabDeploy.instance) {
            GitlabDeploy.instance = new GitlabDeploy(options);
        }
        return GitlabDeploy.instance;
    }
    update() {
        return R.get('https://rancher.gpp.ovh/v2-beta/projects/1a41/stacks/1st42', { auth: this.auth });
    }
}
exports.GitlabDeploy = GitlabDeploy;
class R {
    static get(uri, options) {
        const _options = Object.assign({}, options, { method: 'GET' });
        return R.request(uri, options);
    }
    static post(uri, options) {
        const _options = Object.assign({}, options, { method: 'POST', uri });
        return R.request(uri, options);
    }
    static put(uri, options) {
        const _options = Object.assign({}, options, { method: 'PUT', uri });
        return R.request(uri, options);
    }
    static delete(uri, options) {
        const _options = Object.assign({}, options, { method: 'DELETE', uri });
        return R.request(uri, options);
    }
    static request(uri, options) {
        return Observable_1.Observable.create((observer) => {
            request(uri, options, (error, response, body) => {
                if (error) {
                    observer.error(error);
                }
                else {
                    observer.next({ response: response, body: body });
                }
                observer.complete();
            });
        });
    }
}
//# sourceMappingURL=gitlab-deploy.js.map