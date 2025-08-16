module.exports = function handler(req, res) {
  res.json({ 
    message: 'API is working!',
    timestamp: new Date().toISOString(),
    env_check: {
      google_creds: !!process.env.GOOGLE_CREDENTIALS,
      cron_secret: !!process.env.CRON_SECRET
    }
  });
}