import { Timezone } from 'app/shared/models/timezone.model';

export class User {
    name: string
    email: string
    password: string
    role?: string
    _id?: string
    timeZones?: Timezone[]
}


