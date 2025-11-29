import { Session } from '../model';

export interface AuthPort {
  signUp(email: string, password: string): Promise<Session>;
  signIn(email: string, password: string): Promise<Session>;
  refreshSession(refreshToken: string): Promise<Session>;
}
