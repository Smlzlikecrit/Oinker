import * as types from "./TextBlock.types";
import styled from "@emotion/styled";
import ReactMarkdown from "react-markdown";

const LinkButton = styled.button`
  background: none;
  border-width: 0;
  border-radius: 4px;
  display: inline-block;
  font: inherit;
  padding: 0.25rem;
  margin: -0.25rem;
  text-decoration: underline;
  cursor: pointer;
  color: rgba(0, 125, 255);

    &:hover {
        background: rgba(0, 125, 255, 0.1)
    }

    &:focus {
        background: rgba(0, 125, 255, 0.3)
    }
`;

export const TextBlock = (props: types.props) => {
  const { children, onLink } = props;
  return (
    <ReactMarkdown
      components={{
        p: 'span',
        a: ({ children: innerChildren, href }) => (
          <LinkButton type="button" onClick={() => onLink && href && onLink(href)}>
            {innerChildren}
          </LinkButton>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default TextBlock;
