
export type User = {
    jwt: string,
    name: string,
    id: number
}

export type UserLogin = {
    email: string,
    password: string
}

export type UserRegistration = UserLogin & {
    name: string,
}
