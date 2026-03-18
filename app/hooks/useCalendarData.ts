import { CalendarData, StampType } from "../types";
import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase";
import { getDaysInMonth } from "../utils/date";

export const useCalendarData = (
  userId: string,
  year: number,
  month: number,
) => {
  const [calendarData, setCalendarData] = useState<CalendarData>({});
  const [syncing, setSyncing] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    fetchMonthData();
  }, [userId, year, month]);

  const fetchMonthData = async () => {
    const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
    const endDate = `${year}-${String(month).padStart(2, "0")}-${String(getDaysInMonth(year, month)).padStart(2, "0")}`;

    const { data: dayDataList, error } = await supabase
      .from("day_data")
      .select("id, date, stamps(*)")
      .eq("user_id", userId)
      .gte("date", startDate)
      .lte("date", endDate);

    if (error) {
      console.error("fetch error:", JSON.stringify(error));
      return;
    }

    const newData: CalendarData = {};
    for (const d of dayDataList ?? []) {
      const stamps = (d.stamps as any[]).map((s) => ({
        id: s.stamp_id,
        emoji: s.emoji,
        label: s.label,
        comment: s.comment,
      }));

      const [y, m, day] = d.date.split("-");
      const key = `${parseInt(y)}-${parseInt(m)}-${parseInt(day)}`;
      newData[key] = { date: key, stamps };
    }
    setCalendarData(newData);
  };

  const addStamp = async (date: string, stamp: StampType) => {
    const current = calendarData[date]?.stamps || [];
    if (current.some((s) => s.id === stamp.id) || current.length >= 4) return;

    const newData = {
      ...calendarData,
      [date]: {
        date,
        stamps: [...current, stamp],
      },
    };
    setCalendarData(newData);

    setSyncing(true);
    try {
      const [y, m, d] = date.split("-");
      const isoDate = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

      const { data: dayData, error: dayError } = await supabase
        .from("day_data")
        .upsert(
          { user_id: userId, date: isoDate },
          { onConflict: "user_id,date" },
        )
        .select()
        .single();

      if (dayError) throw dayError;

      const { error: stampError } = await supabase.from("stamps").insert({
        day_data_id: dayData.id,
        stamp_id: stamp.id,
        emoji: stamp.emoji,
        label: stamp.label,
        comment: stamp.comment || "",
        order_index: current.length,
      });

      if (stampError) throw stampError;
    } catch (e) {
      console.error("addStamp error:", e);
      setCalendarData(calendarData);
    } finally {
      setSyncing(false);
    }
  };

  const deleteStamp = async (date: string, stampId: string) => {
    const current = calendarData[date]?.stamps || [];
    const newData = {
      ...calendarData,
      [date]: { date, stamps: current.filter((s) => s.id !== stampId) },
    };
    setCalendarData(newData);

    setSyncing(true);
    try {
      const [y, m, d] = date.split("-");
      const isoDate = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

      // day_dataのidを取得
      const { data: dayData, error: dayError } = await supabase
        .from("day_data")
        .select("id")
        .eq("user_id", userId)
        .eq("date", isoDate)
        .single();

      if (dayError) throw dayError;

      const { error: stampError } = await supabase
        .from("stamps")
        .delete()
        .eq("day_data_id", dayData.id)
        .eq("stamp_id", stampId);

      if (stampError) throw stampError;
    } catch (e) {
      console.error("deleteStamp error:", e);
      setCalendarData(calendarData);
    } finally {
      setSyncing(false);
    }
  };

  const updateComment = async (
    date: string,
    stampId: string,
    comment: string,
  ) => {
    const current = calendarData[date]?.stamps || [];

    // 楽観的更新
    const newData = {
      ...calendarData,
      [date]: {
        date,
        stamps: current.map((s) => (s.id === stampId ? { ...s, comment } : s)),
      },
    };
    setCalendarData(newData);

    setSyncing(true);
    try {
      const [y, m, d] = date.split("-");
      const isoDate = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

      const { data: dayData, error: dayError } = await supabase
        .from("day_data")
        .select("id")
        .eq("user_id", userId)
        .eq("date", isoDate)
        .single();

      if (dayError) throw dayError;

      const { error: stampError } = await supabase
        .from("stamps")
        .update({ comment })
        .eq("day_data_id", dayData.id)
        .eq("stamp_id", stampId);

      if (stampError) throw stampError;
    } catch (e) {
      console.error("updateComment error:", e);
      setCalendarData(calendarData);
    } finally {
      setSyncing(false);
    }
  };

  return { calendarData, syncing, addStamp, deleteStamp, updateComment };
};
