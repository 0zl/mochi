import pug from 'pug'

class MochiRender {
    private Cache: Map<string, string> = new Map()

    async get(subPath: string, data: Record<string, any> = {}) {
        const path = Mochi.getDir(`src/views/${subPath}`)

        if ( this.Cache.has(path) ) {
            const cachedText = this.Cache.get(path)!
            return pug.render(cachedText, {
                filename: path,
                ...data
            })
        }

        const file = Bun.file(path)
        
        if ( !await file.exists() ) {
            throw new Error(`View ${path} not found`)
        }

        const text = await file.text()
        this.Cache.set(path, text)

        return pug.render(text, {
            filename: path,
            ...data
        })
    }
}

export { MochiRender }