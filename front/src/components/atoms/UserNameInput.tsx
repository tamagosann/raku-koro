import { FC } from "react";
import { TextField } from "@material-ui/core";
import { Controller, Control, FieldError } from "react-hook-form";

interface Props {
  control: Control;
  error: FieldError;
}

export const UserNameInput: FC<Props> = ({ control, error }) => {
  return (
    <>
      <Controller
        name="username"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <TextField label="ユーザー名" {...field} />}
      />
      {error !== undefined && (
        <p style={{ color: "red" }}>
          {error.type === "required" && "ユーザー名を入力してください"}
        </p>
      )}
    </>
  );
};
