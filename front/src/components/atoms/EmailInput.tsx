import { FC } from "react";
import { TextField } from "@material-ui/core";
import { Controller, Control, FieldError } from "react-hook-form";

interface Props {
  control: Control;
  error: FieldError;
}

export const EmailInput: FC<Props> = ({ control, error }) => {
  return (
    <>
      <Controller
        name="email"
        control={control}
        rules={{
          required: true,
          pattern: /.+@.+/,
          // validate: (value): any => {
          //   if (value.match(/[\s]/) === null) {
          //     console.log(value.match(/[^\s　]/));
          //     return false;
          //   } else {
          //     return true;
          //   }
          // },
        }}
        render={({ field }) => <TextField label="メールアドレス" {...field} />}
      />
      {error !== undefined && (
        <p style={{ color: "red" }}>
          {error.type === "required" && "メールアドレスを入力してください"}
          {error.type === "pattern" && "形式が違います"}
          {/* {error.type === "validate" && "空白を含めないでください"} */}
        </p>
      )}
    </>
  );
};
