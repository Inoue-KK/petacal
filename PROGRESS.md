# Petacal カレンダーアプリ開発進捗

## プロジェクト概要
スタンプを貼れるカレンダーアプリ「Petacal」の開発

## 完成した機能

### フェーズ1: 環境構築 ✅
- Next.js + TypeScript プロジェクト作成
- TailwindCSS 導入
- GitHubリポジトリ作成

### フェーズ2: カレンダーUI作成 ✅
- 月表示のカレンダーコンポーネント実装
- 前月・次月への移動機能
- 日付計算処理
- 前後の月の日付を薄く表示（6週固定）
- 今日の日付をハイライト表示

### フェーズ3: スタンプ機能 ✅
- スタンプの種類定義（絵文字）
- 日付クリックでモーダル表示
- スタンプ選択・貼り付け機能
- 4枚制限（グレーアウト）
- 重複スタンプ選択不可
- スタンプクリックで削除
- ローカルストレージに保存

### UI/UX改善 ✅
- モダンなデザイン実装
  - すりガラス効果のモーダル
  - ホバーエフェクト
  - 影とボーダーで立体感
- レスポンシブデザイン対応
  - スマホ・PC両対応
  - スタンプの2列表示

### テーマシステム ✅
- 4種類のカラーテーマ実装
  - Turquoise（ターコイズ）
  - Ocean（オーシャン）
  - Coral（コーラル）
  - Lavender（ラベンダー）
- テーマ選択ドロップダウン
- localStorageでテーマ保存
- 全コンポーネントに動的カラー適用

### フェーズ3.5: 詳細モーダルへのリニューアル ✅
- 日付クリック → 詳細モーダル表示（スタンプ一覧・コメント・追加・削除をまとめて管理）
- 貼られているスタンプを一覧表示
  - 各スタンプにコメント入力欄（個別）
  - 各スタンプに削除ボタン
- 「スタンプを追加」ボタン → スタンプ選択パネルを展開表示
- スタンプ上限は引き続き4枚
- `StampPicker.tsx` → `DayDetailModal.tsx` にリネーム＆拡張
- `StampType` に `comment` フィールド追加

### バグ修正・細かい改善 ✅
- カテゴリータブをマウスホイールで横スクロール可能に
- スタンプグリッドの高さを固定してカテゴリー切り替え時のガタつきを解消

---

## 進行中 / 次のステップ

### フェーズ3.6: SVGスタンプへの刷新 ⏸️ 保留
> 絵文字からオリジナルSVGデザインのスタンプに変更する（SVG素材の準備が大変なため一旦保留）

#### 調達方針
- AIによるSVG生成を基本とする（著作権フリー・オリジナル）
- 品質が不十分な場合は液タブで自作も検討

#### スタンプ一覧（全26種）

| カテゴリ | スタンプ名 | ID |
|---|---|---|
| 😊 気分・体調 | 最高の気分 | mood_great |
| 😊 気分・体調 | 良い気分 | mood_good |
| 😊 気分・体調 | 普通 | mood_normal |
| 😊 気分・体調 | 気分が悪い | mood_bad |
| 😊 気分・体調 | 体調不良 | mood_sick |
| 😊 気分・体調 | 疲れた | mood_tired |
| 🏃 習慣トラッキング | 運動した | habit_exercise |
| 🏃 習慣トラッキング | 勉強した | habit_study |
| 🏃 習慣トラッキング | 読書した | habit_reading |
| 🏃 習慣トラッキング | 早起きできた | habit_early |
| 🏃 習慣トラッキング | よく眠れた | habit_sleep |
| 🏃 習慣トラッキング | 目標達成 | habit_goal |
| 🍜 食事 | 美味しいもの食べた | food_yummy |
| 🍜 食事 | 自炊した | food_cooking |
| 🍜 食事 | 外食した | food_restaurant |
| 🍜 食事 | お酒を飲んだ | food_drink |
| 🍜 食事 | カフェに行った | food_cafe |
| 🎉 イベント | 記念日 | event_anniversary |
| 🎉 イベント | お出かけ | event_outing |
| 🎉 イベント | 友達と会った | event_friends |
| 🎉 イベント | 仕事頑張った | event_work |
| 🎉 イベント | ゆっくり休んだ | event_rest |
| 🌤 天気・その他 | 晴れ | weather_sunny |
| 🌤 天気・その他 | 雨 | weather_rainy |
| 🌤 天気・その他 | 雪 | weather_snowy |
| 🌤 天気・その他 | 特別な日 | weather_special |

