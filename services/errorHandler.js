const handleNotFound = (res, message = 'Not Found') => {
  res.status(404).json({ error: message });
};

const handleServerError = (res, message = 'Internal Server Error') => {
  res.status(500).json({ error: message });
};

const handleBadRequest = (res, message = 'Bad Request') => {
  res.status(400).json({ error: message });
};

module.exports = { handleNotFound, handleServerError, handleBadRequest };
