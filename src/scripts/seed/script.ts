import { getPayloadClient } from '@/lib/payload/client'
import { seedAdmin } from './seeders/admin.seeder'
import { seedArticleAuthor } from './seeders/article-authors.seeder'
import { seedArticles } from './seeders/article.seeder'

async function main() {
    const payload = await getPayloadClient()
    try {
        await seedAdmin(payload)
        await seedArticleAuthor(payload)
        await seedArticles(payload)
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

void main()
