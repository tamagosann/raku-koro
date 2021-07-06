import React, { useEffect, useState, FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectTotalCorona } from '../../features/graphs/totalCoronaSlice';

const InformetionTodayCorona: FC = () => {
  const totalCorona = useAppSelector(selectTotalCorona);
  const [coronaHuman, setCoronaHuman] = useState(totalCorona.data);
  const coronaIndex: number = coronaHuman.length - 1;

  return (
    <p style={{ textAlign: 'center', fontSize: '24px' }}>
      感染者数 更新日：{coronaHuman[coronaIndex].date}
      <br />
      ※対策病床使用率(参考) = 現在患者 / 新型コロナ対策病床数
      <br />
      <a
        href='https://corona.go.jp/dashboard/'
        target='_blunk'
        rel='noopener noreferrer'
      >
        新型コロナウイルス感染症対策オープンデータ
      </a>
      を使用
      <br />
      <span>
        DATA:{' '}
        <a
          href='https://creativecommons.org/licenses/by/4.0/deed.ja'
          target='_blunk'
          rel='noopener noreferrer'
        >
          CC BY
        </a>
      </span>
      <span> </span>
      <span>
        <a
          href='https://www.stopcovid19.jp/'
          target='_blunk'
          rel='noopener noreferrer'
        >
          新型コロナウイルス対策ダッシュボード
        </a>
        を使用
      </span>
    </p>
  );
};

export default InformetionTodayCorona;
