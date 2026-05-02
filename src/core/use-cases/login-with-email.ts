import type { AuthRepository, LoginWithEmailParams } from '../repositories/auth-repository';
import type { User } from '../entities/user';

export class LoginWithEmailUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(params: LoginWithEmailParams): Promise<User> {
    if (!params.email || !params.password) {
      throw new Error('กรุณากรอกอีเมลและรหัสผ่าน');
    }
    return this.authRepository.loginWithEmail(params);
  }
}
