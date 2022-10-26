import { TextBlock } from "../TextBlock";

export default {
  title: "components/TextBlock",
};

export const Default = () => <TextBlock>Hello World</TextBlock>;
export const Link = () => (
  <TextBlock
    onLink={(label: string) =>
      console.log(`The following was clicked ${label}`)
    }
  >
    Hello [World](example-1). This should [have](example-2) a link
  </TextBlock>
);
