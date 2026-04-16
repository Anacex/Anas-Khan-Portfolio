# M. Anas Khan — Portfolio

React + Vite single-page portfolio with animated background, project cards, experience timeline, and a contact form.

## Contact form (email to your inbox)

Messages are sent through [Web3Forms](https://web3forms.com) when an access key is configured (free tier, no backend code).

1. Sign up at [web3forms.com](https://web3forms.com) and verify **anacekhanx@gmail.com** (or whichever address should receive mail).
2. Copy your access key.
3. In the project root, create `.env` (see `.env.example`):

   `VITE_WEB3FORMS_ACCESS_KEY=your_key_here`

4. Run `npm run dev` or rebuild with `npm run build`.

Without a key, **Submit** opens the visitor’s email app with **To**, **Subject**, and **Body** prefilled (same fields as the form).

## Scripts

- `npm run dev` — local dev server  
- `npm run build` — production build to `dist/`  
- `npm run deploy` — deploy to GitHub Pages (see `package.json` `homepage`)
