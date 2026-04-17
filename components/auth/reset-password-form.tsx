'use client';

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Lock, CheckCircle } from 'lucide-react';
import { updatePassword } from '@/lib/actions/auth';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-primary hover:bg-primary/80 text-white py-3 text-lg font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Updating password...
        </>
      ) : (
        'Update Password'
      )}
    </Button>
  );
}

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, formAction] = useActionState(updatePassword, null);
  const [isRecoveryMode, setIsRecoveryMode] = useState(false);
  const [error, setError] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam === 'missing_token') {
      setError('Invalid or expired reset link. Please request a new password reset.');
      return;
    }

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsRecoveryMode(true);
        setError(null);
      } else if (event === 'INITIAL_SESSION' && !session) {
        setError('Please use the password reset link sent to your email.');
      }
    });

    supabase.auth.getSession();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [searchParams]);

  useEffect(() => {
    if (state?.success) {
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    }
  }, [state, router]);

  if (error) {
    return (
      <div className="text-center space-y-4  ">
        <h3 className="text-xl font-semibold text-gray-900">Error</h3>
        <p className="text-gray-600">{error}</p>
        <Button
          onClick={() => router.push('/auth/forgot-password')}
          className="bg-primary hover:bg-primary/80 text-white py-3 text-lg font-semibold rounded-xl"
        >
          Request New Reset Link
        </Button>
      </div>
    );
  }

  if (state?.success) {
    return (
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Password Updated!</h3>
        <p className="text-gray-600">
          Your password has been successfully updated. You will be redirected to the login page shortly.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">{state.error}</div>
      )}
      <div>
        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
          New Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter new password"
            required
            minLength={6}
            className="pl-10 py-3 border-gray-300 rounded-xl focus:ring-primary focus:border-primary transition-colors"
          />
        </div>
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
          Confirm New Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            required
            minLength={6}
            className="pl-10 py-3 border-gray-300 rounded-xl focus:ring-primary focus:border-primary transition-colors"
          />
        </div>
      </div>
      <SubmitButton />
    </form>
  );
}
