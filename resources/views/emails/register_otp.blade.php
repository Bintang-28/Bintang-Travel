<!DOCTYPE html>
<html>
<head>
    <title>Kode OTP Anda</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f5; padding: 40px; margin: 0;">
    <div style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin: 0 auto; border: 1px solid #e4e4e7;">
        <div style="background-color: #2563eb; padding: 32px; text-align: center; color: #ffffff;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">Bintang Travel</h1>
            <p style="margin: 4px 0 0 0; font-size: 12px; font-weight: 600; opacity: 0.9; letter-spacing: 1px; text-transform: uppercase;">PREMIUM CAR RENTAL</p>
        </div>
        <div style="padding: 40px; color: #18181b; line-height: 1.6;">
            <p style="font-size: 16px; margin: 0 0 24px 0;">Halo,</p>
            <p style="font-size: 16px; margin: 0 0 24px 0;">Terima kasih telah mendaftar di Bintang Travel. Gunakan kode verifikasi di bawah ini untuk mengaktifkan akun Anda:</p>
            <div style="background-color: #f1f5f9; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
                <span style="font-size: 36px; font-weight: 800; color: #2563eb; letter-spacing: 6px;">{{ $otp }}</span>
            </div>
            <p style="font-size: 14px; color: #71717a; margin: 0 0 8px 0;">Kode OTP ini hanya berlaku selama <strong>10 menit</strong>.</p>
            <p style="font-size: 14px; color: #71717a; margin: 0;">Jika Anda tidak merasa melakukan pendaftaran ini, harap abaikan email ini.</p>
        </div>
        <div style="background-color: #fafafa; border-top: 1px solid #f4f4f5; padding: 24px; text-align: center; color: #71717a; font-size: 12px;">
            &copy; 2026 Bintang Travel. All rights reserved.
        </div>
    </div>
</body>
</html>
