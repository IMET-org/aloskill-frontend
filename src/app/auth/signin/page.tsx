"use client";

import { AlertCircle, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || searchParams.get("returnUrl") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
      } else if (result?.ok) {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (_err) {
      setError("Unexpected error, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { redirect: true, callbackUrl });
      setIsLoading(false);
    } catch (_err) {
      setError("Google sign-in failed");
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4'>
      <div className='max-w-md mx-auto w-full'>
        {/* Header */}
        {/* <div className='text-center mb-8 text-[var(--color-text-dark)]'>
          <h3 className='mb-2'>Welcome Back</h3>

          <p className=''>Sign in to continue your learning journey</p>
        </div> */}

        {/* Card */}
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          {/* Sign Up Link */}
          <div className='flex justify-between items-center  mb-12'>
            <h5 className='gradient-text-animated font-bold'>SIGN IN</h5>
            <p className='text-sm text-gray-600'>
              Dont have an account?{" "}
              <Link
                href='/auth/signup'
                className=' text-[var(--color-text-dark)] blue-600 hover:text-[var(--color-orange-light)] font-semibold'
              >
                Sign up
              </Link>
            </p>
          </div>
          {/* Error Alert */}
          {error && (
            <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3'>
              <AlertCircle className='w-5 h-5 text-red-600 flex-shrink-0 mt-0.5' />
              <p className='text-sm text-red-800'>{error}</p>
            </div>
          )}

          {/* Google Sign In */}
          {/* <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className='w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-6'
          >
            <svg
              className='w-5 h-5'
              viewBox='0 0 24 24'
            >
              <path
                fill='#4285F4'
                d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
              />
              <path
                fill='#34A853'
                d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
              />
              <path
                fill='#FBBC05'
                d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
              />
              <path
                fill='#EA4335'
                d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
              />
            </svg>
            <span className='font-medium text-gray-700'>Continue with Google</span>
          </button> */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className='relative group w-full flex items-center justify-center text-[var(--color-text-dark)] transition-all  whitespace-nowrap rounded-lg  will-change-transform duration-300 h-12 text-lg pl-[5rem] px-4 py-3 mb-6 border-4 border-[var(--color-orange)]  shadow-[var(--color-orange)/30] hover:shadow-[var(--color-orange-light)/40]'
          >
            <div className='absolute left-0 top-0  bg-white text-slate-950 p-[0.35rem] bottom-1 group-hover:w-[calc(100%-0.5rem)] transition-all rounded-md duration-300 h-10 w-10'>
              <svg
                className='h-full w-full'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 128 128'
              >
                <path
                  fill='#fff'
                  d='M44.59 4.21a63.28 63.28 0 004.33 120.9 67.6 67.6 0 0032.36.35 57.13 57.13 0 0025.9-13.46 57.44 57.44 0 0016-26.26 74.33 74.33 0 001.61-33.58H65.27v24.69h34.47a29.72 29.72 0 01-12.66 19.52 36.16 36.16 0 01-13.93 5.5 41.29 41.29 0 01-15.1 0A37.16 37.16 0 0144 95.74a39.3 39.3 0 01-14.5-19.42 38.31 38.31 0 010-24.63 39.25 39.25 0 019.18-14.91A37.17 37.17 0 0176.13 27a34.28 34.28 0 0113.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.22 61.22 0 0087.2 4.59a64 64 0 00-42.61-.38z'
                />
                <path
                  fill='#e33629'
                  d='M44.59 4.21a64 64 0 0142.61.37 61.22 61.22 0 0120.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.28 34.28 0 00-13.64-8 37.17 37.17 0 00-37.46 9.74 39.25 39.25 0 00-9.18 14.91L8.76 35.6A63.53 63.53 0 0144.59 4.21z'
                />
                <path
                  fill='#f8bd00'
                  d='M3.26 51.5a62.93 62.93 0 015.5-15.9l20.73 16.09a38.31 38.31 0 000 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 01-5.5-40.9z'
                />
                <path
                  fill='#587dbd'
                  d='M65.27 52.15h59.52a74.33 74.33 0 01-1.61 33.58 57.44 57.44 0 01-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0012.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68z'
                />
                <path
                  fill='#319f43'
                  d='M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0044 95.74a37.16 37.16 0 0014.08 6.08 41.29 41.29 0 0015.1 0 36.16 36.16 0 0013.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 01-25.9 13.47 67.6 67.6 0 01-32.36-.35 63 63 0 01-23-11.59A63.73 63.73 0 018.75 92.4z'
                />
              </svg>
              {/* <ArrowBigRight className='h-full w-full' /> */}
              {/* <Play className='h-full w-full' /> */}
            </div>
            <div>Continue with Google</div>
            <div className='bg-[var(--color-orange)] absolute flex rounded-full animate-ping opacity-75 h-5 w-5 -top-2 -right-2' />
            <div className='bg-[var(--color-orange-dark)] absolute flex rounded-full scale-[90%] h-5 w-5 -top-2 -right-2' />
          </button>

          {/* Divider */}
          <div className='relative mb-6'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-200'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-4 bg-white text-gray-500'>Or continue with email</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form
            onSubmit={handleSubmit}
            className='space-y-5'
          >
            {/* Email Input */}
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Email Address
              </label>
              <div className='relative'>
                <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
                <input
                  id='email'
                  type='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder='you@example.com'
                  required
                  className='w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Password
              </label>
              <div className='relative'>
                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
                <input
                  id='password'
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder='••••••••'
                  required
                  className='w-full pl-11 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                >
                  {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className='flex justify-end'>
              <Link
                href='/auth/forgot-password'
                className='text-sm text-blue-600 hover:text-blue-700 font-medium'
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              disabled={isLoading}
              className='w-full h-12 bg-gradient-to-r from-orange-600 to-orange-400 text-white py-3 rounded-xl font-semibold bg-[length:200%_200%] hover:bg-right-bottom hover:from-orange-400 hover:to-orange-600 transition-all duration-700 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30'
            >
              {isLoading ? (
                <span className='flex items-center justify-center gap-2'>
                  <svg
                    className='animate-spin h-5 w-5'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                      fill='none'
                    />
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className='mt-8 text-center text-xs text-gray-500'>
          By signing in, you agree to our{" "}
          <Link
            href='/terms'
            className='underline hover:text-gray-700'
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href='/privacy'
            className='underline hover:text-gray-700'
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
