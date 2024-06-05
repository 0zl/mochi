import { Elysia } from 'elysia'
import { staticPlugin } from '@elysiajs/static'
import { html as htmlPlugin } from '@elysiajs/html'

import Home from '../routes/home'

class MochiServer {
    private ServerPort: number = Number(process.env.PORT) || 3000

    async init() {
        const srcStatic = staticPlugin({
            prefix: '/assets',
            assets: './src/assets'
        })

        const htmlMiddleware = htmlPlugin({
            autoDoctype: false
        })

        new Elysia()
            .use(srcStatic)
            .use(htmlMiddleware)
            .use(Home)
            .listen(this.ServerPort)
        
        console.log(`server initialized. online on port`, this.ServerPort)
    }
}

export { MochiServer }