import React from "react";
import { TypographyTitle,Inner } from "../components/atoms";
import { createStyles, makeStyles, Typography } from "@material-ui/core";
import { FC } from "react";

const useStyles = makeStyles(() =>
  createStyles({
    colorOrange: {
      color: "#fd7e00",
    },
    mb30: {
      marginBottom: 30,
    },
  })
);

const About: FC = () => {
  const classes = useStyles();
  return (
    <>
      <Inner>
        <TypographyTitle
          variant={"h4"}
          align={"center"}
          className={classes.colorOrange}
        >
          About
        </TypographyTitle>
        <Typography
          variant={"h6"}
          align={"left"}
          style={{ marginBottom: 20, fontWeight: "bold" }}
          className={classes.colorOrange}
        >
          当サイトについて
        </Typography>
        <Typography className={classes.mb30}>
          当サイトは日本国内における新型コロナウイルス感染症(COVID-19)に関する情報サイトです。
        </Typography>
        <Typography
          variant={"h6"}
          align={"left"}
          style={{ marginBottom: 20, fontWeight: "bold" }}
          className={classes.colorOrange}
        >
          ブラウザについて
        </Typography>
        <Typography className={classes.mb30}>
          当サイトでは、Google Chrome（最新版）での閲覧を推奨しております。
          その他のブラウザでの閲覧に関しては正常に動作しない可能性があります。
        </Typography>
        <Typography
          variant={"h6"}
          align={"left"}
          style={{ marginBottom: 20, fontWeight: "bold" }}
          className={classes.colorOrange}
        >
          JavaScriptについて
        </Typography>
        <Typography className={classes.mb30}>
          当サイトではJavaScriptを使用しております。
          JavaScriptを無効にして使用された場合、各ページが正常に動作しない、または、表示されない場合がございます。
          当サイトをご利用の際には、JavaScriptを有効にして頂きますようお願いいたします。
        </Typography>
        <Typography
          variant={"h6"}
          align={"left"}
          style={{ marginBottom: 20, fontWeight: "bold" }}
          className={classes.colorOrange}
        >
          本サイトで利用しているデータについて
        </Typography>
        <Typography className={classes.mb30}>
          ここはわかってる型が追記お願いします。 <br/>※例<br/>
          本サイトでは、ジャッグジャパン株式会社
          様が提供されているデータを利用しています。
          データについては、下記リンク先に記載の事項を確認した上で非営利目的で利用しています。
          ジャッグジャパン株式会社 「新型コロナウイルス感染者数マップ」について
          上記リンク先と重複する内容にはなりますが、データの取り扱いについては最新の注意を払っています。
          ただし当サイトでは、データの完全性についての保証及びデータの誤りにより生じた損害等に対して、一切の責任を負いません。
          また当サイト及び掲載している情報については、当サイトの一存により公開を停止する場合がございますがご了承ください。
        </Typography>
      </Inner>
      <Inner>
      <TypographyTitle
          variant={"h4"}
          align={"center"}
          className={classes.colorOrange}
        >
          更新情報
        </TypographyTitle>
      <Typography
          variant={"h6"}
          align={"left"}
          style={{ marginBottom: 20, fontWeight: "bold" }}
          className={classes.colorOrange}
        >
          2020-02-02
        </Typography>
        <Typography className={classes.mb30}>
          サイトを公開しました
        </Typography>
      <Typography
          variant={"h6"}
          align={"left"}
          style={{ marginBottom: 20, fontWeight: "bold" }}
          className={classes.colorOrange}
        >
          2020-02-02
        </Typography>
        <Typography className={classes.mb30}>
          サイトを公開しました
        </Typography>
      <Typography
          variant={"h6"}
          align={"left"}
          style={{ marginBottom: 20, fontWeight: "bold" }}
          className={classes.colorOrange}
        >
          2020-02-02
        </Typography>
        <Typography className={classes.mb30}>
          サイトを公開しました
        </Typography>
      </Inner>
    </>
  );
};

export default About;
