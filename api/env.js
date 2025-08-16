export default function handler(req, res) {
  const rawCreds = process.env.GOOGLE_CREDENTIALS;
  
  return res.json({
    exists: !!rawCreds,
    length: rawCreds ? rawCreds.length : 0,
    first_char: rawCreds ? rawCreds[0] : null,
    last_char: rawCreds ? rawCreds[rawCreds.length - 1] : null,
    starts_with_brace: rawCreds ? rawCreds.startsWith('{') : false,
    ends_with_brace: rawCreds ? rawCreds.endsWith('}') : false,
    first_100_chars: rawCreds ? rawCreds.substring(0, 100) : null
  });
}