export default function handler(req, res) {
  try {
    // Check if environment variable exists
    const rawCreds = process.env.GOOGLE_CREDENTIALS;
    
    if (!rawCreds) {
      return res.json({
        error: 'GOOGLE_CREDENTIALS environment variable not found',
        env_vars_available: Object.keys(process.env).filter(key => key.includes('GOOGLE'))
      });
    }

    // Try to parse JSON
    let parsed;
    try {
      parsed = JSON.parse(rawCreds);
    } catch (parseError) {
      return res.json({
        error: 'GOOGLE_CREDENTIALS is not valid JSON',
        parse_error: parseError.message,
        raw_length: rawCreds.length,
        starts_with: rawCreds.substring(0, 50)
      });
    }

    // Check required fields
    const requiredFields = ['client_email', 'private_key', 'project_id'];
    const missingFields = requiredFields.filter(field => !parsed[field]);

    return res.json({
      success: true,
      credentials_found: true,
      json_valid: true,
      has_client_email: !!parsed.client_email,
      has_private_key: !!parsed.private_key,
      has_project_id: !!parsed.project_id,
      missing_fields: missingFields,
      client_email: parsed.client_email, // Safe to show email
      private_key_length: parsed.private_key ? parsed.private_key.length : 0,
      private_key_starts_with: parsed.private_key ? parsed.private_key.substring(0, 50) : 'N/A'
    });

  } catch (error) {
    return res.json({
      error: 'Debug failed',
      message: error.message
    });
  }
}