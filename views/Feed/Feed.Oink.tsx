import { Paper, Skeleton } from "@mui/material";
import styled from "@emotion/styled";
import * as types from "./Feed.types";

const Image = styled.img`
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
`

const Wrapper = styled(Paper)`
  padding: 1rem;
  min-height: 10rem;
`;

const StyledSkeleton = styled(Skeleton)`
  height: 10rem;
  border-radius: 6px;
  opacity: 0.5;
`;

const TopBar = styled.div`
  display: flex;
`

export const Oink = (props: types.OinkProps) => {
  const { imageUrl, name, text } = props;
  return (
        <Wrapper>
          <TopBar>
              <Image src="https://picsum.photos/200/300" alt="" />
              <div>{name}</div>
          </TopBar>
              <div>{text}</div>
        </Wrapper>
  );
};

export const Placeholder = () => <StyledSkeleton variant="rectangular" />;

export default Oink;
