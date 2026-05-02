'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { MockAuthRepository } from '../../../infrastructure/repositories/mock-auth-repository';
import { LoginWithEmailUseCase } from '../../../core/use-cases/login-with-email';
import { LoginWithProviderUseCase } from '../../../core/use-cases/login-with-provider';
import { useAuthStore } from '../../../shared/store/auth-store';
import type { SocialProvider } from '../../../core/repositories/auth-repository';

const authRepository = new MockAuthRepository();
const loginWithEmailUseCase = new LoginWithEmailUseCase(authRepository);
const loginWithProviderUseCase = new LoginWithProviderUseCase(authRepository);

export function useLogin() {
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();

  const emailMutation = useMutation({
    mutationFn: (params: { email: string; password: string }) =>
      loginWithEmailUseCase.execute(params),
    onSuccess: (user) => {
      setUser(user);
      router.push('/');
    },
  });

  const providerMutation = useMutation({
    mutationFn: (provider: SocialProvider) =>
      loginWithProviderUseCase.execute(provider),
    onSuccess: (user) => {
      setUser(user);
      router.push('/');
    },
  });

  return {
    loginWithEmail: emailMutation.mutate,
    loginWithProvider: providerMutation.mutate,
    isPending: emailMutation.isPending || providerMutation.isPending,
    pendingProvider: providerMutation.isPending
      ? (providerMutation.variables as SocialProvider | undefined)
      : undefined,
    error:
      (emailMutation.error as Error | null) ??
      (providerMutation.error as Error | null),
    reset: () => {
      emailMutation.reset();
      providerMutation.reset();
    },
  };
}
