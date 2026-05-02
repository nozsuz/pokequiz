// オンラインで共有するランキングを使う場合は、Firebase コンソールで取得した
// 設定値を下記に入れてください（apiKey が空のままなら localStorage に
// 保存される、ブラウザごとのローカルランキングになります）。
//
// 1. https://console.firebase.google.com/ でプロジェクトを作成
// 2. Firestore Database を有効化（テストモードで開始可）
// 3. プロジェクト設定 → 「アプリを追加」→ ウェブアプリ
// 4. 表示された firebaseConfig の値をここにコピー
window.FIREBASE_CONFIG = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
