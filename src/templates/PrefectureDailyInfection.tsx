import React, { useState, FC } from "react";
import { selectDailyInfection } from "../features/graphs/dailyInfectionSlice";
import { useAppSelector } from "../app/hooks";
import {
  DailyTotalRadio,
  TypographyTitle,
  Inner,
  Prefecture,
} from "../components/atoms/";
import { ReChart } from "../components/organisms/ReChart";
const PrefectureDailyInfention: FC = () => {
  const [prefecture, setPrefecture] = useState<string>("1");
  // const [selector,setSelector] = useState(0)
  const [value, setValue] = useState<string>("0");

  interface PrefectureData {
    daily_dead: number;
    daily_infection: number;
    date: string;
    pref_code: number;
    pref_name: string;
    total_dead: number;
    total_infection: number;
  }

  interface Prefecture {
    data: PrefectureData[];
    status: "loading" | "success" | "failed";
  }

  const prefecture_daily_infection: Prefecture =
    useAppSelector(selectDailyInfection);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  const target_prefecture: PrefectureData[] =
    prefecture_daily_infection.data.filter(
      (el: any) => el.pref_code === Number(prefecture)
    );

  return (
    <>
      {prefecture_daily_infection.status === "loading" ? (
        <Inner>
          <p>Loading...</p>
        </Inner>
      ) : (
        <Inner>
          <TypographyTitle variant="h5" align="center">
            都道府県別感染者数
          </TypographyTitle>
          <Prefecture prefecture={prefecture} setPrefecture={setPrefecture} />
          <DailyTotalRadio handleChange={handleChange} value={value} />
          {value === "0" ? (
            <ReChart
              targetPrefecture={target_prefecture}
              dataKey="total_infection"
              startIndex={0}
              endIndex={0}
              value={value}
              date={"date"}
            >
              累計感染者数
            </ReChart>
          ) : (
            <ReChart
              targetPrefecture={target_prefecture}
              dataKey="daily_infection"
              startIndex={target_prefecture.length - 31}
              endIndex={target_prefecture.length - 1}
              value={value}
              date={"date"}
            >
              日別感染者数
            </ReChart>
          )}
          <a
            href="https://www3.nhk.or.jp/news/special/coronavirus/data-widget/"
            target="_blank"
            rel="noopener noreferrer"
          >
            都道府県ごとの感染者数の推移情報提供:NHK
          </a>
        </Inner>
      )}
    </>
  );
};

export default PrefectureDailyInfention;
