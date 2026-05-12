import type { Buffer } from 'node:buffer'
import { getPlaiceholder } from 'plaiceholder'

export function isEligibleForBlurDataURL(mime?: string | null) {
    console.log(mime, '<<< MIME')
    if (!mime?.startsWith('image/')) return false
    if (mime === 'image/svg+xml') return false
    return true
}

export async function generateBlurDataURL(
    buffer?: Buffer<ArrayBufferLike>,
): Promise<string | null> {
    if (!buffer) {
        console.warn('Failed to generate data url: missing buffer')
        return null
    }

    const { base64 } = await getPlaiceholder(buffer)
    return base64
}
