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

---

## 進行中 / 次のステップ

### フェーズ3.5: 詳細モーダルへのリニューアル 🔧
> 既存のスタンプポップアップを、コメント記入も可能な詳細画面に刷新する

#### 仕様変更内容
- **変更前**: 日付クリック → スタンプ選択ポップアップ → 貼り付け / スタンプクリックで削除
- **変更後**: 日付クリック → 詳細モーダル表示（スタンプ一覧・コメント・追加・削除をまとめて管理）

#### 詳細モーダルの仕様
- 選択中の日付を表示
- 貼られているスタンプを一覧表示
  - 各スタンプにコメント入力欄（個別）
  - 各スタンプに削除ボタン
- 「スタンプを追加」ボタン → スタンプ選択パネルを展開表示
- スタンプ上限は引き続き4枚

#### 対応ファイル・変更内容
- `app/components/Stamp/StampPicker.tsx` → `DayDetailModal.tsx` にリネーム＆拡張
- `app/types/index.ts` の型定義を更新

#### 型定義の変更
```typescript
// スタンプ（変更後）
export type StampType = {
  id: string;
  svgPath: string; // emoji → SVGに変更
  label: string;
  comment: string; // コメントを追加
}

// 日データ（変更なし）
export type DayData = {
  date: string;
  stamps: StampType[];
}
```

---

### フェーズ3.6: SVGスタンプへの刷新 🎨
> 絵文字からオリジナルSVGデザインのスタンプに変更する

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

### フェーズ4: Supabase導入（DB管理） 📋
- ユーザー認証
- カレンダーデータのクラウド保存
- localStorageからの移行

### フェーズ5: Vercelへデプロイ 📋

### 追加機能（将来）
- [ ] カスタムスタンプ（ユーザーが自分でアップロード）
- [ ] データエクスポート
- [ ] スタンプ統計・振り返り機能

---

## 技術スタック
- **フレームワーク**: Next.js 15
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v4
- **状態管理**: React Context API
- **データ保存**: localStorage（→ 将来的にSupabase）

## ファイル構成（フェーズ3.5〜3.6完了後）
```
petacal/
├── app/
│   ├── components/
│   │   ├── Calendar/
│   │   │   ├── Calendar.tsx
│   │   │   └── CalendarDay.tsx
│   │   ├── Stamp/
│   │   │   ├── DayDetailModal.tsx   # StampPicker.tsx から刷新
│   │   │   └── StampSelector.tsx    # スタンプ選択パネル（新規）
│   │   └── ThemeSelector.tsx
│   ├── context/
│   │   └── ThemeContext.tsx
│   ├── types/
│   │   └── index.ts                 # StampType に comment 追加
│   ├── utils/
│   │   ├── date.ts
│   │   ├── stamps.ts                # SVGスタンプ定義に変更
│   │   └── themes.ts
│   ├── globals.css
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
  svgPath: string; // SVGファイルパス or SVGコンポーネント
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