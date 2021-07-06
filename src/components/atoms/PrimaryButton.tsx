import { FC } from "react";
import { Button } from "@material-ui/core";

type PrimaryButtonProps = {
  label: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
};

const PrimaryButton: FC<PrimaryButtonProps> = (props) => {
  return (
    <Button
      className={props.className}
      variant="contained"
      color="primary"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.label}
    </Button>
  );
};

export default PrimaryButton;
