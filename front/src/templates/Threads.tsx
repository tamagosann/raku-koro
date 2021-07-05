import React, { FC, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Inner } from "../components/inner";
import { CommentList } from "../components/commentList";
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

const getPrefectureListOfMenuItem = (): string[] => {
  const prefectureList: string[] = [];
  const _prefectures = prefectures;
  prefectureList.push("全て");
  for (let i = 0; i < _prefectures.length; i++) {
    prefectureList.push(_prefectures[i].prefName);
  }
  return prefectureList;
};

const Threads: FC = () => {
  const classes = useStyles();
  const threadsData = useAppSelector(selectThread);
  const [prefectureToRefineList, setPrefectureToRefineList] =
    useState<string>("全て");
  const uid = useAppSelector(selectUid);
  const errorMsg = useAppSelector(selectThreadErrorMsg);
  const dispatch = useDispatch();
  const prefectureList: string[] = getPrefectureListOfMenuItem();

  const refinedThreadsData = useMemo(() => {
    if (threadsData) {
      if (prefectureToRefineList === "全て") {
        return threadsData;
      } else {
        const filteredPrefectureData = threadsData.filter((thread) => {
          return thread.prefecture === prefectureToRefineList;
        });
        return filteredPrefectureData;
      }
    } else {
      return [];
    }
  }, [prefectureToRefineList, threadsData]);
  console.log(refinedThreadsData);

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
                {prefectureList.map((prefecture) => {
                  return (
                    <MenuItem key={prefecture} value={prefecture}>
                      {prefecture}
                    </MenuItem>
                  );
                })}
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
