import { IdentityData } from './identity-data.model';

export interface User {
  id: string;
  aud: string;
  email_confirmed_at?: string;
  phone: string;
  confirmation_sent_at?: string;
  confirmed_at: string;
  last_sign_in_at: string;
  app_metadata: AppMetadata;
  user_metadata: IdentityData;
  identities: Identity[];
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
  role: string;
  email: string;
}

export interface Identity {
  identity_id: string;
  id: string;
  user_id: string;
  identity_data: IdentityData;
  provider: string;
  last_sign_in_at: string;
  created_at: string;
  updated_at: string;
  email: string;
}

export interface AppMetadata {
  provider: string;
  providers: string[];
}
