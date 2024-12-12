function getToken(req) {
    const authHeader = req.headers['authorization'];
  
    if (!authHeader) {
      throw new Error('Token não encontrado');
    }
  
    const token = authHeader.split(' ')[1];
    return token;
  }
  
  module.exports = getToken;
  