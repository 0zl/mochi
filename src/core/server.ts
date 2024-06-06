import { Elysia } from 'elysia'
import { staticPlugin } from '@elysiajs/static'
import { html as htmlPlugin } from '@elysiajs/html'

import Home from '../routes/home'

class MochiServer {
    private ServerPort!: number

    async init() {
        this.ServerPort = Mochi.Config.get('server').port

        const srcStatic = staticPlugin({
            prefix: '/assets',
            assets: './src/assets'
        })

        const userImages = staticPlugin({
            prefix: '/user-image',
            assets: './user/images'
        })

        const htmlMiddleware = htmlPlugin({
            autoDoctype: false
        })

        new Elysia()
            .use(srcStatic)
            .use(userImages)
            .use(htmlMiddleware)
            .use(Home)
            .listen(this.ServerPort)
        
        console.log(`server initialized. online on port`, this.ServerPort)
    }
}

export { MochiServer }