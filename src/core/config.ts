import yaml from 'yaml'

const CONFIG_VERSION = 1

interface IServerConfig {
    port: number
}

interface IMochiConfig {
    server: IServerConfig
    configVersion: number
}

function defaultConfig(): IMochiConfig {
    return {
        server: {
            port: 3000
        },
        configVersion: CONFIG_VERSION
    }
}

class MochiConfig {
    private ConfigPath!: string;
    private Config!: IMochiConfig;

    async init() {
        this.ConfigPath = Mochi.getUserDir('config.yml')
        await this.loadConfig()

        console.log(`config initialized.`)
    }

    private async loadConfig() {
        const file = Bun.file(this.ConfigPath)

        if ( await file.exists() ) {
            const text = await file.text()
            this.Config = yaml.parse(text)

            if ( this.Config?.configVersion !== CONFIG_VERSION ) {
                Mochi.errorExit(`config version mismatch. expected ${CONFIG_VERSION}, found ${this.Config.configVersion}. delete or update config.yml and restart`)
            }

            return
        }

        this.Config = defaultConfig()
        await this.saveConfig()
    }

    private async saveConfig(): Promise<void> {
        const config = yaml.stringify(this.Config)
        await Bun.write(this.ConfigPath, config)
    }

    get<K extends keyof IMochiConfig>(key: K): IMochiConfig[K] {
        return this.Config[key];
    }

    set<K extends keyof IMochiConfig>(key: K, value: IMochiConfig[K]): void {
        this.Config[key] = value;
    }
}

export { MochiConfig }