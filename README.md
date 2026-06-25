# n00dles.com

The marketing site for **n00dles** — open-source multi-agent AI orchestration. Built with Next.js
(App Router), TypeScript, and CSS Modules; deployed on Vercel.

- **Python package:** [`get-n00dles` on PyPI](https://pypi.org/project/get-n00dles/) (`pip install get-n00dles`, `import n00dles`)
- **Package source:** [github.com/n00dlehouse/n00dles-py](https://github.com/n00dlehouse/n00dles-py)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it. Each route has its own
`page.module.css`, server-only `metadata` export, and a dynamic `opengraph-image.tsx` — see
`app/<route>/` for the pattern.

## Build

```bash
npm run build
```

## Deploy

```bash
vercel --prod
```
