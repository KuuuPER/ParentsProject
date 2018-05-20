import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";

import * as fromApp from '../store/app.reducers';
import * as fromAauth from '../core/auth/store/auth.reducers';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private store: Store<fromApp.AppState>){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{        
        return this.store.select('auth')
        .take(1)
        .switchMap((authState: fromAauth.State) => {
            if (authState.token !== null && req.url !== '/token') {
                const copiedReq = req.clone({headers: req.headers.set('Authorization', "Bearer " + authState.token)});
                return next.handle(copiedReq);
            }
            return next.handle(req);
        });
    }
}