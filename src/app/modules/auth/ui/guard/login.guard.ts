import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { RoutesEnum } from '@shared/enum';

import { SessionStore } from '@auth/application/store';

export const LoginGuard: CanActivateFn = () => {
  const _sessionStore = inject(SessionStore);
  const _router = inject(Router);

  if (_sessionStore.state)
    return _router.createUrlTree([`/${[RoutesEnum.BASE]}`]);

  return true;
};
