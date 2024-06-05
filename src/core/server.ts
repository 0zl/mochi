import { Elysia } from 'elysia'

import Home from '../routes/home'

class MochiServer {
    private ServerPort: number = Number(process.env.PORT) || 3000

    async init() {
        new Elysia()
            .use(Home)
            .listen(this.ServerPort)
        
        console.log(`server initialized. online on port`, this.ServerPort)
    }
}

export { MochiServer }