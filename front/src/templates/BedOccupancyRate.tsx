import React from "react";
import { useAppSelector } from "../app/hooks";
import Inner from "../components/inner/Inner";

//react-modal
import Modal from "react-modal";

// slice
import { selectBedOccupancyRate } from "../features/graphs/bedOccupancyRateSlice";

// マテリアルUI
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

Modal.setAppElement("#root");

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paperStegeOne: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      backgroundColor: "#ffff",
    },
    paperStegeSecond: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      backgroundColor: "#ffd5d5",
    },
    paperStegeThird: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      backgroundColor: "#ff8080",
    },
    paperStegeForth: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      backgroundColor: "#ff2b2b",
    },
    backgroundColorStageOne: {},
    
  })
);

const Test = (props:any) => {
  const useBedRateing =(Number(props.element.inpatient) / Number(props.element.secure_bed)) *100;
  const classes = useStyles();
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div onClick={openModal}>
        <h3>{props.element.prefecture}</h3>
        <p>{props.element.use_bed_rate}</p>
        <p>
          {props.element.inpatient} / {props.element.secure_bed}
        </p>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={props.customStyles}
        contentLabel="Example Modal"
      >
        <h2>{props.element.prefecture} 病床使用率 {(props.element.inpatient / props.element.secure_bed * 100).toFixed(2)} % (参考)</h2>

        {/* ここに円グラフ入れてください！ */}

        
        <p>PCR検査陽性者数：{props.element.pcr_positive}人</p>
        <p>うち重症者数：{props.element.injured}人</p>
        <p>入院患者受入確保病床：{props.element.secure_bed}床</p>
        <p>入院者数：{props.element.inpatient}人</p>
        <p>出典：{props.element.source}</p>
        <p>最終更新日：{props.element.update}</p>
        
      </Modal>
    </>
  );
};

export const BedOccupancyRate = () => {
  // let subtitle:any;

  const classes = useStyles();
  const BedOccupancyRates = useAppSelector(selectBedOccupancyRate);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <>
      {BedOccupancyRates.status === "loading" ? null : (
        <Inner>
          <div className={classes.root}>
            <Grid container spacing={3}>
              {BedOccupancyRates.data.map((element, index) => {
                const useBedRateing =
                  (Number(element.inpatient) / Number(element.secure_bed)) *
                  100;
                return (
                  <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Paper
                      className={
                        useBedRateing >= 50
                          ? classes.paperStegeForth
                          : useBedRateing >= 25
                          ? classes.paperStegeThird
                          : useBedRateing >= 5
                          ? classes.paperStegeSecond
                          : classes.paperStegeOne
                      }
                    >
                      <Test customStyles={customStyles} element={element}/>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </Inner>
      )}
    </>
  );
};
