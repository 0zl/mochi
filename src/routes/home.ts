import { Elysia } from 'elysia'

export default new Elysia()
    .get('/style/:name', async (req) => {
        try {
            const style = await Mochi.Render.style(req.params.name)
            req.set.headers['Content-Type'] = 'text/css'
            return style
        } catch (error) {
            console.error(error)
            req.set.status = 400
        }
    })
    .all('/', () => {
        return Mochi.Render.html('index.pug', {})
    })