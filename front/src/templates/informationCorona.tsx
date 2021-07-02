import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { selectTotalCorona } from "../features/graphs/totalCoronaSlice";
import { selectTotalDeth } from "../features/graphs/totalDethSlice";
import { selectBedOccupancyRate } from "../features/graphs/bedOccupancyRateSlice";
import { useAppSelector } from "../app/hooks";
import { selectDailyPositive } from "../features/graphs/dailyPositiveSlice";

const useStyles = makeStyles((theme) => ({
  outline: {
    margin: "auto",
    width: theme.spacing(160),
    height: theme.spacing(90),
    textAlign: "center",
    backgroundColor: "#ff8080",
  },
  inline: {
    margin: "auto",
    width: theme.spacing(75),
    height: theme.spacing(35),
    textAlign: "center",
    backgroundColor: "white",
  },
}));

export const InformationCorona = () => {
  const totalCorona = useAppSelector(selectTotalCorona);
  const totalDeth = useAppSelector(selectTotalDeth);
  const bedOccupancyRate = useAppSelector(selectBedOccupancyRate);
  const positivRate = useAppSelector(selectDailyPositive);

  const [coronaHuman, setCoronaHuman] = useState(totalCorona.data);
  const [dethHuman, setDethHuman] = useState(totalDeth.data);
  const [bedUsed, setBedUsed] = useState(bedOccupancyRate.data);
  const [coronaPositiv, setcoronaPositiv] = useState(positivRate.data);
  useEffect(() => {
    setCoronaHuman(totalCorona.data);
    setDethHuman(totalDeth.data);
    setBedUsed(bedOccupancyRate.data);
    setcoronaPositiv(positivRate.data);
  }, [totalCorona, totalDeth, bedOccupancyRate, positivRate]);

  const coronaIndex = coronaHuman.length - 1;
  let coronaToday;
  let coronaYesterday;
  let coronaDayBeforeYesterday;
  let dethToday;
  let dethYesterday;
  let dethDayBeforeYesterday;
  let todayBedRate;
  let yesterdayBedRate;
  let dayBeforeYesterdayBedRate;

  if (totalCorona.status === "success") {
    // コロナ感染者算出
    let index1 = totalCorona.data.length - 1;
    let index2 = totalCorona.data.length - 2;
    let index3 = totalCorona.data.length - 3;
    coronaToday = totalCorona.data[index1].npatients;
    coronaYesterday = (totalCorona.data[index1].npatients -
      totalCorona.data[index2].npatients) as number;
    coronaDayBeforeYesterday =
      totalCorona.data[index1].npatients - totalCorona.data[index3].npatients;
  }
  // コロナ死亡者算出
  if (totalDeth.status === "success") {
    let index4 = totalDeth.data.length - 1;
    let index5 = totalDeth.data.length - 2;
    let index6 = totalDeth.data.length - 3;
    dethToday = totalDeth.data[index4].ndeaths;
    dethYesterday = (totalDeth.data[index4].ndeaths -
      totalDeth.data[index5].ndeaths) as number;
    dethDayBeforeYesterday = (totalDeth.data[index4].ndeaths -
      totalDeth.data[index6].ndeaths) as number;
  }
  // コロナ陽性者数算出
  
  if (positivRate.status === "success") {
    let positivRateIndex1 = positivRate.data.length - 1;
    let positivRateIndex2 = positivRate.data.length - 2;
    let positivRateIndex3 = positivRate.data.length - 3;
    let todayPositiv = positivRate.data[positivRateIndex1].daily_positive;
    let yesterdayPositiv =
      positivRate.data[positivRateIndex1].daily_positive -
      positivRate.data[positivRateIndex2].daily_positive;
    let dayBeforeYesterdayPositiv =
      positivRate.data[positivRateIndex1].daily_positive -
      positivRate.data[positivRateIndex3].daily_positive;
    // PCR検査数を算出
    let todayPcr = positivRate.data[positivRateIndex1].daily_pcr;
    let yesterdayPcr =
      positivRate.data[positivRateIndex1].daily_pcr -
      positivRate.data[positivRateIndex2].daily_pcr;
    let dayBeforeYesterdayPcr =
      positivRate.data[positivRateIndex1].daily_pcr -
      positivRate.data[positivRateIndex3].daily_pcr;

    todayBedRate = ((todayPositiv / todayPcr) * 100).toFixed(2);
    yesterdayBedRate = ((yesterdayPositiv / yesterdayPcr) * 100).toFixed(2);
    dayBeforeYesterdayBedRate = (
      (dayBeforeYesterdayPositiv / dayBeforeYesterdayPcr) *
      100
    ).toFixed(2);
  }

  // 対策病床使用率を算出
  // 入院者数*入院患者受入確保病床=入院患者病床使用率
  let sumBed = 0;
  bedOccupancyRate.data.forEach((todayBed) => {
    sumBed += todayBed.secure_bed;
  });

  let sumInpatient = 0;
  bedOccupancyRate.data.forEach((todayInpatient) => {
    sumInpatient += todayInpatient.inpatient;
  });

  let totalBedUsed = ((sumInpatient / sumBed) * 100).toFixed(2);

  const classes = useStyles();

  return (
    <div>
      {totalCorona.status === "loading" ||
      totalDeth.status === "loading" ||
      bedOccupancyRate.status === "loading" ||
      positivRate.status === "loading" ? (
        <div>ローディング中</div>
      ) : (
        <>
          <Paper className={classes.outline}>
            <h1 style={{ textAlign: "left", marginLeft: 30, paddingTop: 30 }}>
              新型コロナウイルス 日本国内の状況
            </h1>
            <Grid container>
              <Grid item xs={6}>
                <Paper className={classes.inline}>
                  <h2 style={{ fontSize: 24, paddingTop: 30 }}>
                    対策病床使用率(参考)※
                  </h2>
                  <h2 style={{ fontSize: 40 }}>{Number(totalBedUsed)}%</h2>
                  <h2 style={{ fontSize: 40 }}>
                    {Number(totalBedUsed) > 50
                      ? "ステージ4"
                      : Number(totalBedUsed) > 25
                      ? "ステージ3"
                      : Number(totalBedUsed) > 5
                      ? "ステージ2"
                      : "ステージ1"}
                  </h2>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.inline}>
                  <h2 style={{ fontSize: 24, paddingTop: 30 }}>感染者数</h2>
                  <h2 style={{ fontSize: 32 }}>
                    {!coronaToday ? 0 : coronaToday.toLocaleString()}人
                  </h2>
                  <h3 style={{ fontSize: 24 }}>
                    前日：＋
                    {!coronaYesterday ? 0 : coronaYesterday.toLocaleString()}人
                  </h3>
                  <h3 style={{ fontSize: 24 }}>
                    前々日：＋
                    {!coronaDayBeforeYesterday
                      ? 0
                      : coronaDayBeforeYesterday.toLocaleString()}
                    人
                  </h3>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.inline}>
                  <h2 style={{ fontSize: 24, paddingTop: 30 }}>死亡者数</h2>
                  <h2 style={{ fontSize: 32 }}>
                    {!dethToday ? 0 : dethToday.toLocaleString()}人
                  </h2>
                  <h3 style={{ fontSize: 24 }}>
                    前日：＋
                    {!dethYesterday ? 0 : dethYesterday.toLocaleString()}人
                  </h3>
                  <h3 style={{ fontSize: 24 }}>
                    前々日：＋
                    {!dethDayBeforeYesterday
                      ? 0
                      : dethDayBeforeYesterday.toLocaleString()}
                    人
                  </h3>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.inline}>
                  <h2 style={{ fontSize: 24, paddingTop: 30 }}>
                    PCR検査陽性率
                  </h2>
                  <h2 style={{ fontSize: 32 }}>{todayBedRate}%</h2>
                  <h3 style={{ fontSize: 24 }}>
                    前日：
                    {yesterdayBedRate}%
                  </h3>
                  <h3 style={{ fontSize: 24 }}>
                    前々日：
                    {dayBeforeYesterdayBedRate}%
                  </h3>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
          <p style={{ marginLeft: 200, fontSize: 24 }}>
            感染者数 更新日：{coronaHuman[coronaIndex].date}
            <br />
            ※対策病床使用率(参考)=現在患者 / 新型コロナ対策病床数
            <br />
            <a href="https://corona.go.jp/dashboard/">
              新型コロナウイルス感染症対策オープンデータ
            </a>
            を使用
            <br />
            <a href="https://www.stopcovid19.jp/">
              新型コロナウイルス対策ダッシュボード
            </a>
            を使用
          </p>
        </>
      )}
    </div>
  );
};
