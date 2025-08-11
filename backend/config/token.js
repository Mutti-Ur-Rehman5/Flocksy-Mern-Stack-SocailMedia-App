import jwt from 'jsonwebtoken'

const gentoken = async (userId) => {
  try {
    const token = await jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      { expiresIn: "10y" }
    ) // sign function assign token userID ki basis par
    return token
  } catch (error) {
    return `gen token error ${error}` // backticks used correctly here
  }
}

export default gentoken
