import React, { FC } from 'react';
import { PropTypes, Typography } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';

interface TypographyProps {
  children: string;
  variant: Variant;
  align: PropTypes.Alignment;
  className?: string;
}

const TypographyTitle: FC<TypographyProps> = ({ children, variant, align, className }) => {
  return (
    <Typography
      variant={variant}
      align={align}
      style={{ marginBottom: '40px' }}
      className={className}
    >
      {children}
    </Typography>
  );
};

export default TypographyTitle;
