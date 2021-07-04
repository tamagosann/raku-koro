import React, { FC, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
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
import { FormLayout } from "../components/organisms";
import {
  selectThread,
  selectThreadErrorMsg,
  unSetThreadErrorMsg,
} from "../features/thread/threadSlice";
import { selectUid } from "../features/user/userSlice";

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
  const threadsData = useAppSelector(selectThread);
  const [prefectureToRefineList, setPrefectureToRefineList] =
    useState<string>("");
  const uid = useAppSelector(selectUid);
  const errorMsg = useAppSelector(selectThreadErrorMsg);
  const dispatch = useDispatch();

  const refinedThreadsData = useMemo(() => {
    if (threadsData) {
      if (prefectureToRefineList === "全て") {
        return threadsData;
      }
      const filteredPrefectureData = threadsData.filter((thread) => {
        return thread.prefecture === prefectureToRefineList;
      });
      return filteredPrefectureData;
    }
  }, [prefectureToRefineList, threadsData]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPrefectureToRefineList(event.target.value as string);
  };

  useEffect(() => {
    setPrefectureToRefineList("全て");
    return () => {
      dispatch(unSetThreadErrorMsg());
    };
  }, [dispatch]);

  return (
    <>
      <Inner>
        <Typography align="center" variant="h5">
          コロナ関連情報掲示板
        </Typography>
        {errorMsg ? (
          <p style={{ color: "red" }}>{errorMsg}</p>
        ) : (
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
            {refinedThreadsData && (
              <CommentList label={"投稿一覧"} rows={refinedThreadsData} />
            )}
            {uid && <FormLayout type="createcomment" />}
          </div>
        )}
      </Inner>
    </>
  );
};

export default Threads;
