// Pages Router API route: Node/Cloudflare-compatible multipart proxy.
// Do not create on-disk temporary files or expose the server-side API key.
export const config = {
  api: {
    bodyParser: false,
  },
};

const MAX_AUDIO_BYTES = 20 * 1024 * 1024;
const MAX_UPLOAD_BYTES = MAX_AUDIO_BYTES + 64 * 1024;

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'Transcription is not configured' });
  }

  const contentType = req.headers['content-type'];
  if (typeof contentType !== 'string' || !/^multipart\/form-data\s*;/i.test(contentType)) {
    return res.status(415).json({ error: 'Multipart audio upload required' });
  }

  try {
    // Consume a limited body in memory. Request.formData is supported by the
    // Web runtime, avoiding filesystem dependencies on Cloudflare Workers.
    const chunks = [];
    let totalBytes = 0;
    for await (const chunk of req) {
      const bytes = typeof chunk === 'string' ? new TextEncoder().encode(chunk) : chunk;
      totalBytes += bytes.byteLength;
      if (totalBytes > MAX_UPLOAD_BYTES) {
        return res.status(413).json({ error: 'Audio file is too large' });
      }
      chunks.push(bytes);
    }

    const upload = new Request('https://localhost/internal-upload', {
      method: 'POST',
      headers: { 'Content-Type': contentType },
      body: new Blob(chunks, { type: contentType }),
    });
    const formData = await upload.formData();
    const audio = formData.get('file');
    if (!audio || typeof audio.arrayBuffer !== 'function' || audio.size === 0) {
      return res.status(400).json({ error: 'No audio file provided' });
    }
    if (audio.size > MAX_AUDIO_BYTES) {
      return res.status(413).json({ error: 'Audio file is too large' });
    }

    const upstreamBody = new FormData();
    upstreamBody.set('file', audio, audio.name || 'audio.webm');
    upstreamBody.set('model', 'whisper-1');
    upstreamBody.set('language', 'ar');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45_000);
    try {
      const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}` },
        body: upstreamBody,
        signal: controller.signal,
      });
      if (!response.ok) {
        console.error('Transcription upstream failed', { status: response.status });
        return res.status(502).json({ error: 'Failed to transcribe audio' });
      }

      const result = await response.json();
      if (typeof result.text !== 'string') {
        return res.status(502).json({ error: 'Failed to transcribe audio' });
      }
      return res.status(200).json({ text: result.text });
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    console.error('Transcription request failed', { message: error?.name || 'processing_error' });
    return res.status(500).json({ error: 'Failed to transcribe audio' });
  }
}
