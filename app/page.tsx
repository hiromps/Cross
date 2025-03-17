"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { Overview } from "@/components/dashboard/overview";
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Supabaseを使用して認証状態をチェックする
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // セッションを取得
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        if (!session) {
          // セッションがない場合はログインページにリダイレクト
          router.push('/login');
          return;
        }
        
        // ユーザー情報を取得
        const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          throw userError;
        }
        
        if (currentUser) {
          setUser(currentUser);
          setIsLoading(false);
        } else {
          // ユーザー情報が取得できない場合はログインページにリダイレクト
          router.push('/login');
        }
      } catch (error) {
        console.error('認証チェックエラー:', error);
        router.push('/login');
      }
    };
    
    checkAuth();
    
    // 認証状態の変更を監視
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setUser(session.user);
          setIsLoading(false);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          router.push('/login');
        }
      }
    );
    
    // クリーンアップ関数
    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} />
        <main className="flex-1 p-6 overflow-auto">
          <Overview />
        </main>
      </div>
    </div>
  );
}