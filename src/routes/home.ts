import { Elysia } from 'elysia'

export default new Elysia()
    .all('/', () => {
        return Mochi.Render.get('index.pug', {})
    })