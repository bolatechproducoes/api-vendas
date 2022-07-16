//Recurso de namespace do ts, acrescenta o tipo user ao Request do express
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
