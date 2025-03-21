# Cross

## Supabase 認証の設定

このプロジェクトは [Supabase](https://supabase.io/) を使用してユーザー認証を実装しています。以下の手順に従って設定してください。

### 1. Supabase プロジェクトの作成

1. [Supabase](https://supabase.com/) にアクセスし、アカウントを作成またはログインします。
2. 新しいプロジェクトを作成します。
3. プロジェクトが作成されたら、プロジェクトの設定から以下の情報を取得します：
   - Project URL (`NEXT_PUBLIC_SUPABASE_URL`)
   - API Keys > anon/public (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)

### 2. 環境変数の設定

1. プロジェクトのルートディレクトリに `.env.local` ファイルを作成します（`.env.local.example` をコピーして使用できます）。
2. 以下の環境変数を設定します：

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Supabase データベースの設定

1. Supabase ダッシュボードの「SQL Editor」にアクセスします。
2. 以下のSQLを実行して `profiles` テーブルを作成します：

```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  PRIMARY KEY (id)
);

-- RLSポリシーを設定
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ユーザーは自分のプロフィールのみ参照可能" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "ユーザーは自分のプロフィールのみ更新可能" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "ユーザーは自分のプロフィールのみ作成可能" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

### 4. OAuth プロバイダーの設定（オプション）

Google や GitHub でのログインを有効にするには：

1. Supabase ダッシュボードの「Authentication」>「Providers」にアクセスします。
2. 使用したいプロバイダー（Google、GitHub など）を有効にします。
3. 各プロバイダーの指示に従って、必要なクライアントIDとシークレットを設定します。
4. リダイレクトURLを `https://your-domain.com/auth/callback` に設定します。

## 開発サーバーの起動

```bash
npm run dev
# または
yarn dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて結果を確認します。
# Updated at 03/17/2025 20:39:19
