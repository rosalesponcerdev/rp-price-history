import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const newRequest = req.clone({
    headers: req.headers
      .append('apikey', 'XXXX')
      .append('Authorization', 'XXXX'),
  });

  return next(newRequest);
}
