// middleware/authMiddleware.js
const authMiddleware = (req, res, next) => {
  if (req.session.user) {
    next(); // usuário autenticado, prossegue para a próxima função
  } else {
    res.redirect('/'); // se não estiver autenticado, redireciona para a página de login
  }
};

module.exports = authMiddleware;