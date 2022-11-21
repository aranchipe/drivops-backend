create table usuarios (
  id serial,
  usuario text,
  senha text
)

create table carros (
  id serial primary key,
  modelo text,
  marca text,
  cor text,
  ano int,
  preco int,
  quantidade int
)

create table vendedores (
  id serial primary key,
  nome text,
  idade int,
  email text,
  cpf text,
  telefone text
)

create table vendas (
  id serial primary key,
  vendedor_id integer references vendedores (id),
  data timestamp,
  carro_id integer references carros(id),
  valor int
)