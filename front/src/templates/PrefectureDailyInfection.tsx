import React, { useState, useEffect, FC } from "react";
import { Inner } from "../components/inner";
// import {useSelector} from 'react-redux'
import { selectDailyInfection } from "../features/graphs/dailyInfectionSlice";
import { useAppSelector } from "../app/hooks";
import { DailyTotalRadio } from "../components/atoms/DailyTotalRadio";
import { TypographyTitle } from "../components/atoms/index";
import { ReChart } from "../components/organisms/ReChart";
import { Prefecture } from "../components/atoms/Prefecture";
import { prefectures } from "../common/prefecture";
import { selectUser } from "../features/user/userSlice";

const PrefectureDailyInfention: FC = () => {
  const [prefecture, setPrefecture] = useState<string>("1");
  // const [selector,setSelector] = useState(0)
  const [value, setValue] = useState<string>("0");
  const user = useAppSelector(selectUser)

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
      (el: any) => el.pref_code == prefecture
    );

  useEffect(() => {
    if (user) {
      prefectures.forEach((pref) => {
        if (pref.prefName === user.prefecture) {
          setPrefecture(String(pref.prefCode));
        }
      });
    }
  }, [user]);
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
            rel="noopener"
          >
            都道府県ごとの感染者数の推移情報提供:NHK
          </a>
        </Inner>
      )}
    </>
  );
};

export default PrefectureDailyInfention;
