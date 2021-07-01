import { FC } from "react";
import { TextField } from "@material-ui/core";
import { Controller, Control, FieldError } from "react-hook-form";

interface Props {
  control: Control;
  error: FieldError;
  disabled?: boolean;
}

export const TextFieldInput: FC<Props> = ({ control, error, disabled }) => {
  return (
    <>
      <Controller
        name="comment"
        control={control}
        rules={{ required: true, maxLength: 50 }}
        render={({ field }) => (
          <TextField
            label="投稿内容"
            variant="outlined"
            multiline
            rows={5}
            {...field}
            disabled={disabled}
          />
        )}
      />
      {error !== undefined && (
        <p style={{ color: "red" }}>
          {error.type === "required" && "コメントを入力してください"}
          {error.type === "maxLength" && "コメントは50字以内で入力してください"}
        </p>
      )}
    </>
  );
};
