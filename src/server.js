var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
const session = require('express-session');


var enableHotReload = require("./hot-reload");
var exemploController = require("./controllers/exemplo");
var produtoController = require("./controllers/produto");

const authRoutes = require('./routes/authRoutes');


const app = express();

// Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// Configurações do seu app Express
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

console.log("Views path set to:", path.join(__dirname, "views"));

// Configuração de pasta pública
app.use(express.static(path.join(__dirname, "public")));


// Configuração da sessão
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

// Habilitar hot-reload
enableHotReload(app);

// Rotas
app.use('/', authRoutes);

// Rotas
// app.get("/", exemploController.mostrarTelaDeExemplo);

// app.get("/produto", produtoController.mostrarTela);
// app.post("/adicionar-produto", produtoController.adicionarProduto);

// Inicie o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
