const bcrypt = require('bcryptjs');

const users = [
  { username: 'admin', password: '$2a$10$FEK3Y9WQzXGHdH/cU2n0A.SCcdodyxw0C9jNBaSt2sGourh1o6eJ6' } // senha: admin123
];

const password = 'admin123';
bcrypt.hash(password, 10, (err, hash) => {
  console.log(hash);
});

const renderLoginPage = (req, res) => {
  res.render('login', { message: '' });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  
  if (!user) {
    return res.render('login', { message: 'Usuário não encontrado' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    req.session.user = user.username;
    return res.redirect('/dashboard');
  } else {
    return res.render('login', { message: 'Senha incorreta' });
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

module.exports = {
  renderLoginPage,
  login,
  logout,
};