import React from 'react';
import { Inner } from '../components/inner';
import { TypographyTitle } from '../components/atoms';
import { createStyles, makeStyles, Typography } from '@material-ui/core';
import { FC } from 'react';
import { List } from '../components/atoms/index';
const useStyles = makeStyles(() =>
  createStyles({
    colorOrange: {
      color: '#fd7e00',
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
          variant={'h4'}
          align={'center'}
          className={classes.colorOrange}
        >
          About
        </TypographyTitle>
        <Typography
          variant={'h6'}
          align={'left'}
          style={{ marginBottom: 20, fontWeight: 'bold' }}
          className={classes.colorOrange}
        >
          当サイトについて
        </Typography>
        <Typography className={classes.mb30}>
          当サイトは日本国内における新型コロナウイルス感染症(COVID-19)に関する情報サイトです。
        </Typography>
        <Typography
          variant={'h6'}
          align={'left'}
          style={{ marginBottom: 20, fontWeight: 'bold' }}
          className={classes.colorOrange}
        >
          ブラウザについて
        </Typography>
        <Typography className={classes.mb30}>
          当サイトでは、Google Chrome（最新版）での閲覧を推奨しております。
          その他のブラウザでの閲覧に関しては正常に動作しない可能性があります。
        </Typography>
        <Typography
          variant={'h6'}
          align={'left'}
          style={{ marginBottom: 20, fontWeight: 'bold' }}
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
          variant={'h6'}
          align={'left'}
          style={{ marginBottom: 20, fontWeight: 'bold' }}
          className={classes.colorOrange}
        >
          本サイトで利用しているデータについて
        </Typography>
        <Typography className={classes.mb30}>
          本サイトでは、以下一覧が提供されているデータを利用しています。
          <br />
          <ul>
            <List url="https://www3.nhk.or.jp/news/special/coronavirus/data-widget/">
              日本放送協会（NHK） 提供: 都道府県ごとの感染者数の推移情報
            </List>
            <List url="https://www3.nhk.or.jp/news/special/coronavirus/data-widget/">
              日本放送協会（NHK） 提供: 都道府県ごとの死者数の推移情報
            </List>
            <List url="https://corona.go.jp/dashboard/">
              新型コロナウイルス感染症対策提供:累積の要請者数情報
            </List>
            <List url="https://corona.go.jp/dashboard/">
              新型コロナウイルス感染症対策提供:累積の死亡者数情報
            </List>
            <List url="https://corona.go.jp/dashboard/">
              ※DATA:CC
              BY/新型コロナウイルス対策ダッシュボード提供：対策病床使用率
            </List>
            <List url="https://corona.go.jp/dashboard/">
              ※DATA:CC
              BY/新型コロナウイルス対策ダッシュボード提供：PCR検査陽性率
            </List>
            <List url="https://www.stopcovid19.jp/">
              ※DATA:CC
              BY/新型コロナウイルス対策ダッシュボード提供：療養状況等及び入院患者受入病床数等に関する調査についてのJSONデータ
            </List>
            <List url="https://www.mhlw.go.jp/stf/covid-19/open-data.html">
              厚生労働省提供：PCR検査数と陽性者数
            </List>
            <List url="https://www.mhlw.go.jp/stf/seisakunitsuite/newpage_00023.html">
              厚生労働省提供：療養状況等及び入院患者受入病床数等に関する調査について
            </List>
          </ul>
          <br />
          データについては、下記リンク先に記載の事項を確認した上で非営利目的で利用しています。
          ただし当サイトでは、データの完全性についての保証及びデータの誤りにより生じた損害等に対して、一切の責任を負いません。
          また当サイト及び掲載している情報については、当サイトの一存により公開を停止する場合がございますがご了承ください。
          <br />
          <a
            href="https://creativecommons.org/licenses/by/4.0/deed.ja"
            target="_blank"
            rel="noopener noreferrer"
          >
            ※クリエイティブ・コモンズ
          </a>
        </Typography>
      </Inner>
      <Inner>
        <TypographyTitle
          variant={'h4'}
          align={'center'}
          className={classes.colorOrange}
        >
          更新情報
        </TypographyTitle>
        <Typography
          variant={'h6'}
          align={'left'}
          style={{ marginBottom: 20, fontWeight: 'bold' }}
          className={classes.colorOrange}
        >
          2020-02-02
        </Typography>
        <Typography className={classes.mb30}>サイトを公開しました</Typography>
        <Typography
          variant={'h6'}
          align={'left'}
          style={{ marginBottom: 20, fontWeight: 'bold' }}
          className={classes.colorOrange}
        >
          2020-02-02
        </Typography>
        <Typography className={classes.mb30}>サイトを公開しました</Typography>
        <Typography
          variant={'h6'}
          align={'left'}
          style={{ marginBottom: 20, fontWeight: 'bold' }}
          className={classes.colorOrange}
        >
          2020-02-02
        </Typography>
        <Typography className={classes.mb30}>サイトを公開しました</Typography>
      </Inner>
    </>
  );
};

export default About;
