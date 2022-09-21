export type api = {}

export type oink = {
    key: string
    profileId: string
    createdDate: Date
    text: string
    images: Blob[]
}

export type profile = {
    key: string
    displayName: null | string
    bio: null | string
    coverImg: Blob
    profileImg: Blob
    followerIds: string[]
    followingIds: string[]
    oinkIds: string[]
}

export type store = {
    feed: oink[],
    profile: profile | undefined
    following: profile[],
}