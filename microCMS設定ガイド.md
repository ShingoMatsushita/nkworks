# microCMS 設定ガイド

このガイドでは、直樹バイクWebサイト用のmicroCMS設定手順を説明します。

## 目次

1. [アカウント作成](#1-アカウント作成)
2. [サービスの作成](#2-サービスの作成)
3. [APIの作成](#3-apiの作成)
4. [環境変数の設定](#4-環境変数の設定)
5. [コンテンツの登録](#5-コンテンツの登録)

---

## 1. アカウント作成

1. [microCMS公式サイト](https://microcms.io/)にアクセス
2. 「無料で始める」をクリック
3. メールアドレスで登録
4. メール認証を完了

---

## 2. サービスの作成

1. ダッシュボードから「サービスを作成」をクリック
2. サービス情報を入力
  - サービス名: `naoki-bike` (任意)
  - サービスID: `naoki-bike` (これが `MICROCMS_SERVICE_DOMAIN` になります)
3. 「作成する」をクリック

---

## 3. APIの作成

### 3.1 ブログAPI（blog）

1. 「APIを作成」をクリック
2. API情報を入力
  - API名: `ブログ`
  - エンドポイント: `blog`
  - API型: `リスト形式`
3. スキーマを設定


| フィールドID       | 表示名     | 種類        | 必須  | 説明       |
| ------------- | ------- | --------- | --- | -------- |
| `title`       | タイトル    | テキストフィールド | ✓   | 記事のタイトル  |
| `content`     | 本文      | リッチエディタ   | ✓   | 記事の本文    |
| `thumbnail`   | サムネイル画像 | 画像        | ✓   | 一覧表示用の画像 |
| `category`    | カテゴリー   | セレクトフィールド | ✓   | 記事のカテゴリー |
| `publishedAt` | 公開日     | 日時        | ✓   | 記事の公開日時  |


**カテゴリーの選択肢**:

- お知らせ
- イベント
- メンテナンス情報
- コラム

1. 「作成」をクリック

### 3.2 ギャラリーAPI（gallery）

1. 「APIを作成」をクリック
2. API情報を入力
  - API名: `実績ギャラリー`
  - エンドポイント: `gallery`
  - API型: `リスト形式`
3. スキーマを設定


| フィールドID       | 表示名      | 種類        | 必須  | 説明         |
| ------------- | -------- | --------- | --- | ---------- |
| `title`       | タイトル     | テキストフィールド | ✓   | 実績のタイトル    |
| `description` | 説明       | テキストエリア   | ✓   | 実績の説明      |
| `images`      | 画像       | 複数画像      | ✓   | 実績の画像（複数枚） |
| `category`    | カテゴリー    | セレクトフィールド | ✓   | 実績のカテゴリー   |
| `beforeImage` | Before画像 | 画像        | ✗   | カスタム前の画像   |
| `afterImage`  | After画像  | 画像        | ✗   | カスタム後の画像   |
| `publishedAt` | 公開日      | 日時        | ✓   | 公開日時       |


**カテゴリーの選択肢**:

- 修理
- カスタム
- 販売車両

1. 「作成」をクリック

---

## 4. 環境変数の設定

### 4.1 APIキーの取得

1. microCMSダッシュボードで「サービス設定」をクリック
2. 「API キー」タブを開く
3. 「新しいAPIキーを発行」をクリック
4. APIキー名を入力（例: `本番環境用`）
5. 権限を選択:
  - 「取得」のみにチェック（推奨）
6. 「発行する」をクリック
7. 表示されたAPIキーをコピー

### 4.2 .env.localファイルの更新

プロジェクトルートの `.env.local` ファイルを編集:

```env
# microCMS API Keys
MICROCMS_SERVICE_DOMAIN=naoki-bike  # ← あなたのサービスIDに変更
MICROCMS_API_KEY=ここにAPIキーを貼り付け  # ← 取得したAPIキーに変更

# Resend API Key (for contact form)
RESEND_API_KEY=your-resend-api-key

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4.3 設定の確認

開発サーバーを再起動:

```bash
npm run dev
```

ブラウザで確認:

- [http://localhost:3000/blog](http://localhost:3000/blog)
- [http://localhost:3000/gallery](http://localhost:3000/gallery)

---

## 5. コンテンツの登録

### 5.1 ブログ記事の作成

1. microCMSダッシュボードで「ブログ」APIを開く
2. 「コンテンツを追加」をクリック
3. 各フィールドを入力:
  - **タイトル**: 例）「新着バイク入荷のお知らせ」
  - **本文**: リッチエディタで記事内容を入力
  - **サムネイル画像**: 画像をアップロード
  - **カテゴリー**: 選択肢から選ぶ
  - **公開日**: 日付と時刻を設定
4. 「公開」をクリック

**サンプル記事を3〜5件作成することをおすすめします**

### 5.2 ギャラリーの作成

1. microCMSダッシュボードで「実績ギャラリー」APIを開く
2. 「コンテンツを追加」をクリック
3. 各フィールドを入力:
  - **タイトル**: 例）「CB400SF カスタムペイント」
  - **説明**: 作業内容の詳細
  - **画像**: 実績の画像を複数枚アップロード
  - **カテゴリー**: 「カスタム」などを選択
  - **Before/After画像**: カスタム前後の画像（任意）
  - **公開日**: 日付と時刻を設定
4. 「公開」をクリック

**サンプルギャラリーを6〜10件作成することをおすすめします**

---

## 6. トラブルシューティング

### エラー: `MICROCMS_SERVICE_DOMAIN is required`

**原因**: 環境変数が正しく設定されていない

**解決策**:

1. `.env.local` ファイルが存在するか確認
2. ファイル名が `.env.local` であることを確認（`.env`ではない）
3. 開発サーバーを再起動

### 画像が表示されない

**原因**: 画像の最適化設定が必要

**解決策**:
`next.config.ts` に以下を追加:

```typescript
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
      },
    ],
  },
};
```

### API呼び出しエラー

**原因**: APIキーの権限不足

**解決策**:

1. microCMSで「サービス設定」→「API キー」を開く
2. 使用しているAPIキーの権限を確認
3. 「取得」権限が有効になっているか確認

---

## 7. 次のステップ

### 本番環境での設定

1. Vercelにデプロイ後、環境変数を設定:
  - `MICROCMS_SERVICE_DOMAIN`
  - `MICROCMS_API_KEY`
2. 本番用のAPIキーを新規発行することを推奨:
  - microCMSで「本番環境用」というAPIキーを発行
  - Vercelの環境変数に設定

### コンテンツの下書き機能

microCMSの「下書き」機能を使うと、公開前にプレビューできます:

1. コンテンツ作成時に「下書き保存」を選択
2. プレビューURLでコンテンツを確認
3. 問題なければ「公開」をクリック

---

## 8. 参考リンク

- [microCMS 公式ドキュメント](https://document.microcms.io/)
- [Next.js との連携](https://document.microcms.io/tutorial/nextjs/nextjs-top)
- [画像の最適化](https://document.microcms.io/manual/media-optimization)
- [APIリファレンス](https://document.microcms.io/content-api/get-list-contents)

---

## サポート

問題が解決しない場合:

1. [microCMS サポート](https://help.microcms.io/)にお問い合わせ
2. [microCMS コミュニティ](https://microcms.io/community)で質問

---

**作成日**: 2026-04-05
**バージョン**: 1.0