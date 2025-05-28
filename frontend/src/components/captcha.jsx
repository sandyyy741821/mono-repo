import React, { useState } from 'react';

function Captcha() {
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  // This function is called when Turnstile generates a token
  function onTurnstileSuccess(token) {
    setToken(token);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!token) {
      alert('Please complete the CAPTCHA');
      return;
    }

    // Send token to your backend for verification
    try {
      const response = await fetch('/functions/index', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          'cf-turnstile-response': token,
        }),
      });

      const text = await response.text();
      setMessage(text);
    } catch (err) {
      setMessage('Error verifying CAPTCHA');
    }
  }

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Cloudflare Turnstile CAPTCHA Test</h2>
      <form onSubmit={handleSubmit}>
        {/* Turnstile widget */}
        <div
          className="cf-turnstile"
          data-sitekey="0x4AAAAAABet_YrZDjLmY4xM"
          data-callback="onTurnstileSuccess"
        ></div>
        <br />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}

      {/* Load the Turnstile API script */}
      <script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      ></script>

      {/* Script to bind the callback */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            function onTurnstileSuccess(token) {
              window.dispatchEvent(new CustomEvent('turnstile-success', { detail: token }));
            }
          `,
        }}
      ></script>
    </div>
  );
}

export default Captcha;
