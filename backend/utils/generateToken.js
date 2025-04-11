import jwt from 'jsonwebtoken'

const generateToken = (_id, res) => {
  const token = jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: "3d"})

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 3*24*60*60*1000,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development"
  })

  return token
}

export default generateToken