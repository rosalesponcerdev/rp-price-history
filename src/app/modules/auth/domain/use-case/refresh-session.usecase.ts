import { Session } from '../model';
import { AuthPort } from '../port';

export class RefreshSessionUseCase {
  constructor(private readonly _authSrv: AuthPort) {}

  public execute(refreshToken: string): Promise<Session> {
    return this._authSrv.refreshSession(refreshToken);
  }
}
