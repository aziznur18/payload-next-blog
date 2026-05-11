import { getPayload } from 'payload'
import config from '@/payload.config'
import { isDuplicateError } from '../lib/is-duplicate-error'
import { env } from '@/lib/env'

export async function seedAdmin() {
    const payload = await getPayload({ config })

    try {
        const response = await payload.create({
            collection: 'users',
            data: {
                email: env.CMS_SEED_ADMIN_EMAIL,
                password: env.CMS_SEED_ADMIN_PASSWORD,
            },
        })

        console.log('Admin User Created:', response)
    } catch (error) {
        if (isDuplicateError(error, 'email')) {
            console.log('Admin user already exist')
        }
    }
}
