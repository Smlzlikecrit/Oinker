import { FormEvent, useState } from 'react'
import { Dialog, TextField, Button, Alert } from "@mui/material";
import styled from "@emotion/styled";
import { TextBlock } from '../../components/TextBlock'
import * as types from "./Shell.types";

const Title = styled.h2`
  font-size: 3rem;
  margin: 1rem;
  text-align: center;
`;

const InputWrap = styled.div`
  width: 100%;
  padding: 0.5rem;
`;

const Content = styled.form`
  padding: 2rem;
`;

const Modal = styled(Dialog)`
  & .MuiPaper-root {
    width: 100%;
    max-width: 30rem;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem;
`;

const Description = styled.p`
  margin: 1rem 2rem 2rem;
  font-size: 0.8;
  opacity: 0.7;
  text-align: center;
`

export const createStep = <T extends string>() => {
  const Component = (props: types.step<T>) => {
    const [message, setMessage] = useState<null | string>(null)
    const [disabled, setDisabled] = useState<boolean>(false)

    const { buttons, inputs, label, onSubmit, description, onLink } = props;
    const keys = Object.keys(inputs) as T[];
    const buttonKeys = Object.keys(buttons)
    const isForm = keys.length > 0

    const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setDisabled(true)

        const data = new FormData(event.target as HTMLFormElement)
        const response = Object.fromEntries(data) as Record<T, string>
        if (!onSubmit) return

        setMessage(null)
        const message = await onSubmit(response)
        if(message) {
            setDisabled(false)
            setMessage(message)
        }
    }

    return (
      <Modal open>
        <Content onSubmit={onSubmit ? submitHandler : undefined}>

          <Title>{label}</Title>

          {description && <Description><TextBlock onLink={onLink}>{description}</TextBlock></Description>}

          {keys.map((singleKey: T) => {
            const value = inputs[singleKey];
            const { label, type = 'text'} = typeof value === 'string' ? { label: value} : value
            return (
              <InputWrap key={singleKey}>
                <TextField
                  variant="filled"
                  fullWidth
                  name={singleKey}
                  label={label}
                  type={type}
                  disabled={disabled}
                />
              </InputWrap>
            );
          })}
            {message && <Alert severity='warning'>{message}</Alert>}
            <Actions>
                {buttonKeys.map((singleKey) => {
                    const value = buttons[singleKey]
                    const actionObj = 
                      typeof value === 'function' ? { action: value} : value

                    const {
                        action, 
                        primary = false,       
                        } = (actionObj as any)

                    return (
                        <Button 
                        key={singleKey} 
                        variant={primary ? 'contained' : 'outlined'} 
                        size='large'
                        type={action === true ? 'submit' : 'button'}
                        onClick={action === true ? undefined : action}
                        disabled={action === true && disabled}
                        >
                            {singleKey}
                        </Button>
                    )
                })}
            </Actions>
        </Content>
      </Modal>
    );
  };
  return Component;
};

export const Step = createStep<string>();
export default Step;
