import { FC } from "react";
import { TextField } from "@material-ui/core";
import { Controller, Control, FieldError } from "react-hook-form";

interface Props {
  control: Control;
  error: FieldError;
  disabled?: boolean;
}

export const UserNameInput: FC<Props> = ({ control, error, disabled }) => {
  return (
    <>
      <Controller
        name="username"
        control={control}
        rules={{
          required: true,
          pattern: /[^\s　]/,
        }}
        render={({ field }) => (
          <TextField label="ユーザー名" disabled={disabled} {...field} />
        )}
      />
      {error !== undefined && (
        <p style={{ color: "red" }}>
          {error.type === "required" && "ユーザー名を入力してください"}
          {error.type === "pattern" && "空白を含めないでください"}
        </p>
      )}
    </>
  );
};
