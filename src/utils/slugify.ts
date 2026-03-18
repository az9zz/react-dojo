export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-')
    .replace(/(^-|-$)/g, '')
