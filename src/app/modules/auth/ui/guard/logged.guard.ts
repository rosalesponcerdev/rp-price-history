import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { RoutesEnum } from '@shared/enum';

import { SessionStore } from '@auth/application/store';

export const LoggedGuard: CanActivateFn = () => {
  const _sessionStore = inject(SessionStore);
  const _router = inject(Router);

  if (!_sessionStore.state) {
    sessionStorage.clear();

    return _router.createUrlTree([`/${[RoutesEnum.LOGIN]}`]);
  }

  return true;
};
