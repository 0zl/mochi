import path from 'path'

import { MochiConfig } from './core/config'
import { MochiRender } from './core/render'
import { MochiServer } from './core/server'
import { MochiDatabase } from './core/database'

import type { MochiSchema } from './core/database/schema'

class Mochi {
    private Initialized = false
    
    Config!: MochiConfig
    Database!: MochiDatabase<MochiSchema>
    Render!: MochiRender
    Server!: MochiServer

    async init() {
        if ( this.Initialized ) return

        this.Config = new MochiConfig()
        this.Database = new MochiDatabase<MochiSchema>()
        this.Render = new MochiRender()
        this.Server = new MochiServer()
        
        await this.Config.init()
        await this.Server.init()

        this.Initialized = true
    }

    getDir(pathName: string) {
        return path.resolve(import.meta.dir, '../', pathName)
    }

    getUserDir(pathName: string) {
        return this.getDir(`user/${pathName}`)
    }

    errorExit(...msg: string[]) {
        console.error(...msg)
        process.exit(1)
    }
}

if ( import.meta.main ) {
    global.Mochi = new Mochi()
    await global.Mochi.init()
}

export default Mochi