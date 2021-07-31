declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string
    MONGO_URI: string
    ACCESS_SIGNATURE: string
  }
}
