import type { User } from '../entities/user';

export interface LoginWithEmailParams {
  email: string;
  password: string;
}

export type SocialProvider = 'facebook' | 'google';

export interface AuthRepository {
  loginWithEmail(params: LoginWithEmailParams): Promise<User>;
  loginWithProvider(provider: SocialProvider): Promise<User>;
  logout(): Promise<void>;
}
