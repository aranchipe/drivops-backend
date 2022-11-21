const knex = require("../database/connection");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Os campos usuario e senha são obrigatórios" });
  }

  try {
    const usuarioEncontrado = await knex("usuarios").where("usuario", usuario);

    if (usuarioEncontrado.length === 0) {
      return res.status(400).json({ mensagem: "Usuario ou senha incorretos" });
    }

    if (senha !== usuarioEncontrado[0].senha) {
      return res.status(400).json({ mensagem: "Usuario ou senha incorretos" });
    }

    const token = jwt.sign(
      {
        usuario: usuarioEncontrado[0].usuario,
        id: usuarioEncontrado[0].id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      }
    );

    return res.status(200).json({
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = {
  login,
};
