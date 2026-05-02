import type { AuthRepository, LoginWithEmailParams, SocialProvider } from '../../core/repositories/auth-repository';
import type { User } from '../../core/entities/user';

const MOCK_USERS: Array<User & { password: string }> = [
  {
    id: 'u-1',
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    avatarUrl: undefined,
  },
  {
    id: 'u-2',
    name: 'Admin User',
    email: 'admin@noview.co',
    password: 'admin1234',
    avatarUrl: undefined,
  },
];

const SOCIAL_MOCK_USERS: Record<SocialProvider, User> = {
  facebook: {
    id: 'u-fb-1',
    name: 'Facebook User',
    email: 'fb@example.com',
  },
  google: {
    id: 'u-g-1',
    name: 'Google User',
    email: 'google@example.com',
  },
};

export class MockAuthRepository implements AuthRepository {
  async loginWithEmail({ email, password }: LoginWithEmailParams): Promise<User> {
    await new Promise((r) => setTimeout(r, 700));

    const found = MOCK_USERS.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password,
    );

    if (!found) {
      throw new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    }

    const { password: _pw, ...user } = found;
    return user;
  }

  async loginWithProvider(provider: SocialProvider): Promise<User> {
    await new Promise((r) => setTimeout(r, 900));
    return SOCIAL_MOCK_USERS[provider];
  }

  async logout(): Promise<void> {
    await new Promise((r) => setTimeout(r, 200));
  }
}
