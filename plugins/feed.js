import { $content } from '@nuxt/content'
import { name } from './const.json'

const baseUrl = 'https://ceigh.com'

async function create (feed) {
  feed.options = { title: 'Ceigh', link: baseUrl }

  const content = []
  for (const c of ['demos', 'en/notes']) {
    content.push([c, await $content(c).fetch()])
  }

  content.forEach((c) => {
    const [category, items] = c
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
