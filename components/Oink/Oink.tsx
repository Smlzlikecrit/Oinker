import { Paper, Skeleton, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { formatDistanceStrict } from "date-fns";
import * as types from "./Oink.types";

const Image = styled.img`
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  margin-right: 0.5rem;
`;


const Wrapper = styled(Paper)`
  padding: 1rem;
  min-height: 10rem;
  border-radius: 6px;
`;

const StyledSkeleton = styled(Skeleton)`
  height: 10rem;
  border-radius: 6px;
  opacity: 0.5;
`;

const TopBar = styled.div`
  display: flex;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
  margin-bottom: 0.5rem;
  align-items: center;
`;

const Name = styled.div`
  font-weight: bold;
`;

const ImageEmbed = styled.div`
  width: 100%;
  height: 10rem;
  border-radius: 2px;
  margin-top: 1rem;
  object-fit: cover;
`;

const Time = styled.div`
  opacity: 0.5;
  font-size: 0.8rem;

`;

export const Oink = (props: types.props) => {
  const { imageUrl, name, text, date, embedImage } = props;
  const timeString = formatDistanceStrict(new Date(), date);
  return (
    <Wrapper>
      <TopBar>
        <Image src={imageUrl || ''} alt="" />
        
        <div>
          <Name>{name}</Name>
          <Time>{timeString} ago</Time>
        </div>
      </TopBar>

      <Typography>{text}</Typography>

      {embedImage && <ImageEmbed src={embedImage} alt="" />}
    </Wrapper>
  );
};

export const Placeholder = () => <StyledSkeleton variant="rectangular" />;

export default Oink;
