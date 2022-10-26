import { useStore } from "zustand";
import { useContext, useRef } from "react";
import { createStep, Step } from "./Shell.Step";
import { context } from "./Shell.store";
import { differenceInMinutes } from 'date-fns'
import validator from "validator";

const AuthStep = createStep<"email" | "password">();
const CreateStep = createStep<"email" | "password" | "confirm">();
const ResetStep = createStep<"email">();


export const Auth = () => {
  const store = useContext(context);
  const signIn = useStore(store, state => state.signIn)
  const create = useStore(store, (state) => state.goTo.creating)
  const reset = useStore(store, (state) => state.goTo.resetting)

  return (
    <AuthStep
    label="Log In"
    description="Please sign in or [create an account](create) to use Oinker. If you are unsure what your exisiting password is, please use the [password reset](reset) functionality."
      inputs={{
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      }}
      buttons={{
        "Create Account": create,
        "Log In": {
          action: true,
          primary: true,
        },
      }}
      onLink={(label) => {
        if (label === 'create') return create()
        if (label === 'reset') return reset()
        throw new Error('Invalid label')
      }}
      onSubmit={async (props) => {
        const email = props.email.trim();
        const password = props.password.trim();
        if (email === "") return "Email value required";
        if (password === "") return "Password value required";
        if (!validator.isEmail(email)) return "Email has invalid formatting";
        if (password.length < 8)
          return "Invalid user credentials. Please check email and/or password.";

        const error = await signIn({ email, password });
        if (error) return error;
        return null;
      }}
    />
  );
};

export const Create = () => {
  const store = useContext(context);
  const signUp = useStore(store, state => state.signUp)
  const cancel = useStore(store, (state) => state.goTo.authenticating)


  return (
  <CreateStep
  label="Create Account"
  description="In order to create a new account on Oinker, please provide an email and password. If you already have an existing account, please [sign-in](signin) instead."
    inputs={{
      email: "Email",
      password: {
        label: "Password",
        type: "password",
      },
      confirm: {
        label: "Confirm Password",
        type: "password",
      },
    }}
    buttons={{
      Cancel: cancel,
      "Create Account": {
        action: true,
        primary: true,
      },
    }}
    onLink={(label) => {
      if (label === 'signin') return cancel()
      throw new Error('Invalid label')
    }}
    onSubmit={async (props) => {
      const email = props.email.trim();
      const password = props.password.trim();
      const confirm = props.confirm.trim();

      if (email === "") return "Email value required";
      if (password === "") return "Password value required";
      if (confirm === "") return "Password confirmation value required";

      if (!validator.isEmail(email)) return "Email has invalid formatting";
      if (password.length < 8)
        return "Password cannot be shorter than 8 characters.";
      if (password !== confirm)
        return "Password and password confirmation do not match.";

      const error = await signUp({ email, password });
      if (error) return error;
      return null;
    }}
  />
)};

export const Reset = () => {
  const store = useContext(context);
  const resetPassword = useStore(store, state => state.resetPassword)
  const cancel = useStore(store, (state) => state.goTo.authenticating)

  return (
  <ResetStep
    label="Reset Password"
    description="Please provide an email. If an account is associated with it, then a password reset link will be sent."
    inputs={{
      email: "Email",
    }}
    buttons={{
      Cancel: cancel,
      "Send Email": {
        action: true,
        primary: true,
      },
    }}
    onSubmit={async (props) => {
      const email = props.email.trim();
      if (email === "") return "Email value required";
      if (!validator.isEmail(email)) return "Email has invalid formatting";

      await resetPassword({ email });
      return null;
    }}
  />
)};


const MILLISECONDS_IN_SECONDS = 1000
const SECONDS_IN_MINUTES = 60
const MILLISECONDS_IN_MINUTE = MILLISECONDS_IN_SECONDS * SECONDS_IN_MINUTES

export const Email = () => {
  const store = useContext(context);
  const sentEmail = useStore(store, (state) => state.sentEmail)
  const resendEmail = useStore(store, state => state.resendEmail)
  const cancel = useStore(store, (state) => state.goTo.authenticating)
  const sent = useRef<Date>(new Date()) 

  if (!sentEmail) throw new Error("sentEmail is required")

  const handleSend = async (): Promise<string | null> => {
    const currentTimestamp = new Date().getTime()
    const sentTimestamp = sent.current.getTime()

    const diff = currentTimestamp - sentTimestamp
    if (diff < 0) throw new Error("diff should never be negative")

    const minutes = Math.floor(diff / MILLISECONDS_IN_MINUTE)
    const seconds = Math.floor((diff % MILLISECONDS_IN_MINUTE) / MILLISECONDS_IN_SECONDS)
    const paddedSeconds = (60 - seconds).toString().padStart(2, '0')

    if (minutes < 3) return `Please wait 3 minutes before attempting to send email again, since email may take some time before appearing. Email can only be sent again in ${2 - minutes}:${paddedSeconds} minutes.`

    resendEmail({ email: sentEmail })
    return `Email has been sent again. If it still does not appear please contact support at help@oinker.com`
  }

  return (
  <Step
    label="Email Sent"
    description={`An email has been sent to **${sentEmail}**. Please check your inbox (or spam folder) for further instructions. If no email receieved after atleast 3 minutes, please use the resend button.`}
    inputs={{ }}
    buttons={{
      Cancel: cancel,
      Resend: {
        action: true,
        primary: true,
      },
    }}
    onSubmit={handleSend}
  />
)};
