import type { AuthRepository, SocialProvider } from '../repositories/auth-repository';
import type { User } from '../entities/user';

export class LoginWithProviderUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(provider: SocialProvider): Promise<User> {
    return this.authRepository.loginWithProvider(provider);
  }
}
