const token = require("../middleware/token");
const db = require("../models");
const fs = require("fs");

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await db.Post.findAll({
            attributes: ["id", "content", "attachment", "title", "createdAt"],
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: db.User,
                    attributes: ["firstname", "lastname", "id", "avatar"],
                },
                {
                    model: db.Like,
                    attributes: ["UserId"],
                },
                {
                    model: db.Comment,
                    attributes: ["message", "id", "createdAt", "PostId"],
                    order: [["createdAt", "ASC"]],
                    include: [
                        {
                            model: db.User,
                            attributes: ["avatar", "firstname", "lastname", "id"],
                        },
                    ],
                },
            ],
        });
        res.status(200).send(posts);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Une erreur est survenu lors de la récupération des posts.");
    }
};

exports.createPost = async (req, res) => {
    const idUser = token.getUserId(req);
    let attachment;

    try {
        const user = await db.User.findOne({
            attributes: ["firstname", "lastname", "id", "avatar"],
            where: {id: idUser},
        });
        if (user !== null) {
            if (req.file) {
                attachment = `${req.protocol}://${req.get("host")}/upload/${
                    req.file.filename
                }`;
            } else {
                attachment = null;
            }

            const post = await db.Post.create({
                include: [
                    {
                        model: db.User,
                        attributes: ["firstname", "lastname", "avatar", "id"],
                    },
                ],
                title: req.body.title,
                content: req.body.content,
                attachment: attachment,
                UserId: user.id,
            });

            const returnPost = await db.Post.findOne({
                where: {id: post.id},
                include: [
                    {
                        model: db.User,
                        attributes: ["firstname", "lastname", "avatar", "id"],
                    },
                    {
                        model: db.Like,
                        attributes: ["PostId", "UserId"],
                    },
                    {
                        model: db.Comment,
                        order: [["createdAt", "DESC"]],
                        attributes: ["message", "PostId"],
                        include: [
                            {
                                model: db.User,
                                attributes: ["avatar", "firstname", "lastname", "id"],
                            },
                        ],
                    },
                ],
            });

            res.status(201).json({post: returnPost, message: "Votre post a bien été créé !"});
        } else {
            res.status(400).send("Erreur");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send("Erreur serveur");
    }
};

exports.deletePost = async (req, res) => {
    try {
        const userId = token.getUserId(req);
        const checkAdmin = await db.User.findOne({where: {id: userId}});
        const post = await db.Post.findOne({where: {id: req.params.id}});
        if (userId === post.UserId || checkAdmin.isAdmin === true) {
            if (post.attachment) {
                const filename = post.attachment.split("/upload")[1];
                fs.unlink(`upload/${filename}`, () => {
                    db.Post.destroy({where: {id: post.id}});
                    res.status(200).send({message: "Post supprimé avec succès !"});
                });
            } else {
                db.Post.destroy({where: {id: post.id}}, {truncate: true});
                res.status(200).send({message: "Post supprimé avec succès !"});
            }
        } else {
            res.status(400).send("Vous n'avez pas les droits requis.");
        }
    } catch (error) {
        return res.status(500).send("Erreur serveur");
    }
};

exports.likePost = async (req, res, next) => {
    try {
        const userId = token.getUserId(req);
        const postId = req.params.id;
        const user = await db.Like.findOne({
            where: {UserId: userId, PostId: postId},
        });
        if (user) {
            await db.Like.destroy(
                {where: {UserId: userId, PostId: postId}},
                {truncate: true, restartIdentity: true}
            );
            res.status(200).send({message: "Vous n'aimez plus ce post."});
        } else {
            await db.Like.create({
                UserId: userId,
                PostId: postId,
            });
            res.status(201).send({message: "Vous aimez ce post."});
        }
    } catch (error) {
        return res.status(500).send("Erreur serveur");
    }
};

exports.addComment = async (req, res) => {
    try {
        const comment = req.body.message;

        const createdComment = await db.Comment.create({
            message: comment,
            UserId: token.getUserId(req),
            PostId: req.params.id,
        });

        const newComment = await db.Comment.findOne({
            where: {id: createdComment.id},
            attributes: ["message", "id", "createdAt", "PostId"],
            include: [
                {
                    model: db.User,
                    attributes: ["firstname", "lastname", "avatar", "id"],
                },
            ]
        })

        res.status(201).send({newComment, message: "Votre commentaire a été publié avec succès !"});
    } catch (error) {
        return res.status(500).send("Erreur serveur");
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const userId = token.getUserId(req);
        const checkAdmin = await db.User.findOne({where: {id: userId}});
        const comment = await db.Comment.findOne({where: {id: req.params.id}});

        if (userId === comment.UserId || checkAdmin.admin === true) {
            db.Comment.destroy({where: {id: req.params.id}}, {truncate: true});
            res.status(200).send({message: "Commentaire supprimé avec succès."});
        } else {
            res.status(400).send("Vous n'avez pas les droits requis.");
        }
    } catch (error) {
        return res.status(500).send("Erreur serveur");
    }
};