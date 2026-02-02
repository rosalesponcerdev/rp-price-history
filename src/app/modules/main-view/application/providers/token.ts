import { InjectionToken } from '@angular/core';
import { BrandPort } from '@main-view/domain/port';

export const BRAND_PORT = new InjectionToken<BrandPort>('BRAND_PORT');
