const knex = require("../database/connection");
const vendaDeCadaVendedor = async (req, res) => {
  try {
    const vendaDeCadaVendedor = await knex
      .select("vd.nome as vendedor")
      .groupBy("vd.nome")
      .sum("valor")
      .from("vendas as v")
      .leftJoin("vendedores as vd", "vd.id", "v.vendedor_id");

    return res.status(200).json(vendaDeCadaVendedor);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const vendasPorMes = async (req, res) => {
  try {
    const vendasPorMes = await knex
      .select("mes")
      .sum("valor as soma")
      .groupBy("mes")
      .from("vendas")
      .orderBy("mes");
    return res.status(200).json(vendasPorMes);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const mediaPorMes = async (req, res) => {
  try {
    const mediaPorMes = await knex
      .select("mes")
      .avg("valor as media")
      .groupBy("mes")
      .from("vendas");

    return res.status(200).json(mediaPorMes);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = {
  vendaDeCadaVendedor,
  vendasPorMes,
  mediaPorMes,
};
