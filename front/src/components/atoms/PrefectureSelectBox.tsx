import { FC } from "react";
import { Select, MenuItem } from "@material-ui/core";
import { Controller, Control, FieldError } from "react-hook-form";

interface Props {
  control: Control;
  error: FieldError;
}

const prefs = [{ name: "東京都" }, { name: "大阪府" }, { name: "北海道" }];

export const PrefectureSelectBox: FC<Props> = ({ control, error }) => {
  return (
    <>
      <Controller
        name="prefecture"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <Select {...field}>
            {prefs.map((pref, index) => (
              <MenuItem key={index} value={pref.name}>
                {pref.name}
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
