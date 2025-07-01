# Floating UI React Demo

このプロジェクトは、Floating UIライブラリのReact実装のデモンストレーションです。フォルダ1から8まで、それぞれ異なるFloating UIの機能や実装例を含んでいます。

## プロジェクト構成

- `1/` - 基本的なFloating UIの実装
- `2/` - ポジショニングオプション
- `3/` - インタラクション機能
- `4/` - アニメーション効果
- `5/` - 高度なカスタマイズ
- `5a/` - バリエーション A
- `5b/` - バリエーション B
- `6/` - 複雑なレイアウト
- `6a/` - レイアウト応用
- `7/` - 実用的な実装例
- `8/` - 完全なコンポーネント

## 開発環境での実行

各デモを個別に実行する場合：

```bash
cd [フォルダ番号]
npm install
npm run dev
```

## GitHub Pagesでの公開

このプロジェクトはGitHub Actionsを使って自動的にGitHub Pagesにデプロイされます。

### セットアップ手順

1. GitHubリポジトリでSettings > Pagesに移動
2. Sourceを "GitHub Actions" に設定
3. メインブランチにpushすると自動的にビルド・デプロイが実行されます

### デプロイ仕様

- 各プロジェクト（1-8）は並列でビルドされ、高速にデプロイされます
- ビルド成果物は `/[フォルダ名]/` のパスで配信されます
- ルートページには全デモへのリンクが表示されます
- `dist` フォルダは `.gitignore` により除外され、GitHub Actionsでのみ生成されます
- Node.jsのnode_modulesキャッシュにより、ビルド時間を短縮

### GitHub Actions ワークフロー

`.github/workflows/deploy.yml` に定義されたワークフローが：

1. 依存関係を並列でインストール
2. 各プロジェクトを並列でビルド（高速化）
3. ビルド成果物を統合
4. GitHub Pagesにデプロイ

の処理を自動実行します。

## 技術スタック

- React 19
- TypeScript
- Vite
- Floating UI
- GitHub Actions
- GitHub Pages

## トラブルシューティング

### ローカル開発でのビルドエラー

もしローカルでビルドエラーが発生した場合：

```bash
# package-lock.jsonを更新
cd [プロジェクトフォルダ]
npm install

# ビルドを実行
npm run build
```

### GitHub Actionsでのビルドエラー

- デプロイが失敗した場合は、Actionsタブでエラーログを確認
- package.jsonとpackage-lock.jsonの同期が必要な場合は、上記のローカル修正後にコミット・プッシュ
