module.exports = function (rolesPermitidos = []) {
  return function (req, res, next) {
    if (!req.usuario || !rolesPermitidos.includes(req.usuario.tipo)) {
      return res.status(403).json({ error: 'Acesso não autorizado.' });
    }
    next();
  };
};
