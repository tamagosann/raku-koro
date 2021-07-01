import React, { useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { Prefecture } from '../components/atoms/Prefecture';

// slice
import { selectDailyInfection } from '../features/graphs/dailyInfectionSlice';

// コンポーネント
import Inner from '../components/inner/Inner';
import { DailyTotalRadio } from '../components/atoms/DailyTotalRadio';
import { ReChart } from '../components/organisms/ReChart';

export const PrefectureDailyDead = () => {
  const prefecture_dead = useAppSelector(selectDailyInfection);
  // ラジオボタンの初期値（日別）
  const [value, setValue] = useState<string>('0');
  // 初期値は北海道だがユーザーが登録した都道府県に変更したい
  const [prefecture, setPrefecture] = useState<string>('1');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  // 都道府県コードで対象の都道府県をフィルタリングをかける
  const targetPrefecture = prefecture_dead.data.filter(
    (element) => element.pref_code === Number(prefecture)
  );

  return (
    <>
      {prefecture_dead.status === 'loading' ? null : (
        <Inner>
          <Prefecture prefecture={prefecture} setPrefecture={setPrefecture} />
          <DailyTotalRadio handleChange={handleChange} value={value} />
          {value === '0' ? (
            <ReChart
              targetPrefecture={targetPrefecture}
              dataKey="daily_dead"
              startIndex={targetPrefecture.length - 31}
              endIndex={targetPrefecture.length - 1}
              value={value}
            >
              日別死者数
            </ReChart>
          ) : (
            <ReChart
              targetPrefecture={targetPrefecture}
              dataKey="total_dead"
              startIndex={0}
              endIndex={0}
              value={value}
            >
              累計死者数
            </ReChart>
          )}
          <a
           href="https://www3.nhk.or.jp/news/special/coronavirus/data-widget/"
           target="_blank"
           rel="noopener"
            >
           都道府県ごとの死者数の推移情報提供:NHK
             </a>
        </Inner>
      )}
    </>
  );
};
