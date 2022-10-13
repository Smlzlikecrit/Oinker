import { CssBaseline } from "@mui/material";
import './Storybook.css'


export const Storybook = (props: { children: JSX.Element }) => {
  const { children } = props;
  return (
        <>
            <CssBaseline />
            {children}
        </>
);
};

export default Storybook;
