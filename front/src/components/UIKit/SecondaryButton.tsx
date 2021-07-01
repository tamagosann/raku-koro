import React, { FC } from "react";
import { Button } from "@material-ui/core";

type SecondaryButtonProps = {
  label: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
};

const SecondaryButton: FC<SecondaryButtonProps> = (props) => {
  return (
    <Button
      className={props.className}
      variant="contained"
      color="secondary"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.label}
    </Button>
  );
};

export default SecondaryButton;
