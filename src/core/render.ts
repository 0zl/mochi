import pug from 'pug'
import * as sass from 'sass'

class MochiRender {
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

        const compiled = sass.compile(path)
        return compiled.css
    }
}

export { MochiRender }