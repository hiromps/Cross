"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { supabase } from '@/lib/supabase';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Icons } from '../components/icons';
import Link from 'next/link';

// フォームのバリデーションスキーマ
const formSchema = z.object({
  email: z.string().email({
    message: '有効なメールアドレスを入力してください。',
  }),
  password: z.string().min(6, {
    message: 'パスワードは6文字以上である必要があります。',
  }),
  rememberMe: z.boolean().default(false),
});

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // フォームの初期化
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  // ソーシャルログイン処理
  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (err: any) {
      setError(err.message || 'ソーシャルログインに失敗しました。もう一度お試しください。');
      console.error(`${provider} login error:`, err);
      setIsLoading(false);
    }
  };

  // フォーム送信処理
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setError('');

    try {
      // Supabaseを使用してログイン
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        throw error;
      }

      // ログイン成功
      console.log('ログイン成功:', data);
      
      // ログイン状態を保持する場合の設定
      if (values.rememberMe) {
        // Supabaseのセッションは自動的に保持されるため、
        // 追加の設定は必要ありません
        localStorage.setItem('rememberMe', 'true');
      }
      
      // ルートページ（ダッシュボード）にリダイレクト
      router.push('/');
      
    } catch (err: any) {
      // エラーメッセージの設定
      if (err.message) {
        setError(err.message);
      } else {
        setError('メールアドレスまたはパスワードが正しくありません。');
      }
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // アニメーション設定
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="w-full max-w-md"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Card className="border-none shadow-xl bg-white dark:bg-gray-800">
        <CardHeader className="space-y-1">
          <motion.div variants={itemVariants}>
            <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-white drop-shadow-sm">ログイン</CardTitle>
          </motion.div>
          <motion.div variants={itemVariants}>
            <CardDescription className="text-center text-gray-600 dark:text-gray-300">
              アカウント情報を入力してください
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3 text-sm text-red-700 bg-red-100 rounded-lg shadow-sm"
              role="alert"
            >
              {error}
            </motion.div>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-200 font-medium">メールアドレス</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Icons.mail className="h-5 w-5 text-gray-400" />
                          </div>
                          <Input 
                            placeholder="your@email.com" 
                            type="email" 
                            autoComplete="email"
                            className="pl-10 shadow-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-600 dark:text-red-400" />
                    </FormItem>
                  )}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-200 font-medium">パスワード</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Icons.lock className="h-5 w-5 text-gray-400" />
                          </div>
                          <Input 
                            placeholder="••••••••" 
                            type="password" 
                            autoComplete="current-password"
                            className="pl-10 shadow-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-600 dark:text-red-400" />
                    </FormItem>
                  )}
                />
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange}
                          className="border-gray-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal text-gray-700 dark:text-gray-300">ログイン状態を保持する</FormLabel>
                    </FormItem>
                  )}
                />
                <Button variant="link" className="p-0 h-auto text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                  パスワードをお忘れですか？
                </Button>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Button 
                  type="submit" 
                  className="w-full shadow-md hover:shadow-lg transition-shadow bg-blue-600 hover:bg-blue-700 text-white font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      ログイン中...
                    </>
                  ) : (
                    'ログイン'
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>
          
          <motion.div variants={itemVariants} className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                または
              </span>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              type="button" 
              className="w-full shadow-sm hover:shadow-md transition-shadow text-gray-700 dark:text-gray-200 border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50"
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
            >
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button 
              variant="outline" 
              type="button" 
              className="w-full shadow-sm hover:shadow-md transition-shadow text-gray-700 dark:text-gray-200 border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50"
              onClick={() => handleSocialLogin('github')}
              disabled={isLoading}
            >
              <Icons.gitHub className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </motion.div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <motion.p variants={itemVariants} className="text-sm text-gray-600 dark:text-gray-300">
            アカウントをお持ちでない場合は
            <Link href="/register">
              <Button variant="link" className="p-0 h-auto text-sm ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                新規登録
              </Button>
            </Link>
          </motion.p>
        </CardFooter>
      </Card>
    </motion.div>
  );
} 