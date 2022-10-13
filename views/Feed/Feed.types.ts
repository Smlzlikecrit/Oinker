import { types as oink } from '../../schema/oink'
import { types as profile } from '../../schema/profile'
export { oink, profile }


export type api = {
    getOinks: () => Promise<oink.schema[]>,
    getProfiles: () => Promise<profile.schema[]>
}

export type oinkProps = {
    imageUrl: string | null;
    text: string;
    name: string;
    date: Date;
    embedImage: string | null;
}


export namespace phases {
    export type loading = {
        phase: 'loading'
        feed: null,
        profiles: null,
    }

    export type resting = {
        phase: 'resting',
        feed: oink.schema[],
        profiles: profile.schema[],
    }
}

export type store = phases.loading | phases.resting