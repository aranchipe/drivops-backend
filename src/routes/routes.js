const express = require("express");
const {
  cadastrarCarro,
  listarCarros,
  atualizarCarro,
  deletarCarro,
} = require("../controllers/carros");
const {
  vendaDeCadaVendedor,
  precoTotal,
  vendasPorMes,
  mediaPorMes,
} = require("../controllers/graficos");
const { login } = require("../controllers/usuario");
const {
  cadastrarVenda,
  listarVendas,
  atualizarVenda,
  excluirVenda,
  excluirVendasDoVendedor,
  excluirVendasDoCarro,
} = require("../controllers/vendas");
const {
  cadastrarVendedor,
  listarVendedores,
  atualizarVendedor,
  excluirVendedor,
} = require("../controllers/vendedores");

const { validarLogin } = require("../middlewares/validarLogin");
const rotas = express();

rotas.post("/login", login);

rotas.use(validarLogin);

// Carro

rotas.post("/carros", cadastrarCarro);
rotas.get("/carros", listarCarros);
rotas.put("/carros/:id", atualizarCarro);
rotas.delete("/carros/:id", deletarCarro);

// Vendedores

rotas.post("/vendedores", cadastrarVendedor);
rotas.get("/vendedores", listarVendedores);
rotas.put("/vendedores/:id", atualizarVendedor);
rotas.delete("/vendedores/:id", excluirVendedor);

// Vendas

rotas.post("/vendas", cadastrarVenda);
rotas.get("/vendas", listarVendas);
rotas.put("/vendas/:id", atualizarVenda);
rotas.delete("/venda/:id", excluirVenda);

rotas.delete("/vendas/:vendedor_id", excluirVendasDoVendedor);
rotas.delete("/vendas-carro/:carro_id", excluirVendasDoCarro);

// Gráficos

rotas.get("/grafico1", vendaDeCadaVendedor);
rotas.get("/grafico2", vendasPorMes);
rotas.get("/grafico3", mediaPorMes);

module.exports = rotas;
