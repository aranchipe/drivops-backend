const knex = require("../database/connection");
const { schemaCadastroVenda } = require("../validations/schemaCadastroVenda");
const { schemaAttVenda } = require("../validations/schemaAttVenda");
const {
  atualizarQuantidadeDeCarros,
} = require("../utils/atualizarQuantidadeDeCarros");

const cadastrarVenda = async (req, res) => {
  const { vendedor_id, data, carro_id, valor } = req.body;

  try {
    await schemaCadastroVenda.validate(req.body);

    const vendedorEncontrado = await knex("vendedores").where({
      id: vendedor_id,
    });

    if (vendedorEncontrado.length === 0) {
      return res.status(404).json({ mensagem: "Vendedor não encontrado" });
    }

    const carroEncontrado = await knex("carros").where({
      id: carro_id,
    });

    if (carroEncontrado.length === 0) {
      return res.status(404).json({ mensagem: "Carro não encontrado" });
    }

    if (carroEncontrado[0].quantidade == 0) {
      return res.status(400).json({ mensagem: "Carro esgotado" });
    }

    const vendaCadastrada = await knex("vendas").insert({
      vendedor_id,
      data,
      carro_id,
      valor,
      mes: new Date(data).getMonth() + 1,
    });

    if (vendaCadastrada.length === 0) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possível cadastrar a venda" });
    }

    atualizarQuantidadeDeCarros(carroEncontrado[0], "subtracao", carro_id);

    return res.status(200).json({ mensagem: "Venda cadastrada com sucesso" });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const listarVendas = async (req, res) => {
  try {
    const vendas = await knex
      .select(
        "v.id",
        "v.vendedor_id",
        "vd.nome as vendedor",
        "v.data",
        "v.carro_id",
        "c.modelo as modelo",
        "c.cor as cor",
        "c.ano as ano",
        "v.valor"
      )
      .from("vendas as v")
      .leftJoin("vendedores as vd", "vd.id", "v.vendedor_id")
      .leftJoin("carros as c", "c.id", "v.carro_id");

    return res.status(200).json(vendas);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const atualizarVenda = async (req, res) => {
  const { id } = req.params;
  const { vendedor_id, data, carro_id, valor } = req.body;

  try {
    await schemaAttVenda.validate(req.body);

    const vendaEncontrada = await knex("vendas").where({ id });

    if (vendaEncontrada.length === 0) {
      return res.status(404).json({ mensagem: "Venda não encontrada" });
    }

    const vendedorEncontrado = await knex("vendedores").where({
      id: vendedor_id,
    });

    if (vendedorEncontrado.length === 0) {
      return res.status(404).json({ mensagem: "Vendedor não encontrado" });
    }

    const carroEncontrado = await knex("carros").where({
      id: carro_id,
    });

    if (carroEncontrado.length === 0) {
      return res.status(404).json({ mensagem: "Carro não encontrado" });
    }

    if (carroEncontrado[0].quantidade === 0) {
      return res.status(400).json({ mensagem: "Carro esgotado" });
    }

    const vendaAtualizada = await knex("vendas")
      .update({
        vendedor_id,
        data,
        carro_id,
        valor,
      })
      .where({ id });

    if (vendaAtualizada.length === 0) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possível atualizar a venda" });
    }

    const carroErradoEncontrado = await knex("carros").where(
      "id",
      vendaEncontrada[0].carro_id
    );

    atualizarQuantidadeDeCarros(
      carroErradoEncontrado[0],
      "soma",
      vendaEncontrada[0].carro_id
    );

    atualizarQuantidadeDeCarros(carroEncontrado[0], "subtracao", carro_id);

    return res.status(200).json({ mensagem: "Venda atualizada com sucesso" });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const excluirVenda = async (req, res) => {
  const { id } = req.params;

  try {
    const vendaEncontrada = await knex("vendas").where({ id });

    if (vendaEncontrada.length === 0) {
      return res.status(404).json({ mensagem: "Venda não encontrada" });
    }

    const vendaExcluida = await knex("vendas").del().where({ id });

    if (vendaExcluida.length === 0) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possível excluir a venda" });
    }

    return res.status(200).json({ mensagem: "Venda excluída com sucesso" });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const excluirVendasDoVendedor = async (req, res) => {
  const { vendedor_id } = req.params;

  try {
    const vendasExcluidas = await knex("vendas").del().where({ vendedor_id });

    if (vendasExcluidas.length === 0) {
      return res
        .status(404)
        .json({ mensagem: "Não foi possível excluir as vendas" });
    }

    res.status(200).json({ mensagem: "Vendas excluídas com sucesso" });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const excluirVendasDoCarro = async (req, res) => {
  const { carro_id } = req.params;

  try {
    const vendasExcluidas = await knex("vendas").del().where({ carro_id });

    if (vendasExcluidas.length === 0) {
      return res
        .status(404)
        .json({ mensagem: "Não foi possível excluir as vendas" });
    }

    res.status(200).json({ mensagem: "Vendas excluídas com sucesso" });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = {
  cadastrarVenda,
  listarVendas,
  atualizarVenda,
  excluirVenda,
  excluirVendasDoVendedor,
  excluirVendasDoCarro,
};
