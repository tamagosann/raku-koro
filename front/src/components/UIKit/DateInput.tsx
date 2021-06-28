import React, { FC } from "react";
import { TextField } from "@material-ui/core";

export type DateInputProps = {
  fullWidth: boolean;
  label: string;
  required: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const DateInput: FC<DateInputProps> = (props) => {
  return (
    <TextField
      fullWidth={props.fullWidth}
      margin="dense"
      label={props.label}
      type="date"
      required={props.required}
      InputLabelProps={{
        shrink: true,
      }}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

export default DateInput;
