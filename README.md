# ポケモンクイズ

[PokeAPI](https://pokeapi.co/) を使った、小学生向けのポケモンシルエットクイズ。

## モード

- **📘 ふつうモード**: 全 10 問。最後に正解数を表示
- **🏆 ランキングモード**: 1 問 5 秒の制限時間、出題数は無制限。間違いまたは時間切れでゲームオーバー → スコアをランキングに登録

## フィルター

- **せだい・ちほう**: カントー〜パルデア（複数選択可）
- **タイプ**: 全 18 タイプ（複数選択可）
- 何も選ばないとすべてのポケモン（1〜1025）が対象

## ランキングのデータ保存

デフォルトでは `localStorage` に保存され、ブラウザごとのローカルランキングになります。
オンラインで共有したい場合は Firebase Firestore を使います:

1. [Firebase コンソール](https://console.firebase.google.com/) でプロジェクトを作成
2. Firestore Database を有効化（テストモードで開始可）
3. プロジェクト設定 → 「アプリを追加」→ ウェブアプリを登録
4. 表示された設定値を `firebase-config.js` の `window.FIREBASE_CONFIG` に貼り付け

`apiKey` が空のままなら自動的に localStorage モードで動きます。

### Firestore セキュリティルール例

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /rankings/{doc} {
      allow read: if true;
      allow create: if request.resource.data.score is number
                    && request.resource.data.score >= 0
                    && request.resource.data.score <= 5000
                    && request.resource.data.name is string
                    && request.resource.data.name.size() > 0
                    && request.resource.data.name.size() <= 20;
      allow update, delete: if false;
    }
  }
}
```

### 保存されるデータ

`rankings` コレクションに以下のドキュメントが追加されます:

| フィールド    | 型           | 内容 |
|---------------|--------------|------|
| `name`        | string       | プレイヤー名（最大 10 文字） |
| `score`       | number       | 正解数 |
| `mode`        | string       | `"ranking"` |
| `gens`        | array<int>   | 選択世代の ID 配列（空 = 全世代） |
| `types`       | array<str>   | 選択タイプの ID 配列（空 = 全タイプ） |
| `createdAt`   | timestamp    | サーバ時刻 |

## ローカルで動かす

`index.html` をブラウザで直接開いて遊べます。
Firestore モードでテストしたい場合は、ES Module の読み込み制限のためローカルサーバ経由で開いてください:

```
python -m http.server 8000
```

そのあと http://localhost:8000/ にアクセス。

## 公開

GitHub Pages にそのまま公開可能（追加ビルド不要）。
