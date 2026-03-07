export type StampDef = {
  id: string;
  emoji: string;
  label: string;
  category: string;
};

export const STAMP_CATEGORIES = [
  { id: "mood", label: "😊 気分・体調" },
  { id: "habit", label: "🏃 習慣" },
  { id: "food", label: "🍜 食事" },
  { id: "event", label: "🎉 イベント" },
  { id: "weather", label: "🌤 天気・季節" },
  { id: "mark", label: "🔖 マーク" },
];

const RECENT_STAMPS_KEY = "recentStampIds";
const RECENT_STAMPS_MAX = 10;

export function getRecentStampIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_STAMPS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addRecentStampId(id: string): void {
  const recent = getRecentStampIds().filter((r) => r !== id);
  recent.unshift(id);
  localStorage.setItem(
    RECENT_STAMPS_KEY,
    JSON.stringify(recent.slice(0, RECENT_STAMPS_MAX)),
  );
}

export const STAMPS: StampDef[] = [
  // 気分・体調
  { id: "mood_great", emoji: "🥳", label: "ハッピー", category: "mood" },
  { id: "mood_good", emoji: "😊", label: "まあまあ", category: "mood" },
  { id: "mood_normal", emoji: "😐", label: "普通", category: "mood" },
  { id: "mood_bad", emoji: "😞", label: "いまいち", category: "mood" },
  { id: "mood_angry", emoji: "😠", label: "イライラ", category: "mood" },
  { id: "mood_sad", emoji: "😢", label: "悲しい", category: "mood" },
  { id: "mood_relax", emoji: "😌", label: "リラックス", category: "mood" },
  { id: "mood_sick", emoji: "🤒", label: "体調不良", category: "mood" },
  { id: "mood_tired", emoji: "😴", label: "疲労", category: "mood" },

  // 習慣
  { id: "habit_exercise", emoji: "🏃", label: "運動", category: "habit" },
  { id: "habit_study", emoji: "📚", label: "勉強", category: "habit" },
  { id: "habit_reading", emoji: "📖", label: "読書", category: "habit" },
  { id: "habit_work", emoji: "💻", label: "作業", category: "habit" },
  { id: "habit_early", emoji: "🌅", label: "早起き", category: "habit" },
  { id: "habit_sleep", emoji: "😪", label: "早寝", category: "habit" },
  { id: "habit_medicine", emoji: "💊", label: "薬", category: "habit" },
  { id: "habit_goal", emoji: "🎯", label: "目標", category: "habit" },
  { id: "habit_walk", emoji: "🚶", label: "散歩", category: "habit" },
  { id: "habit_stretch", emoji: "🧘", label: "ストレッチ", category: "habit" },
  { id: "habit_training", emoji: "🏋️", label: "筋トレ", category: "habit" },
  { id: "habit_clean", emoji: "🧹", label: "掃除", category: "habit" },
  { id: "habit_shower", emoji: "🚿", label: "シャワー", category: "habit" },
  { id: "habit_bath", emoji: "🛁", label: "お風呂", category: "habit" },
  { id: "habit_diary", emoji: "📝", label: "日記", category: "habit" },

  // 食事
  { id: "food_cooking", emoji: "🍳", label: "自炊", category: "food" },
  { id: "food_restaurant", emoji: "🍽️", label: "外食", category: "food" },
  { id: "food_drinking", emoji: "🍻", label: "飲み会", category: "food" },
  { id: "food_bento", emoji: "🍱", label: "お弁当", category: "food" },
  { id: "food_drink", emoji: "🍺", label: "お酒", category: "food" },
  { id: "food_cafe", emoji: "☕️", label: "カフェ", category: "food" },
  { id: "food_diet", emoji: "🥗", label: "ダイエット", category: "food" },
  { id: "food_sweets", emoji: "🍰", label: "スイーツ", category: "food" },

  // イベント
  { id: "event_anniversary", emoji: "🎂", label: "記念日", category: "event" },
  { id: "event_travel", emoji: "✈️", label: "旅行", category: "event" },
  { id: "event_outing", emoji: "🚗", label: "お出かけ", category: "event" },
  { id: "event_salon", emoji: "💇", label: "美容室", category: "event" },
  { id: "event_nail", emoji: "💅", label: "ネイル", category: "event" },
  { id: "event_friends", emoji: "👥", label: "友達", category: "event" },
  { id: "event_family", emoji: "👪", label: "家族", category: "event" },
  { id: "event_work", emoji: "💼", label: "仕事", category: "event" },
  { id: "event_rest", emoji: "🛋️", label: "宿泊", category: "event" },
  { id: "event_hospital", emoji: "🏥", label: "病院", category: "event" },
  { id: "event_shopping", emoji: "🛍️", label: "買い物", category: "event" },
  { id: "event_entertainment", emoji: "🎬", label: "映画", category: "event" },
  { id: "event_live", emoji: "🎤", label: "ライブ", category: "event" },
  { id: "event_sports", emoji: "⚽", label: "スポーツ観戦", category: "event" },
  { id: "event_game", emoji: "🎮", label: "ゲーム", category: "event" },
  { id: "event_music", emoji: "🎧", label: "音楽", category: "event" },
  { id: "event_art", emoji: "🎨", label: "美術館", category: "event" },
  { id: "event_cafe", emoji: "🍵", label: "カフェ", category: "event" },
  { id: "event_party", emoji: "🥂", label: "パーティー", category: "event" },

  // 天気・季節
  { id: "weather_sunny", emoji: "☀️", label: "晴れ", category: "weather" },
  { id: "weather_cloudy", emoji: "☁️", label: "曇り", category: "weather" },
  { id: "weather_rainy", emoji: "☂️", label: "雨", category: "weather" },
  { id: "weather_thunder", emoji: "⚡️", label: "雷", category: "weather" },
  { id: "weather_snowy", emoji: "❄️", label: "雪", category: "weather" },
  { id: "weather_windy", emoji: "🌬️", label: "風", category: "weather" },
  { id: "weather_rainbow", emoji: "🌈", label: "虹", category: "weather" },
  { id: "weather_hanami", emoji: "🌸", label: "花見", category: "weather" },
  { id: "weather_summer", emoji: "🌊", label: "海", category: "weather" },
  { id: "weather_autumn", emoji: "🍁", label: "紅葉", category: "weather" },
  { id: "weather_winter", emoji: "⛄", label: "冬", category: "weather" },
  { id: "weather_newyear", emoji: "🎍", label: "お正月", category: "weather" },
  {
    id: "weather_hinamatsuri",
    emoji: "🎎",
    label: "ひな祭り",
    category: "weather",
  },
  {
    id: "weather_childrens",
    emoji: "🎏",
    label: "こどもの日",
    category: "weather",
  },
  { id: "weather_fireworks", emoji: "🎆", label: "花火", category: "weather" },
  {
    id: "weather_halloween",
    emoji: "🎃",
    label: "ハロウィン",
    category: "weather",
  },
  {
    id: "weather_christmas",
    emoji: "🎄",
    label: "クリスマス",
    category: "weather",
  },
  { id: "weather_birthday", emoji: "🎂", label: "誕生日", category: "weather" },
  {
    id: "weather_valentine",
    emoji: "💝",
    label: "バレンタイン",
    category: "weather",
  },

  // マーク
  { id: "mark_star", emoji: "⭐", label: "星", category: "mark" },
  { id: "mark_heart", emoji: "❤️", label: "ハート", category: "mark" },
  { id: "mark_moon", emoji: "🌙", label: "月", category: "mark" },
  { id: "mark_sakura", emoji: "🌷", label: "花", category: "mark" },
  { id: "mark_red", emoji: "🔴", label: "赤丸", category: "mark" },
  { id: "mark_yellow", emoji: "🟡", label: "黄丸", category: "mark" },
  { id: "mark_green", emoji: "🟢", label: "緑丸", category: "mark" },
  { id: "mark_deadline", emoji: "⏰", label: "締め切り", category: "mark" },
  { id: "mark_schedule", emoji: "📅", label: "予定", category: "mark" },
  { id: "mark_money", emoji: "💰", label: "支払い", category: "mark" },
  { id: "mark_check", emoji: "✅", label: "チェック", category: "mark" },
  { id: "mark_cross", emoji: "❌", label: "バツ", category: "mark" },
  { id: "mark_ok", emoji: "⭕", label: "丸", category: "mark" },
  { id: "mark_fire", emoji: "🔥", label: "炎", category: "mark" },
  { id: "mark_idea", emoji: "💡", label: "アイデア", category: "mark" },
  { id: "mark_question", emoji: "❓", label: "はてな", category: "mark" },
  { id: "mark_package", emoji: "📦", label: "荷物", category: "mark" },
  { id: "mark_gift", emoji: "🎁", label: "プレゼント", category: "mark" },
  { id: "mark_medal", emoji: "🏅", label: "メダル", category: "mark" },
  { id: "mark_crown", emoji: "👑", label: "王冠", category: "mark" },
  { id: "mark_clover", emoji: "🍀", label: "クローバー", category: "mark" },
  { id: "mark_ribbon", emoji: "🎀", label: "リボン", category: "mark" },
  { id: "mark_memo", emoji: "🗒️", label: "メモ", category: "mark" },
  { id: "mark_pin", emoji: "📍", label: "ピン", category: "mark" },
];
