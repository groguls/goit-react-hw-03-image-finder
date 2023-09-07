import { MoreButton } from './Button.styled';

export const Button = ({ onLoadMore }) => {
  return (
    <MoreButton type="button" onClick={onLoadMore}>
      Load more
    </MoreButton>
  );
};
