import { $content } from '@nuxt/content'
import type { IContentDocument } from '@nuxt/content/types/content'
import { name } from './const.json'

const baseUrl = 'https://ceigh.com'

interface Feed {
  options: { title: string, link: string }
  addItem: Function
}

async function create (feed: Feed) {
  feed.options = { title: 'Ceigh', link: baseUrl }

  const content = []
  for (const c of ['demos', 'en/notes']) {
    content.push([c, await $content(c).fetch()])
  }

  content.forEach((c) => {
    const category = c[0]
    const items = c[1] as IContentDocument[]
    items.forEach((i) => {
      const url = `${baseUrl}/${category}/${i.slug}`
      const { abstract } = i
      feed.addItem({
        title: i.title,
        id: url,
        link: url,
        date: new Date(i.date),
        description: abstract,
        author: i.author || name
      })
    })
  })
}

export default function () {
  const feedFormats = { atom: { type: 'atom1', file: 'atom.xml' } }
  return Object.values(feedFormats).map(({ file, type }) => ({
    create,
    type,
    path: `/rss/${file}`
  }))
}
