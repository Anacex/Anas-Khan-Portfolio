import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

const TO_EMAIL = 'anacekhanx@gmail.com'

const initial = {
  name: '',
  email: '',
  phone: '',
  company: '',
  subject: '',
  message: '',
  botcheck: '',
}

export default function ContactForm() {
  const [values, setValues] = useState(initial)
  const [status, setStatus] = useState('idle')
  const [errorText, setErrorText] = useState('')

  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

  const onChange = (e) => {
    const { name, value } = e.target
    setStatus('idle')
    setErrorText('')
    setValues((v) => ({ ...v, [name]: value }))
  }

  const buildMailto = () => {
    const body = [
      `From: ${values.name} <${values.email}>`,
      values.phone ? `Phone: ${values.phone}` : null,
      values.company ? `Organization: ${values.company}` : null,
      '',
      values.message,
    ]
      .filter(Boolean)
      .join('\n')
    return `mailto:${TO_EMAIL}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setErrorText('')
    setStatus('idle')
    if (values.botcheck) return

    if (!values.name.trim() || !values.email.trim() || !values.subject.trim() || !values.message.trim()) {
      setErrorText('Please fill in your name, email, subject, and message.')
      return
    }

    const composedMessage = [
      values.company ? `Organization: ${values.company}` : null,
      values.phone ? `Phone: ${values.phone}` : null,
      '',
      values.message.trim(),
    ]
      .filter(Boolean)
      .join('\n')

    if (accessKey) {
      setStatus('sending')
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: accessKey,
            subject: values.subject.trim(),
            name: values.name.trim(),
            email: values.email.trim(),
            phone: values.phone.trim() || undefined,
            message: composedMessage,
            replyto: values.email.trim(),
            from_name: values.name.trim(),
          }),
        })
        const data = await res.json()
        if (data.success) {
          setStatus('success')
          setValues(initial)
        } else {
          setStatus('error')
          setErrorText(data.message || 'Something went wrong. Try again or use your email app below.')
        }
      } catch {
        setStatus('error')
        setErrorText('Network error. Check your connection or open the message in your email app.')
      }
      return
    }

    window.location.href = buildMailto()
    setStatus('success')
    setValues(initial)
  }

  return (
    <motion.form
      className="contact-form"
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      noValidate
    >
      <div className="contact-form-grid">
        <label className="contact-field contact-field--full">
          <span className="contact-label">To</span>
          <input type="email" className="contact-input contact-input--readonly" readOnly value={TO_EMAIL} tabIndex={-1} />
        </label>

        <label className="contact-field">
          <span className="contact-label">Your name</span>
          <input
            type="text"
            name="name"
            className="contact-input"
            autoComplete="name"
            value={values.name}
            onChange={onChange}
            placeholder="Jane Doe"
            required
          />
        </label>

        <label className="contact-field">
          <span className="contact-label">Your email</span>
          <input
            type="email"
            name="email"
            className="contact-input"
            autoComplete="email"
            value={values.email}
            onChange={onChange}
            placeholder="you@example.com"
            required
          />
        </label>

        <label className="contact-field">
          <span className="contact-label">Phone (optional)</span>
          <input
            type="tel"
            name="phone"
            className="contact-input"
            autoComplete="tel"
            value={values.phone}
            onChange={onChange}
            placeholder="+92 …"
          />
        </label>

        <label className="contact-field">
          <span className="contact-label">Organization (optional)</span>
          <input
            type="text"
            name="company"
            className="contact-input"
            autoComplete="organization"
            value={values.company}
            onChange={onChange}
            placeholder="Company or university"
          />
        </label>

        <label className="contact-field contact-field--full">
          <span className="contact-label">Subject</span>
          <input
            type="text"
            name="subject"
            className="contact-input"
            value={values.subject}
            onChange={onChange}
            placeholder="What is this about?"
            required
          />
        </label>

        <label className="contact-field contact-field--full">
          <span className="contact-label">Message</span>
          <textarea
            name="message"
            className="contact-textarea"
            rows={6}
            value={values.message}
            onChange={onChange}
            placeholder="Write your message here…"
            required
          />
        </label>
      </div>

      <input
        type="text"
        name="botcheck"
        className="contact-honeypot"
        tabIndex={-1}
        autoComplete="off"
        value={values.botcheck}
        onChange={onChange}
        aria-hidden
      />

      {!accessKey && (
        <p className="contact-form-hint">
          Add a free{' '}
          <a href="https://web3forms.com" target="_blank" rel="noopener noreferrer">
            Web3Forms
          </a>{' '}
          access key as <code className="contact-code">VITE_WEB3FORMS_ACCESS_KEY</code> in a{' '}
          <code className="contact-code">.env</code> file to send in-browser. Until then, submit opens your email app
          with this message filled in.
        </p>
      )}

      {errorText && (
        <p className="contact-form-error" role="alert">
          <AlertCircle size={18} aria-hidden />
          {errorText}
        </p>
      )}

      {status === 'success' && accessKey && (
        <p className="contact-form-success" role="status">
          <CheckCircle size={18} aria-hidden />
          Message sent. I will get back to you soon.
        </p>
      )}
      {status === 'success' && !accessKey && (
        <p className="contact-form-success" role="status">
          <CheckCircle size={18} aria-hidden />
          Your email app should open with the message ready. If it did not, check that a mail client is configured.
        </p>
      )}

      <div className="contact-form-actions">
        <button type="submit" className="cta-button primary contact-submit" disabled={status === 'sending'}>
          {status === 'sending' ? (
            <>
              <Loader2 className="contact-submit-icon spin" size={18} aria-hidden />
              Sending…
            </>
          ) : (
            <>
              <Send className="contact-submit-icon" size={18} aria-hidden />
              {accessKey ? 'Send message' : 'Open in email app'}
            </>
          )}
        </button>
      </div>
    </motion.form>
  )
}
