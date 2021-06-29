import React, { useEffect } from 'react'
import axios from 'axios'
import Papa from 'papaparse'
import Router from './Router'
import { Header } from './components/header'

const App = () => {

  useEffect(() => {
    axios
      .get(
        'https://www3.nhk.or.jp/n-data/opendata/coronavirus/nhk_news_covid19_prefectures_daily_data.csv'
      )
      .then((response) => {
        // console.log('response', response.data);
        // console.log('response', response.data);
        const JsonCorona = Papa.parse(response.data, {
          header: true,
          dynamicTyping: true,
          encoding: 'Shift-JIS',
          // transformHeader: function (header, index) {
          //   console.log('transformHeader', header, index);
          // },
          // エラーを取り除く
          // skipEmptyLines: true,
          // データを解析
          // complete: function (results, file) {
          //   console.log('Parsing complete:', results, file);
          // },
          // step: function (row) {
          //   console.log(row.data);
          // },
          // transformHeader: true,
        });
        console.log('JsonCorona', JsonCorona.data);
      });
  });
  return (
    <>
      <Header />
      <Router />
    </>
  )
}

export default App
