

export type store = {
    phase: 'email-confirm-notice'
} | {
    phase: 'logged-in'
} | {
    phase: 'creating-account'
} | {
    phase: 'logging-in'
} | {
    phase: 'request-password-reset'
} | {
    phase: 'loading'
}

export type api = {}

export type active = 'feed' | 'following' | 'profile' | null
export type props = { children: JSX.Element, active: active, title: string }