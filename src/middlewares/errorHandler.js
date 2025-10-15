const errorHandler = (err, req, res, next) => {
  // --- Log the full error to the console for debugging ---
  console.error('❌ [Error Handler] ', {
    message: err.message,
    code: err.code,
  });

  // Handle known errors
  if (err.code === '42P01') {
    return res.status(500).json({ error: 'Database table does not exist' });
  }

  if (err.code === '23505') {
    return res.status(409).json({ error: 'Duplicate entry violates unique constraint' });
  }

  if (err.code === 'ECONNREFUSED') {
    return res.status(500).json({ error: 'Database connection refused' });
  }

  if (err.code === 'ENOTFOUND') {
    return res.status(500).json({ error: 'Database host not found' });
  }

  if (err.status === 400) {
    return res.status(400).json({ error: err.message || 'Bad Request' });
  }

  if (err.status === 404) {
    return res.status(404).json({ error: err.message || 'Not Found' });
  }

  res.status(500).json({
    error: 'Internal Server Error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
};

export default errorHandler;
