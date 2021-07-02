import React, { FC, useEffect, useMemo, useState } from "react";
import { Inner } from "../components/inner";
import { CommentList } from "../components/commentList";
import { Data } from "../components/commentList/CommentList";
import { useAppSelector } from "../app/hooks";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Typography,
} from "@material-ui/core";
import { prefectures } from "../common/prefecture";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

const getPrefectureListOfMenuItem = (): any[] => {
  //MenuItemの型がよくわからないためanyで回避by秋山
  const prefectureList: any[] = [];
  const _prefectures = prefectures;
  prefectureList.push(<MenuItem value={"全て"}>全て</MenuItem>);
  for (let i = 0; i < _prefectures.length; i++) {
    prefectureList.push(
      <MenuItem value={_prefectures[i].prefName}>
        {_prefectures[i].prefName}
      </MenuItem>
    );
  }
  return prefectureList;
};

const Threads: FC = () => {
  const classes = useStyles();
  const [prefectureToRefineList, setPrefectureToRefineList] = useState<string>("");

  //本番ではthreadsDataは↓これで呼び出す
  // const threadsData: Data[] = useAppSelector(selectThreads)

  const threadsData: Data[] = [
    {
      _id: "0001",
      uid: "aaa",
      date: "2020-06-10",
      prefecture: "東京",
      username: "田中",
      comment: "全然大丈夫です",
      delete: "×",
    },
    {
      _id: "0002",
      uid: "bbb",
      date: "2020-06-20",
      prefecture: "神奈川",
      username: "中田",
      comment: "ちょっとやばいです",
      delete: "×",
    },
    {
      _id: "0003",
      uid: "ccc",
      date: "2020-06-30",
      prefecture: "下北沢",
      username: "落合",
      comment: "やばいです",
      delete: "×",
    },
    {
      _id: "0004",
      uid: "ddd",
      date: "2020-06-21",
      prefecture: "埼玉",
      username: "鈴木",
      comment: "全然大丈夫です",
      delete: "×",
    },
    {
      _id: "0005",
      uid: "eee",
      date: "2020-06-24",
      prefecture: "秋田",
      username: "村田",
      comment: "全然大丈夫です",
      delete: "×",
    },
    {
      _id: "0006",
      uid: "fff",
      date: "2020-06-26",
      prefecture: "神奈川県",
      username: "田中",
      comment: "全然大丈夫です",
      delete: "×",
    },
  ];

  const refinedThreadsData = useMemo(() => {
    if (prefectureToRefineList === "全て") {
      return threadsData;
    }
    const filteredPrefectureData = threadsData.filter((thread) => {
      return thread.prefecture === prefectureToRefineList;
    });
    return filteredPrefectureData;
  }, [prefectureToRefineList]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPrefectureToRefineList(event.target.value as string);
  };

  useEffect(() => {
    setPrefectureToRefineList("全て");
  }, []);

  return (
    <>
      <Inner>
        <Typography align="center" variant="h5">
          2ちゃんねる
        </Typography>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">都道府県</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={prefectureToRefineList}
              onChange={handleChange}
            >
              {getPrefectureListOfMenuItem()}
            </Select>
          </FormControl>
        </div>
        <CommentList label={"コメント一覧"} rows={refinedThreadsData} />
      </Inner>
    </>
  );
};

export default Threads;
