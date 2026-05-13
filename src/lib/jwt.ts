import jwt from 'jsonwebtoken'
  
  const JWT_SECRET = process.env.JWT_SECRET!
  
  export type JwtPayload = {
    userId: string
    username: string
    role: string
  }
  
  export function signJwt(payload: JwtPayload) {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: '7d',
    })
  }
  
  export function verifyJwt(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET) as JwtPayload
    } catch {
      return null
    }
  }