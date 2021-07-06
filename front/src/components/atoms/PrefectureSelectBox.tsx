import { FC } from "react";
import {
  Select,
  MenuItem,
  makeStyles,
  createStyles,
  Theme,
  FormControl
} from "@material-ui/core";
import { Controller, Control, FieldError } from "react-hook-form";
import { InputLabel } from "@material-ui/core";
import { prefectures } from "../../common/prefecture";

interface Props {
  control: Control;
  error: FieldError;
  disabled?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 160,
    }
  })
);

export const PrefectureSelectBox: FC<Props> = ({
  control,
  error,
  disabled,
}) => {
  const classes = useStyles();
  return (
    <>
      <FormControl
        className={classes.formControl}
      >
        <InputLabel>都道府県</InputLabel>
        <Controller
          name="prefecture"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <Select
              {...field}
              disabled={disabled}
            >
              {prefectures.map((pref, index) => (
                <MenuItem key={index} value={pref.prefName}>
                  {pref.prefName}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
      {error !== undefined && (
        <p style={{ color: "red" }}>
          {error.type === "required" && "都道府県を選択してください"}
        </p>
      )}
    </>
  );
};