#### SVGデザイン方針
- シンプル・フラットアイコン ＋ かわいい系（動物・食べ物）を混在
- カラーはテーマカラーに合わせて動的に変化させることも検討
- `public/stamps/` ディレクトリにSVGファイルを配置

---

### フェーズ4: Supabase導入（DB管理） ✅
- Supabaseプロジェクト作成・設定
- DBテーブル設計・作成（day_data, stamps）
- RLSポリシー設定（ユーザーごとのデータ分離）
- Google OAuth認証実装
- ログアウト機能（テーマカラー追従）
- localStorageからSupabaseへ移行
- カスタムフック（useCalendarData）にデータロジックを切り出し

### UI/UX改善②  ✅
- 表示月をURLクエリパラメータに保持（リロード対策）
- 月移動時にURL更新
- 年月クリックでYearMonthPickerポップアップ表示
- ポップアップ内で年単位移動・月選択・今月ボタン
- ログイン画面を全面リデザイン
- 絵文字が3D軌道でぐるぐる回るアニメーション
- シャボン玉・キラキラ粒子・グラスモーフィズムカード
- レインボーボーダーアニメーション
- Shrikhandフォント導入

 ### データベース設計改善 ✅
- `stamps`テーブルから`emoji`, `label`カラムを削除
- 表示時はアプリ側のマスターデータ（`stamps.ts`）からルックアップする方式に変更
- スタンプ定義変更時の古いデータ残留を防止
- インデックス追加（`stamps.day_data_id`, `day_data.user_id`）
- スタンプ全削除時に`day_data`の孤立レコードを自動削除

### セキュリティ改善 ✅
- コメントをAES-GCM（Web Crypto API）で暗号化してDBに保存
- 鍵はユーザーIDからPBKDF2で派生（ランダムソルト使用）
- オーナーがDBを直接参照しても平文では読めない
- 暗号化前データとの後方互換性あり（復号失敗時は平文にフォールバック） 
- セキュリティヘッダーを追加（X-Frame-Options, X-Content-Type-Options, Referrer-Policy, HSTS, Permissions-Policy）
- `X-Powered-By` ヘッダーを削除
- `console.error` を開発環境のみに制限
- Supabase RLSポリシーで全操作（SELECT/INSERT/UPDATE/DELETE）を保護

### バグ修正・細かい改善② ✅
- Supabaseクライアントを `useMemo` でメモ化
- `deleteStamp` の `count` nullチェック修正（`(count ?? 1) === 0`）

### ファビコン追加 ✅
- `app/icon.svg`（Safari・Firefox用）
- `app/icon.png`（Chrome用・512×512）

### UI/UX改善③ ✅
- コメント保存をdebounce化（500ms）、保存ステータス表示
- `StampComment` を `DayDetailModal.tsx` 内の独立コンポーネントに切り出し

### フェーズ5: Vercelへデプロイ ✅

#### デプロイ前
- [x] Vercel の環境変数に `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` のみ設定（`service_role` キーが混入しないよう注意）
- [x] Supabase の Redirect URLs に本番の Vercel URL を追加

#### デプロイ後
- [x] Supabase の Redirect URLs から localhost を削除
- [x] securityheaders.com で本番 URL をスキャンしてヘッダーが効いてるか確認
- [x] ログイン・スタンプ追加・コメント保存の動作確認

