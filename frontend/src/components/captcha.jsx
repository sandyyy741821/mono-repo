import React, { useState, useEffect, useRef } from 'react';
import Home from './Home'; 

function Captcha() {
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [verified, setVerified] = useState(false); 
  const captchaRef = useRef(null);
  const widgetIdRef = useRef(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (widgetIdRef.current !== null) return;

    if (window.turnstile) {
      renderTurnstile();
      return;
    }

    if (!scriptLoadedRef.current) {
      scriptLoadedRef.current = true;
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      script.onload = renderTurnstile;
      document.body.appendChild(script);
    }

    return () => {
      if (window.turnstile && widgetIdRef.current !== null) {
        window.turnstile.reset(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, []);

  function renderTurnstile() {
    if (window.turnstile && captchaRef.current && widgetIdRef.current === null) {
      widgetIdRef.current = window.turnstile.render(captchaRef.current, {
        sitekey: '0x4AAAAAABet_YrZDjLmY4xM',
        callback: (token) => {
          setToken(token);
        },
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!token) {
      alert('Please complete the CAPTCHA');
      return;
    }

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

      if (response.ok) {
        setVerified(true);
      }
    } catch (err) {
      setMessage('Error verifying CAPTCHA');
    }
  }

  if (verified) {
    return <Home />;
  }

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Cloudflare Turnstile CAPTCHA Test</h2>
      <form onSubmit={handleSubmit}>
        <div ref={captchaRef}></div>
        <br />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Captcha;
