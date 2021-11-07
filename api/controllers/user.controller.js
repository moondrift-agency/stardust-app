const bcrypt = require('bcrypt');
const db = require('../models');
const token = require('../middleware/token');
const fs = require('fs');
const { Op } = require('sequelize');
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_KEY;

exports.signup = async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: { email: req.body.email },
    });
    if (user !== null) {
      if (
        (user.firstname === req.body.firstname) &&
        (user.lastname === req.body.lastname) 
      ) {
        return res
          .status(400)
          .json({ error: "Vous avez déjà un compte à votre nom !" });
      }
    } else {
      const hash = await bcrypt.hash(req.body.password, 10);
      const newUser = await db.User.create({
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        email: req.body.email,
        password: hash,
        isAdmin: false,
      });

      const tokenObject = await token.issueJWT(newUser);
      res.status(201).send({
        user: newUser,
        token: tokenObject.token,
        expires: tokenObject.expiresIn,
        message: `Votre compte est bien créé ${newUser.firstname} ${newUser.lastname} !`,
      });
    }
  } catch (error) {
    return res.status(400).send({ error: "Adresse email déjà utilisée" });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: { email: req.body.email },
    }); // on vérifie que l'adresse mail figure bien dan la bdd
    if (user === null) {
      return res.status(403).send({ error: "Connexion échouée" });
    } else {
      const hash = await bcrypt.compare(req.body.password, user.password); // on compare les mots de passes
      if (!hash) {
        return res.status(401).send({ error: "Mot de passe incorrect !" });
      } else {
        const tokenObject = await token.issueJWT(user);
        res.status(200).send({
          // on renvoie le user et le token
          user: user,
          token: tokenObject.token,
          sub: tokenObject.sub,
          expires: tokenObject.expiresIn,
        });
      }
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

exports.getUser = async (req, res) => {
  try {
    let dbId = undefined;

    if(req.params.id === undefined) {
      const token = req.headers.authorization.split(" ")[1];
      dbId = jwt.verify(token, secretKey).sub;
    } else if(req.params.id) {
      dbId = req.params.id;
    }

    const user = await db.User.findOne({
      where: { id: dbId },
    });

    res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

exports.getAllUsers = async (req, res) => {
  //return all users except admins
  try {
    const users = await db.User.findAll({
      attributes: [
        "id",
        "firstname",
        "lastname",
        "email",
        "avatar",
        "department",
        "job",
      ],
      where: {
        id: {
          [Op.ne]: 1,
        },
      },
    });
    res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

exports.updateAccount = async (req, res) => {
  console.log(req.body)
  // modifier le profil
  try {
    const userId = token.getUserId(req);
    let newAvatar;
    let user = await db.User.findOne({ where: { id: userId } });

    if (userId === user.id) {
      if (req.file && user.avatar) {
        newAvatar = `${req.protocol}://${req.get("host")}/upload/${
          req.file.filename
        }`;
        const filename = user.avatar.split("/upload")[1];
        fs.unlink(`upload/${filename}`, (err) => {
          //s'il y avait déjà un avatar on le supprime
          if (err) console.log(err);
          else {
            console.log(`Deleted file: upload/${filename}`);
          }
        });
      } else if (req.file) {
        newAvatar = `${req.protocol}://${req.get("host")}/upload/${
          req.file.filename
        }`;
      }
      if (newAvatar) {
        user.avatar = newAvatar;
      }
      if (req.body.firstname) {
        user.firstname = req.body.firstname;
      }
      if (req.body.lastname) {
        user.lastname = req.body.lastname;
      }
      if (req.body.department) {
        user.department = req.body.department;
      }
      if (req.body.job) {
        user.job = req.body.job;
      }
      const newUser = await user.save({ fields: ["firstname", "lastname", "avatar", "department", "job"] }); // on sauvegarde les changements dans la bdd
      res.status(200).json({
        user: newUser,
        messageRetour: "Votre profil a bien été modifié",
      });
    } else {
      res
        .status(400)
        .json({ messageRetour: "Vous n'avez pas les droits requis" });
    }

  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const id = token.getUserId(req);
    const user = await db.User.findOne({ where: { id: id } });

    if (user.avatar !== null) {
      const filename = user.avatar.split("/upload")[1];
      fs.unlink(`upload/${filename}`, () => {
        // sil' y a une photo on la supprime et on supprime le compte
        db.User.destroy({ where: { id: id } });
        res.status(200).json({ messageRetour: "utilisateur supprimé" });
      });
    } else {
      db.User.destroy({ where: { id: id } }); // on supprime le compte
      res.status(200).json({ messageRetour: "utilisateur supprimé" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};