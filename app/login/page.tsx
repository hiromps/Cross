"use client";

import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <h1 className="text-4xl font-extrabold text-center text-blue-600 dark:text-blue-400 tracking-tight">
          Cross
        </h1>
      </div>

      <LoginForm />
    </div>
  );
} 