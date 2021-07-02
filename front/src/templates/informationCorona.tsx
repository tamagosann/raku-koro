import React, { useEffect, useState, FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useAppSelector } from "../app/hooks";
import LoadingPage from "../components/atoms/LoadingPage";
import Inner from "../components/inner/Inner";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { selectTotalCorona } from "../features/graphs/totalCoronaSlice";
import { selectTotalDeth } from "../features/graphs/totalDethSlice";
import { selectBedOccupancyRate } from "../features/graphs/bedOccupancyRateSlice";
import { selectDailyPositive } from "../features/graphs/dailyPositiveSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#fd7e00",
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: "center",
    height: "250px",
    margin: "10px",
  },
}));

export const InformationCorona: FC = () => {
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

  const coronaIndex: number = coronaHuman.length - 1;
  let coronaToday: number | undefined;
  let coronaYesterday: number | undefined;
  let coronaDayBeforeYesterday: number | undefined;
  let dethToday: number | undefined;
  let dethYesterday: number | undefined;
  let dethDayBeforeYesterday: number | undefined;
  let todayBedRate: string | undefined;
  let yesterdayBedRate: string | undefined;
  let dayBeforeYesterdayBedRate: string | undefined;

  if (totalCorona.status === "success") {
    // コロナ感染者算出
    let index1: number = totalCorona.data.length - 1;
    let index2: number = totalCorona.data.length - 2;
    let index3: number = totalCorona.data.length - 3;
    coronaToday = totalCorona.data[index1].npatients;
    coronaYesterday = (totalCorona.data[index1].npatients -
      totalCorona.data[index2].npatients) as number;
    coronaDayBeforeYesterday =
      totalCorona.data[index1].npatients - totalCorona.data[index3].npatients;
  }
  // コロナ死亡者算出
  if (totalDeth.status === "success") {
    let index4: number = totalDeth.data.length - 1;
    let index5: number = totalDeth.data.length - 2;
    let index6: number = totalDeth.data.length - 3;
    dethToday = totalDeth.data[index4].ndeaths;
    dethYesterday = (totalDeth.data[index4].ndeaths -
      totalDeth.data[index5].ndeaths) as number;
    dethDayBeforeYesterday = (totalDeth.data[index4].ndeaths -
      totalDeth.data[index6].ndeaths) as number;
  }
  // コロナ陽性者数算出

  if (positivRate.status === "success") {
    let positivRateIndex1: number = positivRate.data.length - 1;
    let positivRateIndex2: number = positivRate.data.length - 2;
    let positivRateIndex3: number = positivRate.data.length - 3;
    let todayPositiv: number =
      positivRate.data[positivRateIndex1].daily_positive;
    let yesterdayPositiv: number =
      positivRate.data[positivRateIndex2].daily_positive;
    let dayBeforeYesterdayPositiv: number =
      positivRate.data[positivRateIndex3].daily_positive;
    // PCR検査数を算出
    let todayPcr: number = positivRate.data[positivRateIndex1].daily_pcr;
    let yesterdayPcr: number = positivRate.data[positivRateIndex2].daily_pcr;
    let dayBeforeYesterdayPcr: number =
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
  let sumBed: number = 0;
  bedOccupancyRate.data.forEach((todayBed) => {
    sumBed += todayBed.secure_bed;
  });

  let sumInpatient: number = 0;
  bedOccupancyRate.data.forEach((todayInpatient) => {
    sumInpatient += todayInpatient.inpatient;
  });

  let totalBedUsed: string = ((sumInpatient / sumBed) * 100).toFixed(2);

  const classes = useStyles();

  return (
    <div>
      <Inner>
        {totalCorona.status === "loading" ||
        totalDeth.status === "loading" ||
        bedOccupancyRate.status === "loading" ||
        positivRate.status === "loading" ? (
          <LoadingPage />
        ) : (
          <>
            <h1 style={{ textAlign: "center" }}>
              新型コロナウイルス 日本国内の状況
            </h1>
            <div className={classes.root}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Paper className={classes.paper}>
                    <h2 style={{ fontSize: "24px" }}>対策病床使用率(参考)※</h2>
                    <h2 style={{ fontSize: "40px" }}>
                      {Number(totalBedUsed)}%
                    </h2>
                    <h2
                      style={
                        Number(totalBedUsed) > 50
                          ? { background: "#ff2b2b" }
                          : Number(totalBedUsed) > 25
                          ? { background: "#ff8080" }
                          : Number(totalBedUsed) > 5
                          ? { background: "#ffd5d5" }
                          : { background: "#ffff" }
                      }
                    >
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
                <Grid item xs={12} md={6}>
                  <Paper className={classes.paper}>
                    <h2 style={{ fontSize: "24px" }}>累計感染者数</h2>
                    <h2 style={{ fontSize: "32px" }}>
                      {!coronaToday ? 0 : coronaToday.toLocaleString()}人
                    </h2>
                    <h3 style={{ fontSize: "24px" }}>
                      前日比：＋
                      {!coronaYesterday ? 0 : coronaYesterday.toLocaleString()}
                      人
                    </h3>
                    <h3 style={{ fontSize: "24px" }}>
                      前々日比：＋
                      {!coronaDayBeforeYesterday
                        ? 0
                        : coronaDayBeforeYesterday.toLocaleString()}
                      人
                    </h3>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper className={classes.paper}>
                    <h2 style={{ fontSize: "24px" }}>累計死亡者数</h2>
                    <h2 style={{ fontSize: "32px" }}>
                      {!dethToday ? 0 : dethToday.toLocaleString()}人
                    </h2>
                    <h3 style={{ fontSize: "24px" }}>
                      前日比：＋
                      {!dethYesterday ? 0 : dethYesterday.toLocaleString()}人
                    </h3>
                    <h3 style={{ fontSize: "24px" }}>
                      前々日比：＋
                      {!dethDayBeforeYesterday
                        ? 0
                        : dethDayBeforeYesterday.toLocaleString()}
                      人
                    </h3>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper className={classes.paper}>
                    <h2 style={{ fontSize: "24px" }}>PCR検査陽性率</h2>
                    <h2 style={{ fontSize: "32px" }}>{todayBedRate}%</h2>
                    <h3 style={{ fontSize: "24px" }}>
                      前日：
                      {yesterdayBedRate}%
                    </h3>
                    <h3 style={{ fontSize: "24px" }}>
                      前々日：
                      {dayBeforeYesterdayBedRate}%
                    </h3>
                  </Paper>
                </Grid>
              </Grid>
            </div>

            <p style={{ textAlign: "center", fontSize: "24px" }}>
              感染者数 更新日：{coronaHuman[coronaIndex].date}
              <br />
              ※対策病床使用率(参考)=現在患者 / 新型コロナ対策病床数
              <br />
              <a
                href="https://corona.go.jp/dashboard/"
                target="_blunk"
                rel="noopener noreferrer"
              >
                新型コロナウイルス感染症対策オープンデータ
              </a>
              を使用
              <br />
              <a
                href="https://www.stopcovid19.jp/"
                target="_blunk"
                rel="noopener noreferrer"
              >
                新型コロナウイルス対策ダッシュボード
              </a>
              を使用
            </p>
          </>
        )}
      </Inner>
    </div>
  );
};
export default InformationCorona;
