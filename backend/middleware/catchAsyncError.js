module.exports = asyncError => (req, res, next) => {
    try {
      return Promise.resolve(asyncError(req, res, next)); 
    } catch (err) {
      return next(err); 
    }
  };
  