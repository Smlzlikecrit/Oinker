import { types as profile } from '../../schema/profile'
import { types as oink } from '../../schema/oink'
export { oink, profile }

export type api = {
    getOinks: () => Promise<oink.schema[]>,
    getOinksAggregates: () => Promise<{ count: number }>,
    getProfile: () => Promise<profile.schema>
}


export namespace phases {
    export type loading = {
        phase: 'loading'
        feed: null,
        count: null,
        profile: null,
    }

    export type resting = {
        phase: 'resting',
        feed: oink.schema[],
        count: number,
        profile: profile.schema[] | null,
    }
}

export type store = phases.loading | phases.resting