const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');

exports.valid = (req, res, next) => {
  // on vérifie le password et l'email
  const passwordSchema = new passwordValidator();
  passwordSchema
    .is()
    .min(10) // Minimum length 8
    .is()
    .max(20) // Maximum length 20
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .symbols(); // Has no symbols

  if (!passwordSchema.validate(req.body.password)) {
    return res.status(400).send({
      error:
        "Ton mot de passe doit contenir au minimum 10 lettres avec des minuscules et majuscules ainsi qu'au moins un symbole.",
    });
  } else if (!emailValidator.validate(req.body.email)) {
    return res.status(400).send({
      error:
        "Merci de vérifier ton adresse mail.",
    });
  } else if (
    emailValidator.validate(req.body.email) ||
    passwordSchema.validate(req.body.password)
  ) {
    next();
  }
};

//TODO : vérification prénom/nom
exports.checkPseudo = (req, res, next) => {
  // on vérifie le pseudo
  const regex = /^[a-z ,.'-]+$/i; // Lettres, espaces et doit être entre 4 et 30 caractères
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  if (regex.test(firstname) === true) {
    if(regex.test(lastname) === true) {
      next();
    } else {
      return res.status(400).send({
        error:
          "Votre nom doit être de 3 caractères minimum et 30 maximum, sont acceptées les lettres",
      });
    }
  } else {
    return res.status(400).send({
      error:
        "Votre prénom doit être de 3 caractères minimum et 30 maximum, sont acceptées les lettres",
    });
  }
};