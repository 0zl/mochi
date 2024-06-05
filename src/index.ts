import path from 'path'

import { MochiRender } from './core/render'
import { MochiServer } from './core/server'

class Mochi {
    private Initialized = false
    
    Render: MochiRender
    Server: MochiServer

    constructor() {
        this.Render = new MochiRender()
        this.Server = new MochiServer()
        
        this.init()
    }

    private async init() {
        if ( this.Initialized ) return
        
        this.Server.init()

        this.Initialized = true
    }

    getDir(pathName: string) {
        return path.resolve(import.meta.dir, '../', pathName)
    }
}

export default Mochi

if ( import.meta.main ) {
    global.Mochi = new Mochi()
}