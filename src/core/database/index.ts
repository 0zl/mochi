import { Kysely } from 'kysely'
import { BunSqliteDialect } from 'kysely-bun-sqlite'
import { Database as SQLite } from 'bun:sqlite'

class MochiDatabase<DB> extends Kysely<DB> {
    constructor() {
        const path = Mochi.getUserDir('user.db')

        super({
            dialect: new BunSqliteDialect({
                database: new SQLite(path)
            })
        })
    }
}

export {
    MochiDatabase
}