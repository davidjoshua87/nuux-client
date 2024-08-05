import jwt from 'jwt-simple'

const generateJwtToken = () => {
  const payload = {
    name: process.env.NAME,
    email: process.env.EMAIL,
    password: process.env.PASSWORD
  }
  const secret = process.env.SECRET_KEY

  return jwt.encode(payload, secret, 'HS256')
}

export { generateJwtToken }
