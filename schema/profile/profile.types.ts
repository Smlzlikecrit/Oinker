export type schema = {
    key: string
    displayName: null | string
    bio: null | string
    coverImg: Blob | null
    profileImg: Blob | null
    followerIds: string[]
    followingIds: string[]
    oinkIds: string[]
}