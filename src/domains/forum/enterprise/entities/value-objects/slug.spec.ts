import { Slug } from './slug'

test('it should be able to create a new slug from text', async () => {
  const slug = Slug.createFromText('Exemplo novo slug')

  expect(slug.value).toEqual('exemplo-novo-slug')
})
