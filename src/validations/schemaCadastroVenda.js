const yup = require("./settings");

const schemaCadastroVenda = yup.object().shape({
  vendedor_id: yup.number().required("O campo vendedor_id é obrigatório"),
  data: yup.date().required("O campo data é obrigatório"),
  carro_id: yup.number().required("O campo carro_id é obrigatório"),
  valor: yup.number().required("O campo valor é obrigatório"),
});

module.exports = {
  schemaCadastroVenda,
};
