import React, { FC } from 'react';
import { PropTypes, Typography } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';

interface TypographyProps {
  children: string;
  variant: Variant;
  align: PropTypes.Alignment;
}

const TypographyTitle: FC<TypographyProps> = ({ children, variant, align }) => {
  return (
    <Typography
      variant={variant}
      align={align}
      style={{ marginBottom: '40px' }}
    >
      {children}
    </Typography>
  );
};

export default TypographyTitle;
