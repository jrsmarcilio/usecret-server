declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      PRISMA_FIELD_ENCRYPTION_KEY: string;
      ACCESS_TOKEN_SECRET: string;
    }
  }
}
export { };