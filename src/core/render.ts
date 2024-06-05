import pug from 'pug'
import * as sass from 'sass'

class MochiRender {
    private StyleCache: Map<number | bigint, string> = new Map()

    async html(subPath: string, data: Record<string, any> = {}) {
        const path = Mochi.getDir(`src/views/${subPath}`)
        const file = Bun.file(path)
        
        if ( !await file.exists() ) {
            throw new Error(`View ${path} not found`)
        }

        const text = await file.text()

        return pug.render(text, {
            filename: path,
            ...data
        })
    }

    async style(name: string) {
        const path = Mochi.getDir(`src/scss/${name}.scss`)
        const file = Bun.file(path)

        if ( !await file.exists() ) {
            throw new Error(`Style ${path} not found`)
        }

        const text = await file.text()
        const hash = Bun.hash(text)
        
        if ( this.StyleCache.has(hash) ) {
            return this.StyleCache.get(hash)!
        }

        const compiled = sass.compile(path)
        this.StyleCache.set(hash, compiled.css)
        
        return compiled.css
    }
}

export { MochiRender }