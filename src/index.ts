import { MochiServer } from './core/server'

class Mochi {
    private Initialized = false
    Server!: MochiServer

    async init() {
        if ( this.Initialized ) return
         
        this.Server = new MochiServer()
        this.Server.init()

        this.Initialized = true
    }
}

export default Mochi

if ( import.meta.main ) {
    const MochiInstance = new Mochi()
    await MochiInstance.init()
}