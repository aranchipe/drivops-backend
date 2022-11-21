const yup = require("./settings");

const schemaCadastroVendedor = yup.object().shape({
  nome: yup.string().required("O campo nome é obrigatório"),
  idade: yup.number().required("O campo idade é obrigatório"),
  email: yup.string().email().required("O campo email é obrigatório"),
  cpf: yup.string().required("O campo cpf é obrigatório"),
  telefone: yup.string().required("O campo telefone é obrigatório"),
});

module.exports = {
  schemaCadastroVendedor,
};
