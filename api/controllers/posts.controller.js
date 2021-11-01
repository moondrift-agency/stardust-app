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
          attributes: ["message", "UserId", "id"],
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: db.User,
              attributes: ["avatar", "firstname", "lastname"],
            },
          ],
        },
      ],
    });
    res.status(200).send(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: "Une erreur est survenu lors de la récupération des posts ",
    });
  }
};

exports.getHotPosts = async (req, res) => {
  try {
    const posts = await db.Post.findAll({
      attributes: [
        "id",
        "content",
        "imageUrl",
        "title",
        "createdAt",
        [
          db.sequelize.literal(
            "(SELECT COUNT(*) FROM Likes WHERE Likes.PostId = Post.id)"
          ),
          "LikeCount",
        ],
      ],
      order: [[db.sequelize.literal("LikeCount"), "DESC"]],

      include: [
        {
          model: db.User,
          attributes: ["firstname", "lastname", "id", "avatar"],
        },
        {
          model: db.Like,
          attributes: ["PostId", "UserId"],
        },
        {
          model: db.Comment,
          order: [["createdAt", "DESC"]],
          attributes: ["message", "firstname", "lastname", "UserId", "id"],
          include: [
            {
              model: db.User,
              attributes: ["avatar", "firstname", "lastname"],
            },
          ],
        },
      ],
    });
    res.status(200).send(posts);
  } catch (error) {
    return res.status(500).send({
      error: "Une erreur est survenu lors de la récupération des posts ",
    });
  }
};

exports.getOnePost = async (req, res) => {
  try {
    const post = await db.Post.findOne({
      where: { id: req.params.id },
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
          attributes: ["message", "firstname", "lastname", "UserId"],
          include: [
            {
              model: db.User,
              attributes: ["avatar", "firstname", "lastname"],
            },
          ],
        },
      ],
    });
    res.status(200).json(post);
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

exports.createPost = async (req, res) => {
  const idUser = token.getUserId(req);
  let attachment;

  try {
    const user = await db.User.findOne({
      attributes: ["firstname", "lastname", "id", "avatar"],
      where: { id: idUser },
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

      res
        .status(201)
        .json({ post: post, messageRetour: "Votre post a bien été créé !" });
    } else {
      res.status(400).send({ error: "Erreur " });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const userId = token.getUserId(req);
    const checkAdmin = await db.User.findOne({ where: { id: userId } });
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (userId === post.UserId || checkAdmin.admin === true) {
      if (post.attachment) {
        const filename = post.attachment.split("/upload")[1];
        fs.unlink(`upload/${filename}`, () => {
          db.Post.destroy({ where: { id: post.id } });
          res.status(200).json({ message: "Post supprimé avec succès !" });
        });
      } else {
        db.Post.destroy({ where: { id: post.id } }, { truncate: true });
        res.status(200).json({ message: "Post supprimé avec succès !" });
      }
    } else {
      res.status(400).json({ message: "Vous n'avez pas les droits requis" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

exports.likePost = async (req, res, next) => {
  try {
    const userId = token.getUserId(req);
    const postId = req.params.id;
    const user = await db.Like.findOne({
      where: { UserId: userId, PostId: postId },
    });
    if (user) {
      await db.Like.destroy(
        { where: { UserId: userId, PostId: postId } },
        { truncate: true, restartIdentity: true }
      );
      res.status(200).send({ messageRetour: "Vous n'aimez plus ce post." });
    } else {
      await db.Like.create({
        UserId: userId,
        PostId: postId,
      });
      res.status(201).json({ messageRetour: "Vous aimez ce post." });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

exports.addComment = async (req, res) => {
  try {
    const comment = req.body.commentMessage;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const newComment = await db.Comment.create({
      message: comment,
      firstname: firstname,
      lastname: lastname,
      UserId: token.getUserId(req),
      PostId: req.params.id,
    });

    res
      .status(201)
      .json({ newComment, messageRetour: "votre commentaire est publié" });
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const userId = token.getUserId(req);
    const checkAdmin = await db.User.findOne({ where: { id: userId } });
    const comment = await db.Comment.findOne({ where: { id: req.params.id } });

    if (userId === comment.UserId || checkAdmin.admin === true) {
      db.Comment.destroy({ where: { id: req.params.id } }, { truncate: true });
      res.status(200).json({ message: "commentaire supprimé" });
    } else {
      res.status(400).json({ message: "Vous n'avez pas les droits requis" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};