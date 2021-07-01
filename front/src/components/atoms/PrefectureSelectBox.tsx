import { FC } from "react";
import { Select, MenuItem } from "@material-ui/core";
import { Controller, Control, FieldError } from "react-hook-form";
import { prefectures } from "../../common/prefecture";

interface Props {
  control: Control;
  error: FieldError;
  disabled?: boolean;
}

export const PrefectureSelectBox: FC<Props> = ({ control, error,disabled }) => {
  return (
    <>
      <Controller
        name="prefecture"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <Select {...field} disabled={disabled}>
            {prefectures.map((pref, index) => (
              <MenuItem key={index} value={pref.prefName}>
                {pref.prefName}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {error !== undefined && (
        <p style={{ color: "red" }}>
          {error.type === "required" && "都道府県を選択してください"}
        </p>
      )}
    </>
  );
};
