import { Elysia } from 'elysia'

export default new Elysia()
    .all('/', () => 'Meow')