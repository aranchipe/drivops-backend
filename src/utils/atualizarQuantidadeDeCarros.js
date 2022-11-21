const knex = require("../database/connection");

const atualizarQuantidadeDeCarros = async (carro, operacao, id) => {
  await knex("carros")
    .update(
      operacao === "subtracao"
        ? {
            quantidade: carro.quantidade - 1,
          }
        : {
            quantidade: carro.quantidade + 1,
          }
    )
    .where("id", id);
};

module.exports = { atualizarQuantidadeDeCarros };
