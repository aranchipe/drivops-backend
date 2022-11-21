const yup = require("./settings");

const schemaAttVenda = yup.object().shape({
  vendedor_id: yup.number().required("O campo vendedor_id é obrigatório"),
  data: yup.date().required("O campo data é obrigatório"),
  valor: yup.number().required("O campo valor é obrigatório"),
});

module.exports = {
  schemaAttVenda,
};
