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
      <div style="background-color: #0a0a0a; padding: 50px 10px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e8e8e8;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #121212; border-radius: 24px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); border: 1px solid rgba(255, 255, 255, 0.05);">
          
          <!-- Header Accent -->
          <div style="height: 6px; background: linear-gradient(to right, #414141, #121212);"></div>

          <!-- Main Content -->
          <div style="padding: 48px 40px;">
            
            <div style="margin-bottom: 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 900; letter-spacing: -0.05em; text-transform: uppercase;">
                Incoming Transmission
              </h1>
              <div style="height: 2px; width: 40px; background-color: #e8e8e3; margin: 16px auto 0;"></div>
            </div>

            <div style="margin-bottom: 32px;">
                <p style="margin: 0 0 8px; font-size: 10px; font-weight: 800; color: rgba(255, 255, 255, 0.3); text-transform: uppercase; letter-spacing: 0.2em;">From Identity</p>
                <div style="font-size: 20px; font-weight: 700; color: #ffffff;">${name}</div>
            </div>

            <div style="margin-bottom: 40px;">
                <p style="margin: 0 0 8px; font-size: 10px; font-weight: 800; color: rgba(255, 255, 255, 0.3); text-transform: uppercase; letter-spacing: 0.2em;">Electronic Mail</p>
                <a href="mailto:${email}" style="font-size: 16px; color: #e8e8e3; text-decoration: underline; font-weight: 500; opacity: 0.8;">
                  ${email}
                </a>
            </div>

            <div style="background-color: rgba(255, 255, 255, 0.03); padding: 32px; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.05);">
                <p style="margin: 0 0 12px; font-size: 10px; font-weight: 800; color: rgba(255, 255, 255, 0.3); text-transform: uppercase; letter-spacing: 0.2em;">Narrative</p>
                <div style="font-size: 16px; line-height: 1.8; color: #d1d1d1; white-space: pre-wrap;">
                  ${message}
                </div>
            </div>

            <div style="margin-top: 48px; text-align: center;">
              <a href="mailto:${email}" style="display: inline-block; background-color: #e8e8e3; color: #121212; padding: 20px 40px; border-radius: 16px; text-decoration: none; font-weight: 800; font-size: 14px; letter-spacing: 0.1em; text-transform: uppercase; box-shadow: 0 10px 20px rgba(0,0,0,0.2);">
                Respond Directly
              </a>
            </div>

          </div>

          <!-- Footer -->
          <div style="background-color: rgba(255, 255, 255, 0.02); padding: 32px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.05);">
            <p style="margin: 0; font-size: 11px; color: rgba(255, 255, 255, 0.2); letter-spacing: 0.05em;">
              Protocol Securely Dispatched via nanangmarvin.my.id
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
