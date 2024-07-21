import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accountService = inject(AccountService);
        if (accountService.currentUser()) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${accountService.currentUser()?.token}`
            }
          })
        }

    return next.handle(request);
  }
}
