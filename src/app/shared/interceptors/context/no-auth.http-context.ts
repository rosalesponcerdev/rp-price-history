import { HttpContextToken } from '@angular/common/http';

export const NO_AUTH_HTTP_CONTEXT = new HttpContextToken<boolean>(() => false);
