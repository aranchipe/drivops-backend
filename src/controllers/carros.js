const knex = require("../database/connection");
const { schemaCadastroCarro } = require("../validations/schemaCadastroCarro");

const cadastrarCarro = async (req, res) => {
  const { modelo, marca, cor, ano, preco, quantidade } = req.body;

  try {
    await schemaCadastroCarro.validate(req.body);

    const carroExistente = await knex("carros").where({ modelo, ano, cor });

    if (carroExistente.length > 0) {
      return res.status(400).json({ mensagem: "Carro já cadastrado" });
    }

    const carroCadastrado = await knex("carros").insert({
      modelo,
      marca,
      cor,
      ano,
      preco,
      quantidade,
    });

    if (carroCadastrado.length === 0) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possível cadastrar o carro" });
    }

    return res.status(200).json({ mensagem: "Carro Cadastrado com sucesso" });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const listarCarros = async (req, res) => {
  try {
    const carros = await knex("carros").orderBy("id");

    return res.status(200).json(carros);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const atualizarCarro = async (req, res) => {
  const { id } = req.params;
  const { modelo, marca, cor, ano, preco, quantidade } = req.body;

  try {
    await schemaCadastroCarro.validate(req.body);

    const carroEncontrado = await knex("carros").where({ id });

    if (carroEncontrado.length === 0) {
      return res.status(404).json({ mensagem: "Carro não encontrado" });
    }

    const carroJaExistente = await knex("carros")
      .where({ modelo, marca, cor, ano })
      .andWhere("id", "!=", id);

    if (carroJaExistente.length > 0) {
      return res.status(400).json({ mensagem: "Carro já cadastrado" });
    }

    await knex("carros")
      .update({
        modelo,
        marca,
        cor,
        ano,
        preco,
        quantidade,
      })
      .where({ id });

    return res.status(200).json({ mensagem: "Carro atualizado com sucesso" });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const deletarCarro = async (req, res) => {
  const { id } = req.params;

  try {
    const carroEncontrado = await knex("carros").where({ id });

    if (carroEncontrado.length === 0) {
      return res.status(404).json({ mensagem: "Carro não encontrado" });
    }
    const carroExcluido = await knex("carros").del().where({ id });

    if (carroExcluido.length === 0) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possível excluir o carro" });
    }

    return res.status(200).json({ mensagem: "Carro excluído com sucesso" });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = {
  cadastrarCarro,
  listarCarros,
  atualizarCarro,
  deletarCarro,
};