### 追加機能（将来）
- [ ] カスタムスタンプ（ユーザーが自分でアップロード）

---

## 技術スタック
- **フレームワーク**: Next.js 15
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v4
- **状態管理**: React Context API
- **データ保存**: Supabase（PostgreSQL）
- **認証**: Supabase Auth（Google OAuth）

## ファイル構成（フェーズ3.5〜3.6完了後）
```
petacal/
├── app/
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts         # OAuth コールバック処理
│   ├── components/
│   │   ├── Calendar/
│   │   │   ├── Calendar.tsx
│   │   │   ├── CalendarDay.tsx
│   │   │   └── YearMonthPicker.tsx  # 年月選択ポップアップ
│   │   ├── Stamp/
│   │   │   ├── DayDetailModal.tsx   # StampPicker.tsx から刷新
│   │   └── ThemeSelector.tsx
│   ├── context/
│   │   └── ThemeContext.tsx
│   ├── hooks/
│   │   └── useCalendarData.ts   # Supabaseデータ管理カスタムフック
│   ├── types/
│   │   └── index.ts                 # StampType に comment 追加
│   ├── utils/
│   │   ├── crypto.ts                # AES-GCMコメント暗号化
│   │   ├── date.ts
│   │   ├── stamps.ts                # SVGスタンプ定義に変更
│   │   └── themes.ts
│   ├── globals.css
│   ├── icon.png
│   ├── icon.svg
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── stamps/                      # SVGファイル置き場（新規）
│       ├── mood_great.svg
│       ├── mood_good.svg
│       └── ...
├── package.json
└── tsconfig.json
```

## 主要な型定義（最新）
```typescript
// スタンプ
export type StampType = {
  id: string;
  emoji: string; // 絵文字（SVG刷新時にsvgPathに変更予定）
  label: string;
  comment: string; // スタンプごとの個別コメント
}

// カレンダーセル
export type CalendarCell = {
  day: number;
  isCurrentMonth: boolean;
  isPrevMonth: boolean;
  isNextMonth: boolean;
};

// 日データ
export type DayData = {
  date: string;
  stamps: StampType[];
}

// カレンダーデータ
export type CalendarData = {
  [date: string]: DayData;
}
```

## 学習ポイント
- Reactの基本（useState, useEffect, useContext）
- propsの受け渡し
- イベントハンドリング（onClick, onMouseEnter/Leave）
- Tailwind CSSの使い方
- レスポンシブデザイン
- ローカルストレージ
- Context APIでの状態管理
- 動的スタイリング

## コミット履歴の主要なマイルストーン
- `feat: implement stamp selection functionality`
- `feat: persist calendar data to localStorage`
- `style: modernize calendar and modal UI`
- `feat: add responsive design and increase stamp limit to 4`
- `feat: display adjacent month dates in calendar grid`
- `feat: highlight current date on calendar`
- `feat: implement theme switching system with 4 color schemes`
- `feat: renew stamp picker to day detail modal with comment feature`
- `fix: enable horizontal scroll with mouse wheel on category tabs`
- `fix: stabilize modal height by fixing stamp grid height`
- `feat: add Supabase auth with Google OAuth`
- `feat: add logout button`
- `feat: migrate calendar data from localStorage to Supabase`
- `feat: update URL on month navigation`
- `feat: add year-month picker`
- `style: redesign login page`
- `feat: remove redundant emoji/label columns from stamps table`
- `feat: encrypt comment with AES-GCM using Web Crypto API`
- `fix: delete orphaned day_data when last stamp is removed`
- `fix: memoize supabase client and fix nullable count check`
- `feat: add favicon`
- `feat: debounce comment save and show save status`
- `feat: use random salt in PBKDF2 key derivation`
- `feat: add security headers and remove X-Powered-By`
- `fix: improve useCalendarData with useCallback, type safety`
- `fix: resolve ESLint errors and warnings across components`
