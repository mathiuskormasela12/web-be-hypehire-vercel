import 'dotenv/config'

const Config = {
  PORT: process.env?.SERVICE_PORT ?? 3000,
  DATABASE_URL: process.env?.SERVICE_DATABASE_URL ?? '',
  WEB_CLIENTS: process.env?.SERVICE_WEB_CLIENTS ?? '',
  APP_URL: process.env?.SERVICE_APP_URL ?? '',
  ACCESS_TOKEN: {
    KEY: process.env?.SERVICE_ACCESS_TOKEN_KEY ?? '',
    EXPIRES_IN: process.env?.SERVICE_ACCESS_TOKEN_EXPIRES_IN ?? ''
  },
  REFRESH_TOKEN: {
    KEY: process.env?.SERVICE_REFRESH_TOKEN_KEY ?? '',
    EXPIRES_IN: process.env?.SERVICE_REFRESH_TOKEN_EXPIRES_IN ?? ''
  }
}

export default Config
