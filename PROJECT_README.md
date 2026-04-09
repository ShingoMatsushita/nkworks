# 直樹バイク 公式Webサイト

バイク修理・中古車販売業務の情報発信および顧客とのコミュニケーション促進を目的としたWebサイトプロジェクト

---

## 🎉 プロジェクトの状態

### ✅ 完成した機能

1. **プロジェクト基盤**
   - Next.js 14+ (App Router) プロジェクトセットアップ
   - TypeScript設定
   - Tailwind CSS設定（スポーティなカラーパレット）
   - Noto Sans JP フォント適用

2. **共通コンポーネント**
   - Header（レスポンシブナビゲーション）
   - Footer（SNSリンク付き）
   - Button（3種類のバリエーション）
   - Link（内部・外部リンク対応）

3. **ページ**
   - ✅ トップページ（Hero、サービス紹介、お知らせ、ギャラリー）
   - ✅ 会社案内ページ
   - ✅ サービス紹介ページ
   - ✅ ブログ・お知らせページ
   - ✅ 実績ギャラリーページ

4. **microCMS連携**
   - クライアント設定
   - 型定義（Blog, Gallery）
   - API関数（getBlogPosts, getGalleryItems など）

5. **ドキュメント**
   - 要件定義書
   - Claude Code使い方ガイド
   - microCMS設定ガイド

6. **Claude Code機能**
   - カスタムスキル（react-component, microcms-integration）
   - カスタムコマンド（setup-project, create-page, check-requirements, review-code）

---

## 🚀 クイックスタート

### 1. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開いてください。

### 2. microCMSの設定

[microCMS設定ガイド.md](./microCMS設定ガイド.md) を参照して、以下を設定:

1. microCMSアカウント作成
2. ブログAPI・ギャラリーAPIの作成
3. `.env.local` に APIキーを設定

### 3. コンテンツの追加

microCMSでブログ記事とギャラリーを追加すると、自動的にサイトに反映されます。

---

## 📁 プロジェクト構造

```
直樹バイクHP/
├── .claude/                    # Claude Code 設定
│   ├── skills/                # カスタムスキル
│   └── commands/              # カスタムコマンド
├── src/
│   ├── app/                   # Next.js Pages
│   │   ├── page.tsx          # トップページ
│   │   ├── about/            # 会社案内
│   │   ├── services/         # サービス紹介
│   │   ├── gallery/          # 実績ギャラリー
│   │   ├── blog/             # ブログ・お知らせ
│   │   └── layout.tsx        # 共通レイアウト
│   ├── components/           # コンポーネント
│   │   ├── common/          # Button, Link
│   │   ├── layout/          # Header, Footer
│   │   └── features/        # HeroSection
│   ├── lib/                  # ライブラリ
│   │   ├── microcms.ts      # microCMS クライアント
│   │   └── api/             # API関数
│   └── types/                # TypeScript 型定義
├── public/                    # 静的ファイル
├── 要件定義書.md
├── Claude_Code使い方ガイド.md
└── microCMS設定ガイド.md
```

---

## 🛠️ 技術スタック

| カテゴリー | 技術 |
|-----------|------|
| **フレームワーク** | Next.js 14+ (App Router) |
| **言語** | TypeScript |
| **スタイリング** | Tailwind CSS |
| **CMS** | microCMS |
| **フォント** | Noto Sans JP |
| **デプロイ** | Vercel（予定） |

---

## 🎨 デザイン

### カラーパレット

- **プライマリ**: `#dc2626` (Red-600)
- **セカンダリ**: `#1f2937` (Gray-800)
- **アクセント**: `#f3f4f6` (Gray-100)

### フォント

- **日本語**: Noto Sans JP
- **ウェイト**: 400, 500, 700, 900

---

## 📝 次のステップ

### すぐにできること

1. **microCMS設定**
   - [microCMS設定ガイド.md](./microCMS設定ガイド.md)を参照
   - ブログとギャラリーのコンテンツを追加

2. **画像の追加**
   - `public/images/` に画像を配置
   - 会社ロゴ、バイクの写真などを追加

3. **会社情報の更新**
   - `src/app/about/page.tsx` で会社情報を実際の内容に更新
   - 住所、電話番号、営業時間などを変更

### 今後の実装予定

- [ ] お問い合わせフォーム（Resend連携）
- [ ] Google Map埋め込み
- [ ] ブログ詳細ページ
- [ ] ギャラリー詳細ページ（ライトボックス機能）
- [ ] SEO最適化（sitemap.xml, robots.txt）
- [ ] OGP設定
- [ ] パフォーマンス最適化

---

## 🚢 デプロイ

### Vercelへのデプロイ手順

1. GitHubにリポジトリをプッシュ
2. [Vercel](https://vercel.com/)でリポジトリをインポート
3. 環境変数を設定:
   - `MICROCMS_SERVICE_DOMAIN`
   - `MICROCMS_API_KEY`
4. デプロイ実行

詳細は[要件定義書.md](./要件定義書.md)の「フェーズ5: デプロイ・公開」を参照

---

## 📚 ドキュメント

| ドキュメント | 説明 |
|-------------|------|
| [要件定義書.md](./要件定義書.md) | プロジェクトの詳細な要件と仕様 |
| [Claude_Code使い方ガイド.md](./Claude_Code使い方ガイド.md) | Claude Code機能の使い方 |
| [microCMS設定ガイド.md](./microCMS設定ガイド.md) | microCMSのセットアップ手順 |

---

## 🤝 開発ガイドライン

### コーディング規約

- TypeScriptを使用
- コンポーネントは名前付きexport
- Tailwind CSSを優先的に使用
- Server ComponentとClient Componentを適切に使い分け

### ブランチ戦略

- `main`: 本番環境
- `develop`: 開発環境
- 機能追加時は feature ブランチを作成

---

## 💡 Claude Code機能の活用

### カスタムコマンド

```bash
/setup-project    # プロジェクトセットアップ
/create-page      # 新しいページ作成
/check-requirements # 要件確認
/review-code      # コードレビュー
```

### カスタムスキル

```
スキル: react-component
タスク: Buttonコンポーネントを作成してください
```

詳細は [Claude_Code使い方ガイド.md](./Claude_Code使い方ガイド.md) を参照

---

## 🎯 パフォーマンス目標

- **ページ読み込み時間**: 3秒以内
- **Lighthouse スコア**: 90点以上
- **Core Web Vitals**: すべて「良好」

---

## 📞 サポート

プロジェクトに関する質問は、開発チームまでお問い合わせください。

---

**プロジェクト作成日**: 2026-04-05
**バージョン**: 1.0
**開発者**: Claude Code Assistant

🚴‍♂️ **Happy Coding!**
