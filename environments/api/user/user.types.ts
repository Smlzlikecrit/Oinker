export type user = {
    email: string
    id: string
    token: string
}


export type api = {
    signIn: (props: {email: string, password: string }) => Promise<{
        status: 'error',
        error: string
    } | {
        status: 'success',
        user: user,
    }>,

    signUp: (props: {email: string, password: string }) => Promise<{
        status: 'error',
        error: string
    } | {
        status: 'success',
        error: null,
    }>,
    
    signOut: () => Promise<void>
    resetPassword: (props: {email: string}) => Promise<void>
    resendResetPassword: (props: {email: string}) => Promise<void>
    resendConfirmation: (props: { email: string }) => Promise<void>
    getUser: () => Promise<null | user>
}