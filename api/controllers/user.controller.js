const bcrypt = require('bcrypt');
const db = require('../models');
const token = require('../middleware/token');
const fs = require('fs');
const {Op} = require('sequelize');
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_KEY;

exports.signup = async (req, res) => {
    try {
        const user = await db.User.findOne({
            where: {email: req.body.email},
        });
        if (user !== null) {
            if (
                (user.email === req.body.email)
            ) {
                res.set('Content-Type', 'text/html');
                return res.status(400).send("Vous avez déjà un compte avec cette adresse mail !");
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
                message: `Votre compte a bien été créé !`,
            });
        }
    } catch (error) {
        return res.status(500).send("Erreur serveur");
    }
};

exports.login = async (req, res) => {
    try {
        const user = await db.User.findOne({
            where: {email: req.body.email},
        });
        if (user === null) {
            return res.status(403).send("Connexion échouée.");
        } else {
            const hash = await bcrypt.compare(req.body.password, user.password);
            if (!hash) {
                return res.status(401).send("Mot de passe incorrect.");
            } else {
                const tokenObject = await token.issueJWT(user);
                res.status(200).send({
                    user: user,
                    token: tokenObject.token,
                    sub: tokenObject.sub,
                    expires: tokenObject.expiresIn,
                    message: "Connexion réussie !"
                });
            }
        }
    } catch (error) {
        return res.status(500).send("Erreur serveur");
    }
};

exports.getUser = async (req, res) => {
    try {
        let dbId = undefined;

        if (req.params.id === undefined) {
            const token = req.headers.authorization.split(" ")[1];
            dbId = jwt.verify(token, secretKey).sub;
        } else if (req.params.id) {
            dbId = req.params.id;
        }

        const user = await db.User.findOne({
            where: {id: dbId},
        });

        res.status(200).send(user);
    } catch (error) {
        return res.status(500).send("Erreur serveur");
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
        return res.status(500).send("Erreur serveur");
    }
};

exports.updateAccount = async (req, res) => {
    try {
        let newAvatar;
        const senderUserId = token.getUserId(req);

        const user = await db.User.findOne({
            where: {
                id: senderUserId
            },
        });

        let userToModify;

        if ((parseInt(req.params.id) !== senderUserId) && user.isAdmin === false) {
            console.log("test 1")
            return res.status(400).send("Seul un administrateur peut modifier un autre compte.");
        } else if(user.isAdmin === true && (parseInt(req.params.id) !== senderUserId)) {
            console.log("test 2")
            userToModify = await db.User.findOne({
                where: {
                    id: parseInt(req.params.id)
                },
            });
        } else {
            console.log("test 3")
            userToModify = await db.User.findOne({
                where: {
                    id: senderUserId
                },
            });
        }

        if (req.file && userToModify.avatar) {
            newAvatar = `${req.protocol}://${req.get("host")}/upload/${
                req.file.filename
            }`;
            const filename = userToModify.avatar.split("/upload")[1];
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

        console.log(newAvatar)

        if (newAvatar) {
            userToModify.avatar = newAvatar;
        }
        if (req.body.firstname) {
            userToModify.firstname = req.body.firstname;
        }
        if (req.body.lastname) {
            userToModify.lastname = req.body.lastname;
        }
        if (req.body.department) {
            userToModify.department = req.body.department;
        }
        if (req.body.job) {
            userToModify.job = req.body.job;
        }
        const newUser = await userToModify.save({fields: ["firstname", "lastname", "avatar", "department", "job"]});
        res.status(200).send({
            user: newUser,
            message: "Votre profil été modifié avec succès.",
        });
    } catch (error) {
        return res.status(500).send("Erreur serveur");
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const senderUserId = token.getUserId(req);

        const user = await db.User.findOne({
            where: {
                id: senderUserId
            },
        });

        if ((parseInt(req.params.id) !== senderUserId) && user.isAdmin === false) {
            return res.status(400).send("Seul un administrateur peut supprimer un autre compte.");
        } else if (user.isAdmin === true && (parseInt(req.params.id) === user.id)) {
            return res.status(400).send("Un administrateur ne peut pas supprimer son propre compte.");
        } else {
            let userToDelete;

            userToDelete = await db.User.findOne({
                where: {
                    id: parseInt(req.params.id)
                }
            });

            console.log(userToDelete)

            if (userToDelete.avatar !== null) {
                const filename = userToDelete.avatar.split("/upload")[1];
                fs.unlink(`upload/${filename}`, () => {
                    // sil' y a une photo on la supprime et on supprime le compte
                    db.User.destroy({ where: { id: userToDelete.id } });
                    res.status(200).send({ message: "Compte supprimé avec succès." });
                });
            } else {
                db.User.destroy({ where: { id: userToDelete.id } }); // on supprime le compte
                res.status(200).send({ message: "Compte supprimé avec succès." });
            }
        }

    } catch (error) {
        return res.status(500).send("Erreur serveur");
    }
};