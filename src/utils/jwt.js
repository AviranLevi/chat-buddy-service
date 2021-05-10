import jwt from 'jsonwebtoken'
const { env } = process

export const signToken = (userId) =>
  jwt.sign(
    {
      iss: 'JoinUs',
      sub: userId,
    },
    env.JWT_KEY,
    { expiresIn: '24h' }
  )
