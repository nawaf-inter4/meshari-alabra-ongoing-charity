# Deployment Guide

This guide helps families and non-developers publish a respectful memorial site for a loved one. You do not need to be a programmer — pick one button below, follow the short steps, and personalize the name and colors later.

This app is a full website (not a simple static page). It needs a host that can run Next.js, including the `/health` check, the installable PWA, and multilingual pages.

## Before you start (2 minutes)

1. Create a free [GitHub](https://github.com/) account if you do not have one.
2. Open this project on GitHub and click **Fork** (makes your own copy).
3. Decide the public site address you want later (for example `https://my-family-charity.example`). You can start with the free address your host gives you, then switch.
4. Keep [`.env.example`](./.env.example) open in another tab. It lists every setting you can change. For a first memorial launch, these matter most:

| Setting | What it means |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Final public site address (HTTPS, no trailing slash) |
| `NEXT_PUBLIC_SITE_NAME` | Full site title |
| `NEXT_PUBLIC_SITE_SHORT_NAME` | Short name for the home screen / PWA |
| `NEXT_PUBLIC_MEMORIAL_NAME` | Visible memorial heading |
| `NEXT_PUBLIC_DONATION_URL` | Where the donate button should go |
| `NEXT_PUBLIC_COLOR_BRAND` / `NEXT_PUBLIC_COLOR_ACCENT` | Brand and accent colors |

Full white-label steps: [WHITE_LABELING.md](./WHITE_LABELING.md).

> Important: values that start with `NEXT_PUBLIC_` are visible in the browser. Never put passwords or private keys there. Change them in the host’s environment settings, then **rebuild / redeploy** so the new values appear.

## One-click deploy badges

Same badges as the README. Choose the platform you prefer:

[![Deploy with Vercel](https://img.shields.io/badge/Deploy%20with-Vercel-black?style=flat&logo=vercel&logoColor=white)](https://vercel.com/new/clone?repository-url=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity&env=NEXT_PUBLIC_SITE_URL,NEXT_PUBLIC_SITE_NAME,NEXT_PUBLIC_SITE_SHORT_NAME,NEXT_PUBLIC_MEMORIAL_NAME,NEXT_PUBLIC_DONATION_URL,NEXT_PUBLIC_COLOR_BRAND,NEXT_PUBLIC_COLOR_ACCENT&envDescription=Public%20HTTPS%20site%20URL%20and%20memorial%20white-label%20values.%20See%20.env.example.&envLink=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/blob/sandbox/.env.example)
[![Deploy to Netlify](https://img.shields.io/badge/Deploy%20to-Netlify-00C7B7?style=flat&logo=netlify&logoColor=white)](https://app.netlify.com/start/deploy?repository=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity)
[![Deploy to Render](https://img.shields.io/badge/Deploy%20to-Render-46E3B7?style=flat&logo=render&logoColor=white)](https://render.com/deploy?repo=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity)
[![Deploy to Cloudflare](https://img.shields.io/badge/Deploy%20to-Cloudflare-F38020?style=flat&logo=cloudflare&logoColor=white)](https://deploy.workers.cloudflare.com/?url=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity)
[![Deploy on Railway](https://img.shields.io/badge/Deploy%20on-Railway-0B0D0E?style=flat&logo=railway&logoColor=white)](https://railway.com/new/template?template=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity)
[![Deploy with Docker](https://img.shields.io/badge/Deploy%20with-Docker-2496ED?style=flat&logo=docker&logoColor=white)](#docker)
[![Deploy on CranL](https://img.shields.io/badge/Deploy%20on-CranL-0F766E?style=flat&logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC%2FxhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAeGVYSWZNTQAqAAAACAAEARoABQAAAAEAAAA%2BARsABQAAAAEAAABGASgAAwAAAAEAAgAAh2kABAAAAAEAAABOAAAAAAAAAEgAAAABAAAASAAAAAEAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACfCVbEAAAACXBIWXMAAAsTAAALEwEAmpwYAAACmmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24%2BNzI8L3RpZmY6WVJlc29sdXRpb24%2BCiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ%2BCiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4xMTM8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24%2BMTE1PC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT4xPC9leGlmOkNvbG9yU3BhY2U%2BCiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY%2BCjwveDp4bXBtZXRhPgpYmAh5AAAEgUlEQVRYCcVXS0grVxg%2BJjHxEd8h1hcqxFc1IIJUF7WoIBQF0S6uiohdKOpOBLvoRnuL0JV10YVCXbmpC4WiriwUS2mrUlBBUYrigyZVqXivEaMm537%2F1DM3k5lJNNdyB4Zzzv%2F8zv%2Bf%2Bc8%2FjL3nJyqcf845yZiampqs0dHRqYeHh%2FbLy8t4g8FgfOCxqKgo7vf7fUlJSZ7s7Gx3TEzMv7Ozsx7Q78PZ1%2BX39vbaSkpKWux2%2B3eJiYmrMOoym82v8XKTycSNRiMHCGmkOb0AyMF%2FFRsbe5KcnPxzTk7OVxUVFR8vLS1ZdB0FM0ZGRhLz8%2FNfWq3WI3JEu4NMRC8BBCB%2FamrqOoC8QMSMwf4U6%2F7%2B%2FpT09PSfSFE4fRcAwgaNFDmHwzEGEAaFU7GgfCJ%2F3wQ6DzTwHHOKhtPp%2FFT4VIxdXV1p8fHxfz%2BHIz0bFE2bzfajZhTKysoaKOd6ys9Fj4uL%2B6e9vT0d9qRHzsfp6anT5%2FMJekQj0seysrIYNqKrf3d3Z9%2FZ2XEIAQkA5R%2FKH2IU9CeNKSkpDClky8vLbHt7m83MzDCkU9MGbfLq6qpEwaScJCQkLIL4pBSUl5fzsbExvre3BxNvHzjhOGy6thCll5CWiqCIlQGEZAUqnQWAsrq6OtbT08Nqa2sZcqqSdLlczO12q%2BiCgGinibkEYGpqyoxKZhNErRHFiXV2drKOjg5WXFysJSLTEBF2dnYmr4MnNzc38iGUAMzNzcXc3t4mBAvSGsDY6Ogo6%2BvrY2lpMnAtUZm2sbEhz7UmSFES6HT%2BfBIAhN9Er5ZwZmYmGxoaYrgLtNiatLW1NU16AJGMSQCkrwCfDY2aN%2BPFxQXb3NwM0A09RSTZ7u5uaCHcrsKfBCCUND4Z1traygYGBtj8%2FDw7OjoKJc5OTk7Y%2Fv5%2BSBkwlX4bGhrsCPEpGLqfjuChlPLGxkY%2BPT2NrKmfhYWFsDZwO%2F4GTTOhlJA8NA6Pah7Oz8%2FZ4uIiw83Jtra2yIbieUy64PwOSgT0PwAI8Q1uqtcKS2EWXq%2BXTUxMqKRWV1dVNA0C%2BXpb94HIhILyC4hhwxcoAx2OHct58Hg8vKioKKwNfFnfQ0k69OIw%2BPAlXGggDUm6vr5mk5OTsgwd0OPjY3mtN0FtcSl4hCYjI%2BNbEMOiD5ZB78dRyPjBwQHv7u4OqU%2F9APWOhYWFLxQAaJGXl%2Fc5dUORtGCkg8Y1pHMB3GKxXNfX1xeqAFRXVzvBvBWC%2F9eI1v0POnMqAOvr69G413%2BPJAKPBUsRRqS%2FUDkXhNLS0s%2Boe32swafKYfd%2FtbS02IU%2F1YjQGAsKCr5EVfQK4%2B8SEaFLOyfnVVVVH6mcBhMAwlBZWfkJ%2Fg9%2BQFt1FmmjSs7pTwkNzG5ubu7XbW1tmcG%2BaK15AxKDgDQ3N3%2BAm60S%2F4LVKDIOGKXw2dFYWh8OktCntPngkCqcGzt2489qEzX%2FVzQxfw4PD189RANs5SMMKKkaKzgkWdP4%2BLhpZWXFAoNGdDYGOGL39%2Fd%2B8H01NTXewcFBqvM%2BPYcapt8v6Q2F8eXvclQWKwAAAABJRU5ErkJggg%3D%3D&logoColor=white)](https://app.cranl.com)
[![Deploy with Coolify](https://img.shields.io/badge/Deploy%20with-Coolify-111827?style=flat&logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACshmLzAAACj0lEQVRYCe1WO2sUURT%2BzszsBuNGJNlGAykUEbIgGLATCVsoNiJK%2FAMWFkbEB5Yy%2FgAjKDZikcomYAg20UK2NLYpfDSKoCJqY2RfM%2Fdev7tm3XF3ZnbWNAH3wN2Zvfec737ncc9cYCjDCPzvEZCsAVg4Y85DcFJrqKw24sA1BqvXH8vDJBsvaaF73gBH8i7OhpkpAy51A4VdC3Nm7eqSrHdj2v9O3GTCnKY30AMMRV0jmIJGmSQmfd%2F07JcYgftzptAIMM1NPbitfTdChVfEnCDBRLsoeeZKxCAkxpQI9qGCL1zXUZ1EoFqAg8bFCimPwXpicJPeXOT7cQLsISBn%2B4jVsCkT1LSK108kwOQ4tC3wZ6fFcQyOkcRLz8MiwaazVqJLY02yJBzG0U0m8Fv7T94JMMkxE2o8Gyvi6Y9ay7c4zL%2FmLNHROuRrHdqv9J6gfgSiYA6LqkAS%2BQsPpBpd2Mp7T1WmgTEl%2FfOeBhCzNhCBGPstTw0JbN8IKA2xXZBVz3a2mWqeZQnjz%2FO%2FFkMbusf%2B3imzt%2Blhnk3kKBcnWooGn9ha37BJfSa5RNs2GI%2BMR70XN5ZltT3X%2FUwF8WeNN1pEme1jhh3xnOfgcAsg1aqzBfVRD%2FAk52L%2B8pJ86Kx03lJrwK9IWP2G5zlghd68tz4zNVBsb1lGk82XEdjP54k7p81uY7%2BNXZJKwOpaEleW8ZoReMvLyE8SqXE0sgxybZJ0jheTA4GD0q1Zfle7JGMrFtNwzO18iHXmv8x%2BWGRhkkMGkc3%2Br%2BLvHj0hSYPkpWIHv%2BYlRqJEw0wE6L0YxYw5eFc9hDXf5zmKyEAErN3dS2Zk4yPGWViZCFibnIKoEQTXHuG72CvKUIYR2E4R%2BAUZtws3z61%2BQAAAAABJRU5ErkJggg%3D%3D&logoColor=white)](https://app.coolify.io)
[![Deploy with Dokploy](https://img.shields.io/badge/Deploy%20with-Dokploy-0284C7?style=flat&logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACshmLzAAAIQUlEQVRYCcVXaUyVZxY%2BXDYBARcoAsEVROOGVXFQXIaqVHBpdPwhCoLoj8HIjPJDa%2BOANCpip2sEkynjADZulA4gjI1msGjL6mhHZFwiZSd2VJAWFIF75jyH3k9Q2zSZNP2Sl3vv%2B33f%2B57znOc8z4vV06fdTL%2FiZfoV99atf9EArKysyNra%2Bidz%2FMUCwOZPnjyh2tpaDcJkenErPPPCrI2NDdna2v3IsCW89HMubHjnzh2KjIyiiooK6u3tNdCw7GEyWZGVhYRYGKOmpoYaGhqIf6Am9gOMGC4uLjRp0iRydXWV%2B0x9fX36%2BbKAEEBzczMFBs6VZGxp%2Fvz59NZbe2jq1KlUXV1NdXX1VFxcTIQAent7uL29jePjt%2FOwYcN4%2BPDhPGLEiBcG7vn5%2BXJKykGuqbmh70kgjDWeHz09T2XuKSckJCAVHSEhv%2BWkpCR2d3fjIUOG6JwiAEgyMjIoPv4PtHPnDpo5c6ZmZmVlIsAkC5HZzNTV1UlffvkVnTp1iiRAWrp0KW3eHENBQUGKEBAxm80GIECtqamJtm%2FfTgUFZwehZW9vL%2FvF9yNgNvfxqlUrecWKFfz4cReS0quhoZ4%2F%2F%2Fwcd3Z%2Bb5nSTMvKSnnjxo38yisePHSoM0dHb%2BLi4n8qingQiFoQwdoSOO%2Ffv58lUZ4%2BfRpHRkayJMHd3U9YS4CHFixYwNu2bTM2wpecnByeO3cu19belV9mXRTQWr5fu3aVDx48wKNHj5ZAhvJrr4VwWtoRbm1tMZ5FMFVVlbxw4UL29fXlW7duYmm5zIy1jBKEhISQm5sb7du3T8jY3xx9fb0K28SJE8nefogwuceAEYRF6WQlamlpoczMTDpx4oS03Tfk4OCgZPP09KS2tjYqKyvTMmZnZ9Hatb8T8vavi3cNBEJDQ4UYDpqNj48PY4wZM4anTZvGERHruaCgYEB5zCyLKNTIENngunevlQsLCzk5OZkXL15skM%2FLy5OPH8%2F%2BgbRmfvjwAXd0PFIEbCyMkc0kIxO9%2FnoojRo1SkSkW8ZjbZdLly5Tbu5nBJQiIzdqdu7u7uTo6GiQD6Lz3Xffa%2FY9PT2qAWhXCYQSE%2F8kxH6VHjy4T3l5%2BSR8oOjoaNq7d%2B8zBC5cuMBSAq1jYeFZIytkKNrAR44c4RkzZrCIFHt5efHs2bN42bJlHB4ezqGhy5QrQAxcQAtv3bqVz58%2FrwQEx%2FLy%2Fs7z5s2T9205LCyMr1y5oogoB1BP1Coj46%2BUnZ1Nt2%2FfJiENxcX9noScJGxXoAQ2Kim5ROfO%2FYPu3q2ljo4OVThwwcXFmSQweX4hCRnJx2e08MOsKvjBBx%2FS6dOnyc%2FPj7Zs2UIrV64gb29v4ZV9PwKoZ1xcnGYkROGPP%2F6LZDud7ezseNasWfzOO4e5paXZQAX1Rgu1tT3k%2B%2Ff%2Fq5%2F4bbmQcUVFuXAnQkVt5Eg36ZaDOpeYmCi8mqqI4nmDhEuWLFHSCHP5k0%2BOc2NjAx8%2BfFgDgGpJxLx79y7Oz8%2Fj69f%2Fzc3NTbrxo0ftSipoRmVlhZDtOG%2FYsIGlE7QUEREb%2BOuvr%2FHFi8UcGBhoEHPPnjc1XiOATZs28eTJk7U%2BeHn9%2BvVcV%2FeNbnL27FkWxdMFUWNPTy%2BeMmWK1hT6ERT0GxaPEIl1V4kdN24cC8EYOoHOQOBCSBYfYFFa%2Ff7RRx9qANoFMJzAwDmUn59Pb7%2BdTAEBAXT06FESooguJNHq1atJyEbJyU108eIXVFlZqUbT2dmpHLC3d6GxY8fS%2BPET1HSCg4PJycmRSktLKSoqWk1n7dq1lJCwk06ePKnmFBDQL%2FcGApBXcTuFOisri0tKSnjRokXKA5jImTNntHc1bP1jVh5AuvvV0XLHrJnHxMSws7Oz6smpUyd1DlIv3iIdNFvlHe9pAGi1b7%2B9x2KZWiOQLykpkevr6zg19RCLEsqLJuUDRCYn5wyXln6lXLhxo5qvXv2XekZ6ejqvW7fOqH9UVCRXV1%2BXZL7QTbE5nPHAgQMSbb%2B0awAwDjBX4NeM58yZw05OTtLfoWq7TU2NjO7Ab3DA0useHh6MAZajxiJMygUEiT6HiaWnpymyqD%2B0Q0ROSYnOw77GgQTW2draSsuXh5GQiIKDF9C77%2F5Z65WamkrilqJ8TiSoUHl5hWjFLdUOnHQwL4ZE0rLCnxlkZ2dPN2%2F%2Bh1JSDpGUk954YzWtWbOGdu9%2Bk0S8SJASBTX1%2B4rFNvGJKzc3VyHE4URMRJUOXQE%2BAAWUyqL9%2BsKAP7BdtOK2bXGilp6K1KFDKeqAIuPs7%2B%2FPErj4SJ9h14YXQOqECxQWtpxiYzdTWlo6jRkzVlzub%2Bp0mZlZot8x4hMequ%2F%2B%2FpNITkhyYDFRd3e3dgVcTwRIVNFVu0HaTzpjvKjfVqqqqtIO8PObSEI%2BVVb9MxABfEdtoHBQRpAxNjZWs4biwSPkdKP9jGObZeCoBn8IDw9j9Df6H8pYXl6uxHV1deFjx46p9oP5A%2Fc0SDhwEoTEGXHHjj8qjDARlKa9%2FaECjvsoBc6FUDkcWAaemqCi77%2F%2FnpBzpFp6bu6n%2Bt7zm2PPlwaAG2hNsWMuKirUFgIP4Ia7du3iy5cviRQ3G1IsNqstW1RUpIhBCdERYrkaJAIemODA70YXPCvKs2%2F9px5bEviVzfn5BXJsvyG%2FHxBOO97eXnpSgiI2NjZqV4hnSDe8SiLl0jmr1PFwPvix6ycDsLwEollb25CURdqwXq0YgeBs39XVpf8v%2BPpOIPEHmjBhvFqxg4PjoCOcZa3nP39WAJaXEAgGkJGiWqb1E3O4cCzHeP6%2B3nzJn0Ft%2BJL7g6Ysiw%2Ba%2FD9%2F%2FA%2Bif%2F7LELCzQAAAAABJRU5ErkJggg%3D%3D&logoColor=white)](https://app.dokploy.com)

---

## Vercel

Best when you want the simplest Next.js hosting.

1. Click **Deploy with Vercel** above (or in the README).
2. Sign in with GitHub and import this repository (or your fork).
3. Fill the prompted values — at least `NEXT_PUBLIC_SITE_URL` (use the Vercel URL first if you do not have a custom domain yet, then update and redeploy).
4. Click **Deploy** and wait for the build to finish.
5. Open `/health` on your new site. You should see `{"status":"ok"}`.

Checked-in helper: [`vercel.json`](./vercel.json) configures installation, build behavior, PWA cache headers, and **which Git branches deploy**.

For the original Meshari project:

1. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin (**Production** scope → `https://meshari.charity`). Optionally set Preview scope to `https://sandbox.meshari.charity` so sandbox builds embed the sandbox origin.
2. Add other white-label values in Project Settings → Environment Variables.
3. **Production** Git branch: `main` only (Project Settings → Git → Production Branch). Serves [meshari.charity](https://meshari.charity).
4. **Ignored Build Step** (Project Settings → Git → Ignored Build Step): set the command to:

   ```bash
   bash scripts/vercel-ignore-build.sh
   ```

   That script **skips** production builds on promote/other `main` commits and **builds only** when Release Please merges `chore: release v*`. Sandbox always builds Preview. This avoids a double production deploy (promote + release).
5. **Preview / Sandbox**: only the `sandbox` Git branch is enabled for automated deployments. `git.deploymentEnabled` in `vercel.json` sets `main` + `sandbox` to `true` and `"**": false` so feature branches do **not** create Preview deployments.

### Custom domains (stable aliases)

Every deployment still gets a unique `*.vercel.app` URL. That is normal. Custom domains are **aliases** that always point at the latest matching deployment. Configure them as **project domains** (not one-off “Assign Domain” on a single deployment):

| Domain | Environment / assignment | Git branch |
| --- | --- | --- |
| [meshari.charity](https://meshari.charity) | Production | `main` (production branch) |
| [www.meshari.charity](https://www.meshari.charity) | Production redirect → `meshari.charity` (307) | — |
| [sandbox.meshari.charity](https://sandbox.meshari.charity) | Preview → **Git Branch** | `sandbox` |

#### Exact UI steps (Vercel Dashboard)

1. Open the project → **Settings** → **Domains**  
   (`https://vercel.com/nawafinter4s-projects/meshari-alabra-ongoing-charity/settings/domains`).
2. **Production apex**
   - Add / keep `meshari.charity`.
   - Connect to **Production** (no Git Branch field — Production tracks the production Git branch, which must be `main`).
   - Do **not** point this domain at a single past deployment alias only.
3. **www**
   - Keep `www.meshari.charity` as a **redirect** to `meshari.charity` (308/307), or assign it to Production if you prefer serving www directly. Current project setup redirects www → apex.
4. **Sandbox branch domain**
   - Add `sandbox.meshari.charity` if missing.
   - Edit the domain → **Connect to an environment** → **Preview**.
   - In **Git Branch**, enter exactly `sandbox` (case-sensitive).
   - Save. After the next successful `sandbox` deploy (or the current one if already Ready), the domain aliases that deployment automatically.
5. Confirm DNS at your registrar still uses Vercel’s records (or Vercel nameservers). Do not change production DNS while only adjusting the Git Branch assignment in the Domains UI.

#### Verify via API / CLI (optional)

```bash
# Project domains should show gitBranch: "sandbox" for sandbox.meshari.charity
# and gitBranch: null for meshari.charity (Production)
npx vercel project ls --scope nawafinter4s-projects
```

Or `GET /v9/projects/{id}/domains` with a Vercel token: `sandbox.meshari.charity` must have `"gitBranch": "sandbox"`; production domains must have `"gitBranch": null`.

### What GitHub shows vs stable URLs

- **GitHub Checks / Vercel “Visit” links** often open the unique deployment URL (`*.vercel.app` or `*-git-*-*.vercel.app`). That does **not** mean the custom domain is missing.
- The **stable** URLs to bookmark and share are:
  - Production: `https://meshari.charity`
  - Sandbox: `https://sandbox.meshari.charity`
- Deployment detail pages may show **Assign Domain** / alias messaging for that single deployment. Prefer project **Settings → Domains** with a Git Branch (above) so every new `sandbox` or `main` deploy updates the stable hostname automatically.
- **GitHub Environments** (`Preview` / `Production`): Vercel creates these and attaches each deployment’s unique URL. GitHub does not replace those with your custom domain. There is no reliable repo setting that forces Checks to show `meshari.charity` / `sandbox.meshari.charity` instead of `*.vercel.app`. Use the Environments list for deploy history; use the custom domains as the public aliases.
- If Preview **Deployment Protection** / Vercel Authentication is enabled, `*.vercel.app` Preview URLs (and sometimes Preview access) may require team login. Production custom domains stay public; adjust Project Settings → Deployment Protection if sandbox collaborators need unauthenticated access to `sandbox.meshari.charity`.

### Recommended flow

1. Always branch from `sandbox`.
2. Feature/fix PR → `sandbox` (full CI once: quality + security). After merge, Vercel Preview updates from `sandbox` and the `sandbox.meshari.charity` branch domain follows that deploy.
3. Promote `sandbox` → `main` with a conventional title (`fix:` / `feat:`) using [`scripts/promote-sandbox-to-main.sh`](./scripts/promote-sandbox-to-main.sh). Promote **lands commits for Release Please** — with the Ignored Build Step above it does **not** trigger a production deploy by itself.
4. Merge the Release Please PR (`chore: release vX.Y.Z`) on `main` — **that** is the single production deploy + GitHub release/tag.
5. Do **not** sync `main` → `sandbox` after a release. Sandbox remains the integration tip; promote again when the next batch is ready. Version files sync via `.github/workflows/sync-release-to-sandbox.yml`.

`sandbox` is protected and must not be deleted. Delete feature branches after they are fully merged.

CLI (optional, for developers):

```bash
npx vercel
npx vercel --prod
```

## Netlify

1. Click **Deploy to Netlify**.
2. Connect GitHub and choose this repository (or your fork).
3. In Site configuration → Environment variables, set at least `NEXT_PUBLIC_SITE_URL` and the memorial name fields from [`.env.example`](./.env.example).
4. Deploy, then check `/health`.

Checked-in helper: [`netlify.toml`](./netlify.toml) (Node 22, Next.js runtime). Do not upload this app as a static folder.

## Render

1. Click **Deploy to Render**.
2. Render reads [`render.yaml`](./render.yaml) and builds the [`Dockerfile`](./Dockerfile).
3. When prompted, set `NEXT_PUBLIC_SITE_URL` and any other white-label values (they are build-time).
4. After the first deploy succeeds, open `/health`.
5. Turn on automatic deploys only after your environment values look correct.

## Cloudflare Workers

This app uses Cloudflare **Workers** with OpenNext — not plain Cloudflare Pages static export.

1. Click **Deploy to Cloudflare**.
2. Accept the detected build/deploy commands (`npm run build` / `npm run deploy`) or Cloudflare’s OpenNext defaults.
3. Set build-time variables, especially `NEXT_PUBLIC_SITE_URL`.
4. Smoke-test `/health`, `/manifest.webmanifest`, and one LTR + one RTL language page.

Checked-in helpers: [`wrangler.jsonc`](./wrangler.jsonc), [`open-next.config.ts`](./open-next.config.ts).

## Railway

Railway builds this repo with the included Dockerfile and health check.

1. Click **Deploy on Railway** (uses Railway’s template-from-GitHub flow).
2. Sign in with GitHub and confirm the project.
3. Before or right after the first deploy, open **Variables** and add at least:

   ```dotenv
   NEXT_PUBLIC_SITE_URL=https://your-railway-domain.up.railway.app
   NEXT_PUBLIC_SITE_NAME="Our Family Ongoing Charity"
   NEXT_PUBLIC_SITE_SHORT_NAME="Family Charity"
   NEXT_PUBLIC_MEMORIAL_NAME="Name of your loved one"
   NEXT_PUBLIC_DONATION_URL=https://example.org/donate
   ```

4. Trigger a redeploy so build-time values are baked into the site.
5. In **Settings → Networking**, generate a public domain if Railway did not create one.
6. Visit `/health` — expect `{"status":"ok"}`.

Checked-in helper: [`railway.json`](./railway.json) (Dockerfile builder, `/health`, restart on failure).

## Docker

Use Docker when you have a VPS, home server, or any host that runs containers. One command builds and starts the memorial site.

### One-command Compose (recommended)

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) (or Docker Engine + Compose).
2. Copy the example settings:

   ```bash
   cp .env.example .env.local
   ```

3. Edit `.env.local` — set at least `NEXT_PUBLIC_SITE_URL`, site name, memorial name, donation URL, and colors.
4. From the project folder, run:

   ```bash
   docker compose --env-file .env.local up --build -d
   ```

5. Open [http://localhost:3000/health](http://localhost:3000/health) (or your server’s address on port 3000).

`--env-file .env.local` is required so white-label values are available **during the image build**. Changing only runtime env without rebuilding will not update the browser bundle.

Checked-in helpers: [`Dockerfile`](./Dockerfile), [`compose.yaml`](./compose.yaml).

### Direct `docker build`

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://charity.example \
  --build-arg NEXT_PUBLIC_SITE_NAME="Example Ongoing Charity" \
  --build-arg NEXT_PUBLIC_MEMORIAL_NAME="Beloved name" \
  --build-arg NEXT_PUBLIC_DONATION_URL=https://example.org/donate \
  -t ongoing-charity .
docker run --rm -p 3000:3000 ongoing-charity
```

The image runs as a non-root user, listens on port `3000`, and includes a `/health` check.

## CranL

[CranL](https://cranl.com/) is a hosted PaaS (not the same product as Coolify). It deploys from GitHub and can build this repo with the root `Dockerfile`. There is no public “paste repo URL” button yet, so the badge opens the CranL app; then follow these steps:

1. Open [app.cranl.com](https://app.cranl.com) and create an account ([quickstart](https://docs.cranl.com/getting-started/quickstart.html)).
2. Connect GitHub and allow access to your fork of this repository.
3. Create a project, then **New Application** → select the repo.
4. Set **Build Type** to `Dockerfile`, branch to `main` (or your fork’s default), port to `3000`.
5. In **Environment**, add the white-label variables (especially `NEXT_PUBLIC_SITE_URL`). Redeploy after changing them.
6. Open the free `*.cranl.net` URL and check `/health`.

Official docs: [Applications](https://docs.cranl.com/platform/applications.html), [Environment variables](https://docs.cranl.com/platform/environment-variables.html).

## Coolify

[Coolify](https://coolify.io/) is a self-hosted (or Coolify Cloud) control panel that deploys Docker apps from GitHub. Distinct from CranL.

1. Open [Coolify Cloud](https://app.coolify.io) or your own Coolify instance.
2. Create a new resource → **Public Repository** (or connect GitHub for private forks).
3. Paste:

   `https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity`

   (or your fork URL / branch).
4. Choose the Dockerfile buildpack, port `3000`, and health check path `/health` if asked.
5. Add build-time environment variables from [`.env.example`](./.env.example).
6. Deploy, attach a domain with HTTPS, then verify `/health` and PWA install.

Coolify public-repo guide: [Deploy Public Repository](https://coolify.io/docs/applications/ci-cd/github/public-repository).

## Dokploy

[Dokploy](https://dokploy.com/) is an open-source deployment panel (self-hosted or [Dokploy Cloud](https://app.dokploy.com)). It has one-click *marketplace* templates for popular apps, but custom memorial forks deploy as a normal GitHub + Dockerfile (or Compose) application — there is no public GitHub deep-link button for arbitrary repos yet.

### GitHub + Dockerfile (recommended)

1. Open [app.dokploy.com](https://app.dokploy.com) or your Dokploy panel.
2. Create a project → **Create Service** → **Application**.
3. Connect GitHub ([Dokploy GitHub docs](https://docs.dokploy.com/docs/core/github)), then select this repository (or your fork) and branch.
4. Set **Build Type** to **Dockerfile**, Dockerfile path `Dockerfile`, context `.`, port `3000`.
5. In **Environment**, paste the keys you need from [`.env.example`](./.env.example). Save, then **Deploy**.
6. Add a domain (or a generated domain), wait for HTTPS, and open `/health`.

### Docker Compose on Dokploy

1. Create Service → **Docker Compose**.
2. Point the service at this GitHub repository.
3. Use the checked-in [`compose.yaml`](./compose.yaml).
4. Provide the same environment file values as build arguments / env, then deploy.

---

## Requirements (technical summary)

- Node.js 22 when building outside Docker
- `npm ci --legacy-peer-deps`
- All `NEXT_PUBLIC_*` values available **before** `npm run build`
- HTTPS in production for PWA installation
- `/health` exposed without login or language redirects

Never commit `.env.local` or provider credentials.

## Pre-deployment verification (developers)

```bash
npm ci --legacy-peer-deps
npm run lint
npm run type-check
npm run test:e2e
npm run build
npm audit --audit-level=high
docker compose --env-file .env.example config --quiet
```

Security headers / CSP notes: [docs/SECURITY-HEADERS.md](./docs/SECURITY-HEADERS.md).

## Post-deployment checks (everyone)

On your live site, confirm:

- `/health` → `{"status":"ok"}`
- `/manifest.webmanifest` loads (PWA name looks right)
- `/sw.js` is JavaScript (not an HTML error page)
- Home page shows the memorial name you set
- Donate button goes to your URL
- One English (LTR) and one Arabic (RTL) page both work
- Site is served over HTTPS if you want “Add to Home Screen”

## Troubleshooting

### Clean local build

```bash
rm -rf .next node_modules
npm ci --legacy-peer-deps
npm run build
```

Keep `package-lock.json`.

### Branding did not change

`NEXT_PUBLIC_*` values are baked in at build time. Update the host’s environment variables, then **redeploy**. For Docker Compose, rebuild with `--env-file .env.local`.

### PWA or offline issues

Confirm `/sw.js` has a JavaScript content type. Clear old service workers for that domain in the browser, then reload over HTTPS.

### AWS Amplify

Use a supported Next.js server adapter. A static publish directory is not compatible with this application.
