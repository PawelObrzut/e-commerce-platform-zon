declare module 'express-serve-static-core' {
  export interface Response {
    respondWithData?: PaginatedData
  }
}

export {};