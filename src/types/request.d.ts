declare namespace Express {
  export interface Request {
    user?: {
      name: string;
      avatar: string;
      profile: string;
      userGroup: string;
    }
  }
}