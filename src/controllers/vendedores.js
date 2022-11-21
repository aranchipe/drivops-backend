const knex = require("../database/connection");
const {
  schemaCadastroVendedor,
} = require("../validations/schemaCadastroVendedor");

const cadastrarVendedor = async (req, res) => {
  const { nome, idade, email, cpf, telefone } = req.body;

  try {
    await schemaCadastroVendedor.validate(req.body);

    if (cpf.length !== 11) {
      return res
        .status(400)
        .json({ mensagem: "Escreva um CPF válido com 11 Dígitos" });
    }

    if (telefone.length !== 11) {
      return res.status(400).json({
        mensagem:
          "Escreva um número de telefone válido com DDD EX: 99985678967",
      });
    }

    const emailJaExistente = await knex("vendedores").where({ email });

    if (emailJaExistente.length > 0) {
      return res.status(400).json({ mensagem: "Email já cadastrado" });
    }

    const cpfJaExistente = await knex("vendedores").where({ cpf });

    if (cpfJaExistente.length > 0) {
      return res.status(400).json({ mensagem: "Cpf já cadastrado" });
    }

    const telefoneJaExistente = await knex("vendedores").where({ telefone });

    if (telefoneJaExistente.length > 0) {
      return res.status(400).json({ mensagem: "Telefone já cadastrado" });
    }

    const vendedorCadastrado = await knex("vendedores").insert({
      nome,
      idade,
      email,
      cpf,
      telefone,
    });

    if (vendedorCadastrado.length === 0) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possóvel cadastrar o vendedor" });
    }

    return res
      .status(200)
      .json({ mensagem: "Vendedor cadastrado com sucesso" });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const listarVendedores = async (req, res) => {
  try {
    const vendedores = await knex("vendedores").orderBy("id", "asc");

    return res.status(200).json(vendedores);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const atualizarVendedor = async (req, res) => {
  const { id } = req.params;
  const { nome, idade, email, cpf, telefone } = req.body;

  try {
    await schemaCadastroVendedor.validate(req.body);

    if (cpf.length !== 11) {
      return res
        .status(400)
        .json({ mensagem: "Escreva um CPF válido com 11 Dígitos" });
    }

    if (telefone.length !== 11) {
      return res.status(400).json({
        mensagem:
          "Escreva um número de telefone válido com DDD EX: 99985678967",
      });
    }

    const emailJaExistente = await knex("vendedores")
      .where({ email })
      .andWhere("id", "!=", id);

    if (emailJaExistente.length > 0) {
      return res.status(400).json({ mensagem: "Email já cadastrado" });
    }

    const cpfJaExistente = await knex("vendedores")
      .where({ cpf })
      .andWhere("id", "!=", id);

    if (cpfJaExistente.length > 0) {
      return res.status(400).json({ mensagem: "Cpf já cadastrado" });
    }

    const telefoneJaExistente = await knex("vendedores")
      .where({ telefone })
      .andWhere("id", "!=", id);

    if (telefoneJaExistente.length > 0) {
      return res.status(400).json({ mensagem: "Telefone já cadastrado" });
    }

    await knex("vendedores")
      .update({
        nome,
        idade,
        email,
        cpf,
        telefone,
      })
      .where({ id });

    return res
      .status(200)
      .json({ mensagem: "vendedor atualizado com sucesso" });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const excluirVendedor = async (req, res) => {
  const { id } = req.params;

  try {
    const vendedorEncontrado = await knex("vendedores").where({ id });

    if (vendedorEncontrado.length === 0) {
      return res.status(404).json({ mensagem: "Vendedor não encontrado" });
    }

    const vendedorExcluido = await knex("vendedores").del().where({ id });

    if (vendedorExcluido.length === 0) {
      return res
        .status(404)
        .json({ mensagem: "Não foi possível excluir o vendedor" });
    }

    return res.status(200).json({ mensagem: "Vendedor excluído com sucesso" });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = {
  cadastrarVendedor,
  listarVendedores,
  atualizarVendedor,
  excluirVendedor,
};
