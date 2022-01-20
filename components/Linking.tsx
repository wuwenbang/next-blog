import Link, { LinkProps } from 'next/link';
import { FC } from 'react';
import styled from 'styled-components';

const Linking: FC<LinkProps> = (props) => {
  return (
    <Link {...props}>
      <Anchor>{props.children}</Anchor>
    </Link>
  );
};

export default Linking;

const Anchor = styled.a`
  color: #7ebbf8;
  cursor: pointer;
  &:hover {
    color: dodgerblue;
  }
`;
