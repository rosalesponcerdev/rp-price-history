import { Session } from '../model';
import { AuthPort } from '../port';

export class SignInUseCase {
  constructor(private readonly _authPort: AuthPort) {}

  public execute(email: string, password: string): Promise<Session> {
    if (!email || !password) throw 'NO EMAIL OR PASSWORD';

    return this._authPort.signIn(email, password);
  }
}
