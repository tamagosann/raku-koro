import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { selectTotalCorona } from "../features/graphs/totalCoronaSlice";
import { selectTotalDeth } from "../features/graphs/totalDethSlice";
import { selectBedOccupancyRate } from "../features/graphs/bedOccupancyRateSlice";
import { useAppSelector } from "../app/hooks";

// interface TotalCorona{
//   date:string;
//   ndeaths:number;
//   adpatients : number;
// }

// interface totalDeth{
//   date: string;
//   ndeaths: number;
// }

const useStyles = makeStyles((theme) => ({
  outline: {
    // margin: theme.spacing(1),
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

  const [coronaHuman, setCoronaHuman] = useState(totalCorona.data);
  const [dethHuman, setDethHuman] = useState(totalDeth.data);
  const [bedUsed, setBedUsed] = useState(bedOccupancyRate.data);
  useEffect(() => {
    setCoronaHuman(totalCorona.data);
    setDethHuman(totalDeth.data);
    setBedUsed(bedOccupancyRate.data);
  }, [totalCorona, totalDeth, bedOccupancyRate]);
  // =============
  // 対策病床使用率を算出
  // 入院者数*入院患者受入確保病床=入院患者病床使用率
  // const humans = bedUsed.map((human){
  //   return NUm=human.入院者数=+
  // })
  // inpatient
  // secure_bed
  // =============
  const coronaIndex = coronaHuman.length - 1;
  let coronaToday;
  let coronaYesterday;
  let coronaDayBeforeYesterday;
  let dethToday;
  let dethYesterday;
  let dethDayBeforeYesterday;

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
  const classes = useStyles();

  return (
    <div>
      {totalCorona.status === "loading" || totalDeth.status === "loading" ? (
        // ||
        // bedOccupancyRate.status === "loading"
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
                  <h2 style={{ fontSize: 24 }}>対策病床使用率(参考)※</h2>
                  <h2 style={{ fontSize: 40 }}>25.6%</h2>
                  <h2 style={{ fontSize: 40 }}>ステージ3</h2>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.inline}>
                  <h2 style={{ fontSize: 24 }}>感染者数</h2>
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
                  <h2 style={{ fontSize: 24 }}>死亡者数</h2>
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
