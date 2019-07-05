exports.isAdmin = (req, res, next) => {
  if(req.currentUser.role !== 'admin'){
    return res.status(400).json({message: 'Unauthorized'})
  }
  next();
}

exports.isSupporter = (req, res, next) => {
  if(req.currentUser.role !== 'supporter'){
    return res.status(400).json({message: 'Unauthorized'})
  }
  next();
}