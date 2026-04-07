import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, message, captchaToken } = await req.json();

    // Verify Cloudflare Turnstile
    const recaptchaResponse = await fetch(
      `https://challenges.cloudflare.com/turnstile/v0/siteverify`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${captchaToken}`,
      }
    );

    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success) {
      return new Response(JSON.stringify({ error: 'Verifikasi CAPTCHA gagal. Silakan coba lagi.' }), { status: 400 });
    }

    const html = `
      <div style="font-family: 'Inter', sans-serif; background-color: #f3f4f6; padding: 2rem; border-radius: 0.75rem; color: #111827;">
        <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem; color: #1f2937;">
          📬 Pesan Baru dari Website Anda
        </h2>
        <div style="background-color: #ffffff; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 2px 6px rgba(0,0,0,0.05); line-height: 1.6;">
          <p><strong>👤 Nama:</strong> ${name}</p>
          <p><strong>✉️ Email:</strong> ${email}</p>
          <p><strong>📝 Pesan:</strong></p>
          <blockquote style="margin-top: 1rem; padding-left: 1rem; border-left: 4px solid #9ca3af; color: #374151;">
            ${message.replace(/\n/g, '<br />')}
          </blockquote>
        </div>
        <footer style="font-size: 0.75rem; margin-top: 2rem; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 1rem;">
          Email ini dikirim otomatis dari formulir kontak <strong>nanangmarvin.my.id</strong>
        </footer>
      </div>
    `;

    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `Pesan dari ${name}`,
      html,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Gagal mengirim email' }), { status: 500 });
  }
}
