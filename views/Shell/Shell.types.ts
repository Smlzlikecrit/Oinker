
export type privatePhase = "loading" | "emailed-reset" | "emailed-confirm" | "accessed"

export type publicPhase = "creating" | "authenticating" | "resetting";

export type phase = publicPhase | privatePhase;

export type store = {
  phase: phase;
  sentEmail: null | string;

  goTo: Record<publicPhase, () => void>

  signIn: (props: {
    email: string;
    password: string;
  }) => Promise<null | string>;

  signUp: (props: {
    email: string;
    password: string;
  }) => Promise<null | string>;

  signOut: () => Promise<void>;
  resetPassword: (props: { email: string }) => Promise<void>;
  resendEmail: (props: { email: string }) => Promise<void>;
};

export type active = "feed" | "following" | "profile" | null;
export type props = { children: JSX.Element; active: active; title: string };

export type input = {
  label: string;
  type?: string;
};

export type button = {
  label: string;
  primary: boolean;
  action: true | (() => void);
};

export type callback = true | (() => void);
export type response<T extends string> = Record<T, string>;

export type step<T extends string> = {
  label: string;
  description?: string;
  inputs: Record<T, string | input>;
  buttons: Record<string, callback | { action: callback; primary: boolean }>;
  onSubmit: null | ((response: response<T>) => Promise<null | string>);
  onLink?: (label: string) => void
};
