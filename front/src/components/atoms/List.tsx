import React, { FC } from 'react';

interface ListProps {
  children: string;
  url: string;
}

const List: FC<ListProps> = ({ children, url }) => {
  return (
    <li>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    </li>
  );
};

export default List;
