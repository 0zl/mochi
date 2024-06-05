import pug from 'pug'

class MochiRender {
    async get(subPath: string, data: Record<string, any> = {}) {
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
}

export { MochiRender }