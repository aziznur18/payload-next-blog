import { faker } from '@faker-js/faker'
import { Payload } from 'payload'

export async function createMediaFromImageUrl(payload: Payload, imageUrl: string) {
    try {
        const res = await fetch(imageUrl)
        const arrayBuffer = await res.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const mimeType = res.headers.get('content-type') || 'image/jpeg'
        const fileName = res.url.split('/').pop()?.split('?')[0]
        const fileSize = buffer.length

        if (!fileName) throw new Error('Failed to extract fileName')

        const media = await payload.create({
            collection: 'media',
            draft: true,
            data: {
                alt: faker.lorem.words(3),
            },
            file: {
                data: buffer,
                name: fileName,
                mimetype: mimeType,
                size: fileSize,
            },
        })

        return media
    } catch (error) {
        console.warn('Failed to seed media image', error)
    }
}
