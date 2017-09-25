import * as request from 'request';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';


/**
 * Should handle the commande line interface
 */

export class GitlabDeploy{

    private auth;
    private static instance: GitlabDeploy;
    private constructor(options) {
        this.setAuth(options.user, options.pass);
    }

    private setAuth(user, pass){
        this.auth = {user, pass};
    }

    static getInstance(options) {
        if (!GitlabDeploy.instance) {
            GitlabDeploy.instance = new GitlabDeploy(options);
        }
        return GitlabDeploy.instance;
    }


    update(): Observable<any>{
        return R.get('https://rancher.gpp.ovh/v2-beta/projects/1a41/stacks/1st42',{auth: this.auth})
    }

}

class R{

    static get(uri, options){
        const _options = Object.assign({}, options, {method: 'GET'});
        return R.request(uri, options);
    }

    // static post(uri, options){
    //     const _options = Object.assign({}, options, {method: 'POST', uri});
    //     return R.request(options);
    // }

    // static put(uri, options){
    //     const _options = Object.assign({}, options, {method: 'PUT', uri});
    //     return R.request(options);
    // }

    // static delete(uri, options){
    //     const _options = Object.assign({}, options, {method: 'DELETE', uri});
    //     return R.request(options);
    // }

    static request(uri, options: any) {
        return Observable.create((observer: Observer<any>) => {
            request(uri, options, (error, response, body) => {
                if(error){ 
                    observer.error(error); 
                } else { 
                    observer.next({response: response, body: body }); }
                    observer.complete();
                })
            });
    }
}