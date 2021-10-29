const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_KEY;

module.exports = (req, res, next) => {
  console.log(req.headers.authorization)

  try {
    const token = req.headers.authorization.split(" ")[1]; // on récupère le token de la requête entrante
    const decodedToken = jwt.verify(token, secretKey); // on le vérifie
    const userId = decodedToken.sub; // on récupère l'id du token
    if (req.body.userId && req.body.userId !== userId) {
      // on compare le userid de la requête à celui du token
      throw "User id non valable !";
    } else {
      next();
    }
  } catch (error) {
    console.log(error)
    //res.status(401).json({ error: new Error("Invalid request !") });
  }
};