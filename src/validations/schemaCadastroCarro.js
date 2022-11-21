const yup = require("./settings");

const schemaCadastroCarro = yup.object().shape({
  modelo: yup.string().required("O campo modelo é obrigatório"),
  marca: yup.string().required("O campo marca é obrigatório"),
  cor: yup.string().required("O campo cor é obrigatório"),
  ano: yup.string().required("O campo ano é obrigatório"),
  preco: yup.string().required("O campo preco é obrigatório"),
  quantidade: yup.string().required("O campo quantidade é obrigatório"),
});

module.exports = {
  schemaCadastroCarro,
};
