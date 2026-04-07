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
      <div style="background-color: #f9fafb; padding: 40px 10px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #111827;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); border: 1px solid #e5e7eb;">
          
          <!-- Header -->
          <div style="background-color: #111827; padding: 32px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.025em; text-transform: uppercase;">
              New Inquiry
            </h1>
            <p style="color: #9ca3af; margin-top: 8px; font-size: 14px;">Incoming message from your portfolio website</p>
          </div>

          <!-- Body -->
          <div style="padding: 40px;">
            
            <div style="margin-bottom: 32px;">
              <label style="display: block; font-size: 12px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Sender Name</label>
              <div style="font-size: 18px; font-weight: 600; color: #111827;">${name}</div>
            </div>

            <div style="margin-bottom: 32px;">
              <label style="display: block; font-size: 12px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Email Address</label>
              <a href="mailto:${email}" style="font-size: 16px; color: #2563eb; text-decoration: none; font-weight: 500;">
                ${email}
              </a>
            </div>

            <div style="border-top: 1px solid #f3f4f6; padding-top: 32px;">
              <label style="display: block; font-size: 12px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">Message Content</label>
              <div style="background-color: #f3f4f6; padding: 24px; border-radius: 12px; font-size: 16px; line-height: 1.6; color: #374151; white-space: pre-wrap;">
                ${message}
              </div>
            </div>

            <div style="margin-top: 40px; text-align: center;">
              <a href="mailto:${email}" style="display: inline-block; background-color: #111827; color: #ffffff; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px;">
                Reply Directly
              </a>
            </div>

          </div>

          <!-- Footer -->
          <div style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #f3f4f6;">
            <p style="margin: 0; font-size: 12px; color: #9ca3af;">
              Sent via nanangmarvin.my.id
            </p>
          </div>

        </div>
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
