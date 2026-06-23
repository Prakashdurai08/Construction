# MM Builders – React + Vite Website

A modern, fully responsive construction company website built with React + Vite.

---

## 📁 File Structure

```
your-vite-project/
├── index.html                  ← Replace your existing index.html
├── src/
│   ├── main.jsx                ← Replace your existing main.jsx
│   ├── index.css               ← Replace your existing index.css
│   ├── App.jsx                 ← Main app component
│   ├── App.css                 ← Global CSS variables + base styles
│   └── components/
│       ├── Loader.jsx / .css
│       ├── Navbar.jsx / .css
│       ├── Hero.jsx / .css
│       ├── Services.jsx / .css
│       ├── WhyUs.jsx / .css
│       ├── Projects.jsx / .css
│       ├── Process.jsx / .css
│       ├── Testimonials.jsx / .css
│       ├── Contact.jsx / .css
│       ├── CTABanner.jsx / .css
│       ├── Footer.jsx / .css
│       ├── WhatsAppButton.jsx / .css
│       └── BackToTop.jsx / .css
```

---

## 🚀 Setup Steps

### 1. Copy Files
Copy ALL files from this folder into your existing Vite + React project, maintaining the folder structure above.

### 2. Install & Run
```bash
npm install
npm run dev
```

---

## 📧 EmailJS Setup (Contact Form)

1. Sign up at https://emailjs.com (free tier is enough)
2. Create an **Email Service** (Gmail, Outlook, etc.)
3. Create an **Email Template** with these variables:
   - `{{fname}}` `{{lname}}` `{{email}}` `{{phone}}` `{{service}}` `{{message}}`
4. Open `src/components/Contact.jsx` and replace:
```js
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
```

---

## 📱 WhatsApp Button

Open `src/components/WhatsAppButton.jsx` and update:
```js
const WHATSAPP_NUMBER = "12125551234"; // Your number, no + or spaces
const WHATSAPP_MSG = "Hello! I'm interested in...";
```

---

## 🎨 Customization

| Thing to change       | File                          |
|-----------------------|-------------------------------|
| Brand name            | All `.jsx` files (search "MM Builders") |
| Colors / theme        | `src/App.css` → `:root` CSS vars |
| Stats (10+, 380+...)  | `src/components/Hero.jsx`     |
| Services list         | `src/components/Services.jsx` |
| Projects list         | `src/components/Projects.jsx` |
| Testimonials          | `src/components/Testimonials.jsx` |
| Contact info          | `src/components/Contact.jsx` + `Footer.jsx` |
| WhatsApp number       | `src/components/WhatsAppButton.jsx` |

---

## ✅ Features

- ⚡ Vite + React 18
- 📱 Fully mobile-first responsive
- 🎞️ Scroll reveal animations (IntersectionObserver)
- 🔢 Animated stat counters
- 🖼️ Project portfolio with filter (All / Residential / Commercial / Renovation)
- 💬 Auto-sliding testimonials with touch/swipe support
- 📩 Contact form with EmailJS integration
- 📲 WhatsApp floating button with pulse animation
- 🔝 Back to top button
- 🍔 Mobile hamburger menu with slide-in drawer
- 🌟 No extra dependencies beyond React + Vite
