import { FC } from 'react';
import { Button } from '@material-ui/core';

type OrangeButtonProps = {
  label: string;
  onClick: () => void;
}

const OrangeButton: FC<OrangeButtonProps> = (props) => {
  return (
    <Button 
      variant="contained"
      style={{background: "#fd7e00", color: "#fff"}}
      onClick={props.onClick}
    >
      {props.label}
    </Button>
  )
}

export default OrangeButton