# Meshari's Continuous Charity — صدقة جارية لمشاري

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=flat&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![Performance](https://img.shields.io/badge/Performance-Optimized-0A7B3E?style=flat&logo=lighthouse&logoColor=white)](https://web.dev/performance/)

[![CI](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/actions/workflows/ci.yml/badge.svg)](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/actions/workflows/ci.yml)
[![Release](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/actions/workflows/release.yml/badge.svg)](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/actions/workflows/release.yml)
[![GitHub release](https://img.shields.io/github/v/release/nawaf-inter4/meshari-alabra-ongoing-charity?style=flat)](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat)](./LICENSE)

**A multilingual Islamic memorial site dedicated to Meshari Ahmed Sulaiman Alabra**  
**مشاري بن أحمد بن سليمان العبره (رحمه الله)**

*March 29, 2023 (7th Ramadan, 1444h) — may Allah have mercy on him*

[Live site](https://meshari.charity) · [Deployment guide](./DEPLOYMENT.md) · [White-label guide](./WHITE_LABELING.md) · [Donate for orphans](https://ehsan.sa/campaign/6FC11E15DA)

[![Deploy with Vercel](https://img.shields.io/badge/Deploy%20with-Vercel-black?style=flat&logo=vercel&logoColor=white)](https://vercel.com/new/clone?repository-url=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity&env=NEXT_PUBLIC_SITE_URL,NEXT_PUBLIC_SITE_NAME,NEXT_PUBLIC_SITE_SHORT_NAME,NEXT_PUBLIC_MEMORIAL_NAME,NEXT_PUBLIC_DONATION_URL,NEXT_PUBLIC_COLOR_BRAND,NEXT_PUBLIC_COLOR_ACCENT&envDescription=Public%20HTTPS%20site%20URL%20and%20memorial%20white-label%20values.%20See%20.env.example.&envLink=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/blob/sandbox/.env.example)
[![Deploy to Netlify](https://img.shields.io/badge/Deploy%20to-Netlify-00C7B7?style=flat&logo=netlify&logoColor=white)](https://app.netlify.com/start/deploy?repository=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity)
[![Deploy to Render](https://img.shields.io/badge/Deploy%20to-Render-46E3B7?style=flat&logo=render&logoColor=white)](https://render.com/deploy?repo=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity)
[![Deploy to Cloudflare](https://img.shields.io/badge/Deploy%20to-Cloudflare-F38020?style=flat&logo=cloudflare&logoColor=white)](https://deploy.workers.cloudflare.com/?url=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity)
[![Deploy on Railway](https://img.shields.io/badge/Deploy%20on-Railway-0B0D0E?style=flat&logo=railway&logoColor=white)](https://railway.com/new/template?template=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity)
[![Deploy with Docker](https://img.shields.io/badge/Deploy%20with-Docker-2496ED?style=flat&logo=docker&logoColor=white)](./DEPLOYMENT.md#docker)
[![Deploy on CranL](https://img.shields.io/badge/Deploy%20on-CranL-0F766E?style=flat&logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC%2FxhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAeGVYSWZNTQAqAAAACAAEARoABQAAAAEAAAA%2BARsABQAAAAEAAABGASgAAwAAAAEAAgAAh2kABAAAAAEAAABOAAAAAAAAAEgAAAABAAAASAAAAAEAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACfCVbEAAAACXBIWXMAAAsTAAALEwEAmpwYAAACmmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24%2BNzI8L3RpZmY6WVJlc29sdXRpb24%2BCiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ%2BCiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4xMTM8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24%2BMTE1PC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT4xPC9leGlmOkNvbG9yU3BhY2U%2BCiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY%2BCjwveDp4bXBtZXRhPgpYmAh5AAAEgUlEQVRYCcVXS0grVxg%2BJjHxEd8h1hcqxFc1IIJUF7WoIBQF0S6uiohdKOpOBLvoRnuL0JV10YVCXbmpC4WiriwUS2mrUlBBUYrigyZVqXivEaMm537%2F1DM3k5lJNNdyB4Zzzv%2F8zv%2Bf%2Bc8%2FjL3nJyqcf845yZiampqs0dHRqYeHh%2FbLy8t4g8FgfOCxqKgo7vf7fUlJSZ7s7Gx3TEzMv7Ozsx7Q78PZ1%2BX39vbaSkpKWux2%2B3eJiYmrMOoym82v8XKTycSNRiMHCGmkOb0AyMF%2FFRsbe5KcnPxzTk7OVxUVFR8vLS1ZdB0FM0ZGRhLz8%2FNfWq3WI3JEu4NMRC8BBCB%2FamrqOoC8QMSMwf4U6%2F7%2B%2FpT09PSfSFE4fRcAwgaNFDmHwzEGEAaFU7GgfCJ%2F3wQ6DzTwHHOKhtPp%2FFT4VIxdXV1p8fHxfz%2BHIz0bFE2bzfajZhTKysoaKOd6ys9Fj4uL%2B6e9vT0d9qRHzsfp6anT5%2FMJekQj0seysrIYNqKrf3d3Z9%2FZ2XEIAQkA5R%2FKH2IU9CeNKSkpDClky8vLbHt7m83MzDCkU9MGbfLq6qpEwaScJCQkLIL4pBSUl5fzsbExvre3BxNvHzjhOGy6thCll5CWiqCIlQGEZAUqnQWAsrq6OtbT08Nqa2sZcqqSdLlczO12q%2BiCgGinibkEYGpqyoxKZhNErRHFiXV2drKOjg5WXFysJSLTEBF2dnYmr4MnNzc38iGUAMzNzcXc3t4mBAvSGsDY6Ogo6%2BvrY2lpMnAtUZm2sbEhz7UmSFES6HT%2BfBIAhN9Er5ZwZmYmGxoaYrgLtNiatLW1NU16AJGMSQCkrwCfDY2aN%2BPFxQXb3NwM0A09RSTZ7u5uaCHcrsKfBCCUND4Z1traygYGBtj8%2FDw7OjoKJc5OTk7Y%2Fv5%2BSBkwlX4bGhrsCPEpGLqfjuChlPLGxkY%2BPT2NrKmfhYWFsDZwO%2F4GTTOhlJA8NA6Pah7Oz8%2FZ4uIiw83Jtra2yIbieUy64PwOSgT0PwAI8Q1uqtcKS2EWXq%2BXTUxMqKRWV1dVNA0C%2BXpb94HIhILyC4hhwxcoAx2OHct58Hg8vKioKKwNfFnfQ0k69OIw%2BPAlXGggDUm6vr5mk5OTsgwd0OPjY3mtN0FtcSl4hCYjI%2BNbEMOiD5ZB78dRyPjBwQHv7u4OqU%2F9APWOhYWFLxQAaJGXl%2Fc5dUORtGCkg8Y1pHMB3GKxXNfX1xeqAFRXVzvBvBWC%2F9eI1v0POnMqAOvr69G413%2BPJAKPBUsRRqS%2FUDkXhNLS0s%2Boe32swafKYfd%2FtbS02IU%2F1YjQGAsKCr5EVfQK4%2B8SEaFLOyfnVVVVH6mcBhMAwlBZWfkJ%2Fg9%2BQFt1FmmjSs7pTwkNzG5ubu7XbW1tmcG%2BaK15AxKDgDQ3N3%2BAm60S%2F4LVKDIOGKXw2dFYWh8OktCntPngkCqcGzt2489qEzX%2FVzQxfw4PD189RANs5SMMKKkaKzgkWdP4%2BLhpZWXFAoNGdDYGOGL39%2Fd%2B8H01NTXewcFBqvM%2BPYcapt8v6Q2F8eXvclQWKwAAAABJRU5ErkJggg%3D%3D&logoColor=white)](https://app.cranl.com)
[![Deploy with Coolify](https://img.shields.io/badge/Deploy%20with-Coolify-111827?style=flat&logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACshmLzAAACj0lEQVRYCe1WO2sUURT%2BzszsBuNGJNlGAykUEbIgGLATCVsoNiJK%2FAMWFkbEB5Yy%2FgAjKDZikcomYAg20UK2NLYpfDSKoCJqY2RfM%2Fdev7tm3XF3ZnbWNAH3wN2Zvfec737ncc9cYCjDCPzvEZCsAVg4Y85DcFJrqKw24sA1BqvXH8vDJBsvaaF73gBH8i7OhpkpAy51A4VdC3Nm7eqSrHdj2v9O3GTCnKY30AMMRV0jmIJGmSQmfd%2F07JcYgftzptAIMM1NPbitfTdChVfEnCDBRLsoeeZKxCAkxpQI9qGCL1zXUZ1EoFqAg8bFCimPwXpicJPeXOT7cQLsISBn%2B4jVsCkT1LSK108kwOQ4tC3wZ6fFcQyOkcRLz8MiwaazVqJLY02yJBzG0U0m8Fv7T94JMMkxE2o8Gyvi6Y9ay7c4zL%2FmLNHROuRrHdqv9J6gfgSiYA6LqkAS%2BQsPpBpd2Mp7T1WmgTEl%2FfOeBhCzNhCBGPstTw0JbN8IKA2xXZBVz3a2mWqeZQnjz%2FO%2FFkMbusf%2B3imzt%2Blhnk3kKBcnWooGn9ha37BJfSa5RNs2GI%2BMR70XN5ZltT3X%2FUwF8WeNN1pEme1jhh3xnOfgcAsg1aqzBfVRD%2FAk52L%2B8pJ86Kx03lJrwK9IWP2G5zlghd68tz4zNVBsb1lGk82XEdjP54k7p81uY7%2BNXZJKwOpaEleW8ZoReMvLyE8SqXE0sgxybZJ0jheTA4GD0q1Zfle7JGMrFtNwzO18iHXmv8x%2BWGRhkkMGkc3%2Br%2BLvHj0hSYPkpWIHv%2BYlRqJEw0wE6L0YxYw5eFc9hDXf5zmKyEAErN3dS2Zk4yPGWViZCFibnIKoEQTXHuG72CvKUIYR2E4R%2BAUZtws3z61%2BQAAAAABJRU5ErkJggg%3D%3D&logoColor=white)](https://app.coolify.io)
[![Deploy with Dokploy](https://img.shields.io/badge/Deploy%20with-Dokploy-0284C7?style=flat&logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACshmLzAAAIQUlEQVRYCcVXaUyVZxY%2BXDYBARcoAsEVROOGVXFQXIaqVHBpdPwhCoLoj8HIjPJDa%2BOANCpip2sEkynjADZulA4gjI1msGjL6mhHZFwiZSd2VJAWFIF75jyH3k9Q2zSZNP2Sl3vv%2B33f%2B57znOc8z4vV06fdTL%2FiZfoV99atf9EArKysyNra%2Bidz%2FMUCwOZPnjyh2tpaDcJkenErPPPCrI2NDdna2v3IsCW89HMubHjnzh2KjIyiiooK6u3tNdCw7GEyWZGVhYRYGKOmpoYaGhqIf6Am9gOMGC4uLjRp0iRydXWV%2B0x9fX36%2BbKAEEBzczMFBs6VZGxp%2Fvz59NZbe2jq1KlUXV1NdXX1VFxcTIQAent7uL29jePjt%2FOwYcN4%2BPDhPGLEiBcG7vn5%2BXJKykGuqbmh70kgjDWeHz09T2XuKSckJCAVHSEhv%2BWkpCR2d3fjIUOG6JwiAEgyMjIoPv4PtHPnDpo5c6ZmZmVlIsAkC5HZzNTV1UlffvkVnTp1iiRAWrp0KW3eHENBQUGKEBAxm80GIECtqamJtm%2FfTgUFZwehZW9vL%2FvF9yNgNvfxqlUrecWKFfz4cReS0quhoZ4%2F%2F%2Fwcd3Z%2Bb5nSTMvKSnnjxo38yisePHSoM0dHb%2BLi4n8qingQiFoQwdoSOO%2Ffv58lUZ4%2BfRpHRkayJMHd3U9YS4CHFixYwNu2bTM2wpecnByeO3cu19belV9mXRTQWr5fu3aVDx48wKNHj5ZAhvJrr4VwWtoRbm1tMZ5FMFVVlbxw4UL29fXlW7duYmm5zIy1jBKEhISQm5sb7du3T8jY3xx9fb0K28SJE8nefogwuceAEYRF6WQlamlpoczMTDpx4oS03Tfk4OCgZPP09KS2tjYqKyvTMmZnZ9Hatb8T8vavi3cNBEJDQ4UYDpqNj48PY4wZM4anTZvGERHruaCgYEB5zCyLKNTIENngunevlQsLCzk5OZkXL15skM%2FLy5OPH8%2F%2BgbRmfvjwAXd0PFIEbCyMkc0kIxO9%2FnoojRo1SkSkW8ZjbZdLly5Tbu5nBJQiIzdqdu7u7uTo6GiQD6Lz3Xffa%2FY9PT2qAWhXCYQSE%2F8kxH6VHjy4T3l5%2BSR8oOjoaNq7d%2B8zBC5cuMBSAq1jYeFZIytkKNrAR44c4RkzZrCIFHt5efHs2bN42bJlHB4ezqGhy5QrQAxcQAtv3bqVz58%2FrwQEx%2FLy%2Fs7z5s2T9205LCyMr1y5oogoB1BP1Coj46%2BUnZ1Nt2%2FfJiENxcX9noScJGxXoAQ2Kim5ROfO%2FYPu3q2ljo4OVThwwcXFmSQweX4hCRnJx2e08MOsKvjBBx%2FS6dOnyc%2FPj7Zs2UIrV64gb29v4ZV9PwKoZ1xcnGYkROGPP%2F6LZDud7ezseNasWfzOO4e5paXZQAX1Rgu1tT3k%2B%2Ff%2Fq5%2F4bbmQcUVFuXAnQkVt5Eg36ZaDOpeYmCi8mqqI4nmDhEuWLFHSCHP5k0%2BOc2NjAx8%2BfFgDgGpJxLx79y7Oz8%2Fj69f%2Fzc3NTbrxo0ftSipoRmVlhZDtOG%2FYsIGlE7QUEREb%2BOuvr%2FHFi8UcGBhoEHPPnjc1XiOATZs28eTJk7U%2BeHn9%2BvVcV%2FeNbnL27FkWxdMFUWNPTy%2BeMmWK1hT6ERT0GxaPEIl1V4kdN24cC8EYOoHOQOBCSBYfYFFa%2Ff7RRx9qANoFMJzAwDmUn59Pb7%2BdTAEBAXT06FESooguJNHq1atJyEbJyU108eIXVFlZqUbT2dmpHLC3d6GxY8fS%2BPET1HSCg4PJycmRSktLKSoqWk1n7dq1lJCwk06ePKnmFBDQL%2FcGApBXcTuFOisri0tKSnjRokXKA5jImTNntHc1bP1jVh5AuvvV0XLHrJnHxMSws7Oz6smpUyd1DlIv3iIdNFvlHe9pAGi1b7%2B9x2KZWiOQLykpkevr6zg19RCLEsqLJuUDRCYn5wyXln6lXLhxo5qvXv2XekZ6ejqvW7fOqH9UVCRXV1%2BXZL7QTbE5nPHAgQMSbb%2B0awAwDjBX4NeM58yZw05OTtLfoWq7TU2NjO7Ab3DA0useHh6MAZajxiJMygUEiT6HiaWnpymyqD%2B0Q0ROSYnOw77GgQTW2draSsuXh5GQiIKDF9C77%2F5Z65WamkrilqJ8TiSoUHl5hWjFLdUOnHQwL4ZE0rLCnxlkZ2dPN2%2F%2Bh1JSDpGUk954YzWtWbOGdu9%2Bk0S8SJASBTX1%2B4rFNvGJKzc3VyHE4URMRJUOXQE%2BAAWUyqL9%2BsKAP7BdtOK2bXGilp6K1KFDKeqAIuPs7%2B%2FPErj4SJ9h14YXQOqECxQWtpxiYzdTWlo6jRkzVlzub%2Bp0mZlZot8x4hMequ%2F%2B%2FpNITkhyYDFRd3e3dgVcTwRIVNFVu0HaTzpjvKjfVqqqqtIO8PObSEI%2BVVb9MxABfEdtoHBQRpAxNjZWs4biwSPkdKP9jGObZeCoBn8IDw9j9Df6H8pYXl6uxHV1deFjx46p9oP5A%2Fc0SDhwEoTEGXHHjj8qjDARlKa9%2FaECjvsoBc6FUDkcWAaemqCi77%2F%2FnpBzpFp6bu6n%2Bt7zm2PPlwaAG2hNsWMuKirUFgIP4Ia7du3iy5cviRQ3G1IsNqstW1RUpIhBCdERYrkaJAIemODA70YXPCvKs2%2F9px5bEviVzfn5BXJsvyG%2FHxBOO97eXnpSgiI2NjZqV4hnSDe8SiLl0jmr1PFwPvix6ycDsLwEollb25CURdqwXq0YgeBs39XVpf8v%2BPpOIPEHmjBhvFqxg4PjoCOcZa3nP39WAJaXEAgGkJGiWqb1E3O4cCzHeP6%2B3nzJn0Ft%2BJL7g6Ysiw%2Ba%2FD9%2F%2FA%2Bif%2F7LELCzQAAAAABJRU5ErkJggg%3D%3D&logoColor=white)](https://app.dokploy.com)

</div>

---

## Screenshots

| Dark hero (English) | Light hero (English) |
| --- | --- |
| ![Dark English hero](./docs/screenshots/hero-en-dark.png) | ![Light English hero](./docs/screenshots/hero-en-light.png) |

| Arabic RTL hero | Orphan sponsorship |
| --- | --- |
| ![Arabic RTL hero](./docs/screenshots/hero-ar-rtl.png) | ![Donation section](./docs/screenshots/donation-en.png) |

| Quran section | Dhikr counter |
| --- | --- |
| ![Quran section](./docs/screenshots/section-quran-en.png) | ![Dhikr section](./docs/screenshots/section-dhikr-en.png) |

| Share ayah card (PNG) | Share ayah card (alt) |
| --- | --- |
| ![Share ayah card](./docs/screenshots/share-card-ayah.png) | ![Share ayah card alternate](./docs/screenshots/share-card-ayah-alt.png) |

| PageSpeed Insights (mobile) | Mozilla HTTP Observatory |
| --- | --- |
| ![PageSpeed 100s](./docs/screenshots/pagespeed-mobile-100.png) | ![Observatory A+](./docs/screenshots/mozilla-observatory-a-plus.png) |

---

## About

This site is a **Sadaqah Jariyah** (ongoing charity) for Meshari. It provides Quran reading, tafseer, hadith, daily supplications, prayer times, dhikr, Qibla, orphan-sponsorship links, and Quran-recitation playlists — across **15 languages** with dedicated section pages, SEO metadata, and PWA support.

Built on Next.js 16.3 Instant Navigations, Cache Components, Partial Prefetching, native YouTube players, and centralized white-label configuration.

### Core features

- YouTube Quran-recitation playlists as ongoing charity
- Orphan sponsorship via Ehsan.sa
- Islamic supplications (daily athkar and prayers for the deceased)
- Location-based prayer times with Hijri calendar
- Full Quran reading with translations (114 Surahs) — dedicated section page
- **Share ayah cards as PNG or PDF** (desktop download + mobile/PWA share-sheet friendly)
- Tafseer — dedicated section page
- Hadith with authentic sources — dedicated section page
- Dhikr counter with milestone tracking — dedicated section page
- Qibla finder with compass — dedicated section page
- Quran stories (educational PDFs)
- Islamic chant and favorite-reciter sections
- 15 fully supported languages with dedicated localized pages

### Highlights

- Next.js `16.3` (stable) with Cache Components and Partial Prefetching
- TypeScript 7 project compilation (TypeScript 6 isolated for ESLint compatibility)
- Playwright coverage for navigation, white-label metadata, PWA, and direction-aware typography
- Native one-click YouTube playlist players with deferred third-party work
- Central config for identity, memorial content, assets, SEO, PWA, colors, and media
- Dynamic `/manifest.webmanifest` and dependency-free service worker
- One-click deploy paths for Vercel, Netlify, Render, Cloudflare Workers, Railway, Docker, CranL, Coolify, and Dokploy
- **Single production deploy per release** (promote does not redeploy; Release Please merge ships prod)
- LTR interface font: Lexend Deca · RTL interface font: Tajawal

### Sections

| Section | Path |
| --- | --- |
| Quran | `/{lang}/sections/quran` |
| Tafseer | `/{lang}/sections/tafseer` |
| Dhikr | `/{lang}/sections/dhikr` |
| Prayer times | `/{lang}/sections/prayer-times` |
| Qibla | `/{lang}/sections/qibla` |
| Donation | `/{lang}/sections/donation` |
| Supplications | `/{lang}/sections/supplications` |
| Hadith | `/{lang}/sections/hadith` |
| Quran recitations | `/{lang}/sections/youtube` |

---

## Performance

Recent lab scores on production mobile ([PageSpeed Insights](https://pagespeed.web.dev/)):

| Category | Score |
| --- | --- |
| Performance | **100** |
| Accessibility | **100** |
| Best Practices | **100** |
| SEO | **100** |

Core Web Vitals (same report): FCP ~1.0s · LCP ~1.4s · TBT ~80ms · CLS ~0.007 · Speed Index ~2.1s

Security headers: [Mozilla HTTP Observatory](https://developer.mozilla.org/en-US/observatory) **A+** (115/100, 10/10 tests).

![PageSpeed Insights mobile 100s](./docs/screenshots/pagespeed-mobile-100.png)

![Mozilla HTTP Observatory A+](./docs/screenshots/mozilla-observatory-a-plus.png)

- Dynamic imports with code splitting
- Strategic API caching (Quran ~30 days, prayer times ~6 hours)
- AVIF/WebP image optimization
- DNS prefetch for external APIs
- Production console-log stripping (errors/warnings kept)
- Bundle analyzer via `npm run build:analyze`
- Self-hosted locale-aware font subsets with long-lived cache headers

**Caching strategy (approximate):**

```text
Quran API:        30 days
Prayer times:     6 hours
Fonts / static:   1 year (immutable fingerprinting where applicable)
Images:           long TTL with stale-while-revalidate where configured
```

---

## Design and UX

### Multilingual support

15 languages with complete UI translations:

| Locale | Direction | Path |
| --- | --- | --- |
| Arabic (`ar`) | RTL (primary) | `/ar` |
| English (`en`) | LTR | `/en` |
| Urdu (`ur`) | RTL | `/ur` |
| Turkish (`tr`) | LTR | `/tr` |
| Indonesian (`id`) | LTR | `/id` |
| Malay (`ms`) | LTR | `/ms` |
| Bengali (`bn`) | LTR | `/bn` |
| French (`fr`) | LTR | `/fr` |
| Chinese (`zh`) | LTR | `/zh` |
| Italian (`it`) | LTR | `/it` |
| Japanese (`ja`) | LTR | `/ja` |
| Korean (`ko`) | LTR | `/ko` |
| Spanish (`es`) | LTR | `/es` |
| Portuguese (`pt`) | LTR | `/pt` |
| Hindi (`hi`) | LTR | `/hi` |

- Landing: `/{lang}`
- Sections: `/{lang}/sections/{section}`
- `/` permanently redirects to the configured default locale (`/ar` by default)
- Legacy `/sections/{section}` permanently redirects to `/{defaultLocale}/sections/{section}`
- Multilingual SEO: language-specific metadata, keywords, canonical URLs, and hreflang

### Visual system

- Dark / light mode with Islamic color scheme
- Brand gold and deep slate / warm cream surfaces (overridable via white-label config)
- Framer Motion animations with reduced-motion respect where applied
- Fully responsive layout

### Progressive Web App

- Installable on supported mobile and desktop browsers
- Regular and maskable icons plus a generated manifest
- Previously visited same-origin pages can remain available from cache
- Localized last-resort offline screen when an uncached navigation fails
- User-controlled service-worker update prompt
- Live prayer times, location search, streaming/audio, and remote APIs require connectivity

---

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16.3 (App Router), React 19 |
| Language | TypeScript 7 |
| Styling | Tailwind CSS, Framer Motion, Lucide icons |
| Fonts | Lexend Deca (LTR), Tajawal (RTL), Amiri / Scheherazade New (Quranic Arabic) |
| APIs | Aladhan, Al Quran Cloud, Quran.com |
| Tooling | Turbopack, Playwright, Release Please |

---

## Quick start

**Prerequisites:** Node.js 22.12+ (see `package.json` `engines`) and npm.

```bash
git clone https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity.git
cd meshari-alabra-ongoing-charity
npm ci --legacy-peer-deps
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint            # ESLint
npm run type-check      # TypeScript
npm run test:e2e        # Playwright suite
npm run build           # Production build
npm run build:analyze   # Bundle analyzer
```

---

## Branch and deployment flow

| Branch | Role |
| --- | --- |
| `sandbox` | Integration lane. Open feature PRs **here only**. Sole Vercel **Preview** branch ([sandbox.meshari.charity](https://sandbox.meshari.charity)). |
| `main` | Production ([meshari.charity](https://meshari.charity)). Release Please + GitHub Releases. |

Recommended flow:

1. Always create a feature branch from `sandbox`
2. Open a PR **into `sandbox`** (full CI: quality + security). Feature branches do **not** get Vercel Preview deploys
3. After merge, verify [sandbox.meshari.charity](https://sandbox.meshari.charity) (stable Preview alias). GitHub Checks may still link to a unique `*.vercel.app` URL — that is expected
4. Promote with a conventional title: `./scripts/promote-sandbox-to-main.sh fix "summary"` (or `feat:`) — never a bare “Promote sandbox…” title
5. Release Please on `main` opens/publishes patch/minor from conventional commits. Do **not** sync `main` → `sandbox` afterward — sandbox stays the integration tip; promote once when ready to release

See [CONTRIBUTING.md](./CONTRIBUTING.md), [DEPLOYMENT.md](./DEPLOYMENT.md), and [docs/SECURITY-HEADERS.md](./docs/SECURITY-HEADERS.md).

---

## SEO and AI / LLM orientation

- Localized metadata, canonical URLs, and hreflang alternates
- Structured data for memorial / organization context where configured
- `robots.txt`, `sitemap.xml`, `feed.xml`, and `/llms.txt` (markdown agent orientation with H1 and markdown links)
- Keywords and section metadata generated from white-label config and locale files

Crawl inventory (approximate):

- Canonical localized HTML pages: **225** (15 landing + 150 section pages including Quran stories + 60 story detail pages)
- Sitemap entries: **225**, each with reciprocal locale alternates and one `x-default`
- Legacy `/{locale}/stories` URLs permanently redirect under `/sections/quran-stories`
- Root and legacy section aliases are redirects and are excluded from the sitemap

---

## Deployment

Families can publish a memorial site without writing code: fork on GitHub, click a badge, set a few names and colors, then check `/health`. This app needs a real Next.js runtime (not a static export). Plain-language steps for every host: [DEPLOYMENT.md](./DEPLOYMENT.md).

### One-click platforms

[![Deploy with Vercel](https://img.shields.io/badge/Deploy%20with-Vercel-black?style=flat&logo=vercel&logoColor=white)](https://vercel.com/new/clone?repository-url=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity&env=NEXT_PUBLIC_SITE_URL,NEXT_PUBLIC_SITE_NAME,NEXT_PUBLIC_SITE_SHORT_NAME,NEXT_PUBLIC_MEMORIAL_NAME,NEXT_PUBLIC_DONATION_URL,NEXT_PUBLIC_COLOR_BRAND,NEXT_PUBLIC_COLOR_ACCENT&envDescription=Public%20HTTPS%20site%20URL%20and%20memorial%20white-label%20values.%20See%20.env.example.&envLink=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/blob/sandbox/.env.example)
[![Deploy to Netlify](https://img.shields.io/badge/Deploy%20to-Netlify-00C7B7?style=flat&logo=netlify&logoColor=white)](https://app.netlify.com/start/deploy?repository=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity)
[![Deploy to Render](https://img.shields.io/badge/Deploy%20to-Render-46E3B7?style=flat&logo=render&logoColor=white)](https://render.com/deploy?repo=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity)
[![Deploy to Cloudflare](https://img.shields.io/badge/Deploy%20to-Cloudflare-F38020?style=flat&logo=cloudflare&logoColor=white)](https://deploy.workers.cloudflare.com/?url=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity)
[![Deploy on Railway](https://img.shields.io/badge/Deploy%20on-Railway-0B0D0E?style=flat&logo=railway&logoColor=white)](https://railway.com/new/template?template=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity)
[![Deploy with Docker](https://img.shields.io/badge/Deploy%20with-Docker-2496ED?style=flat&logo=docker&logoColor=white)](./DEPLOYMENT.md#docker)
[![Deploy on CranL](https://img.shields.io/badge/Deploy%20on-CranL-0F766E?style=flat&logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC%2FxhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAeGVYSWZNTQAqAAAACAAEARoABQAAAAEAAAA%2BARsABQAAAAEAAABGASgAAwAAAAEAAgAAh2kABAAAAAEAAABOAAAAAAAAAEgAAAABAAAASAAAAAEAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACfCVbEAAAACXBIWXMAAAsTAAALEwEAmpwYAAACmmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24%2BNzI8L3RpZmY6WVJlc29sdXRpb24%2BCiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ%2BCiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4xMTM8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24%2BMTE1PC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT4xPC9leGlmOkNvbG9yU3BhY2U%2BCiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY%2BCjwveDp4bXBtZXRhPgpYmAh5AAAEgUlEQVRYCcVXS0grVxg%2BJjHxEd8h1hcqxFc1IIJUF7WoIBQF0S6uiohdKOpOBLvoRnuL0JV10YVCXbmpC4WiriwUS2mrUlBBUYrigyZVqXivEaMm537%2F1DM3k5lJNNdyB4Zzzv%2F8zv%2Bf%2Bc8%2FjL3nJyqcf845yZiampqs0dHRqYeHh%2FbLy8t4g8FgfOCxqKgo7vf7fUlJSZ7s7Gx3TEzMv7Ozsx7Q78PZ1%2BX39vbaSkpKWux2%2B3eJiYmrMOoym82v8XKTycSNRiMHCGmkOb0AyMF%2FFRsbe5KcnPxzTk7OVxUVFR8vLS1ZdB0FM0ZGRhLz8%2FNfWq3WI3JEu4NMRC8BBCB%2FamrqOoC8QMSMwf4U6%2F7%2B%2FpT09PSfSFE4fRcAwgaNFDmHwzEGEAaFU7GgfCJ%2F3wQ6DzTwHHOKhtPp%2FFT4VIxdXV1p8fHxfz%2BHIz0bFE2bzfajZhTKysoaKOd6ys9Fj4uL%2B6e9vT0d9qRHzsfp6anT5%2FMJekQj0seysrIYNqKrf3d3Z9%2FZ2XEIAQkA5R%2FKH2IU9CeNKSkpDClky8vLbHt7m83MzDCkU9MGbfLq6qpEwaScJCQkLIL4pBSUl5fzsbExvre3BxNvHzjhOGy6thCll5CWiqCIlQGEZAUqnQWAsrq6OtbT08Nqa2sZcqqSdLlczO12q%2BiCgGinibkEYGpqyoxKZhNErRHFiXV2drKOjg5WXFysJSLTEBF2dnYmr4MnNzc38iGUAMzNzcXc3t4mBAvSGsDY6Ogo6%2BvrY2lpMnAtUZm2sbEhz7UmSFES6HT%2BfBIAhN9Er5ZwZmYmGxoaYrgLtNiatLW1NU16AJGMSQCkrwCfDY2aN%2BPFxQXb3NwM0A09RSTZ7u5uaCHcrsKfBCCUND4Z1traygYGBtj8%2FDw7OjoKJc5OTk7Y%2Fv5%2BSBkwlX4bGhrsCPEpGLqfjuChlPLGxkY%2BPT2NrKmfhYWFsDZwO%2F4GTTOhlJA8NA6Pah7Oz8%2FZ4uIiw83Jtra2yIbieUy64PwOSgT0PwAI8Q1uqtcKS2EWXq%2BXTUxMqKRWV1dVNA0C%2BXpb94HIhILyC4hhwxcoAx2OHct58Hg8vKioKKwNfFnfQ0k69OIw%2BPAlXGggDUm6vr5mk5OTsgwd0OPjY3mtN0FtcSl4hCYjI%2BNbEMOiD5ZB78dRyPjBwQHv7u4OqU%2F9APWOhYWFLxQAaJGXl%2Fc5dUORtGCkg8Y1pHMB3GKxXNfX1xeqAFRXVzvBvBWC%2F9eI1v0POnMqAOvr69G413%2BPJAKPBUsRRqS%2FUDkXhNLS0s%2Boe32swafKYfd%2FtbS02IU%2F1YjQGAsKCr5EVfQK4%2B8SEaFLOyfnVVVVH6mcBhMAwlBZWfkJ%2Fg9%2BQFt1FmmjSs7pTwkNzG5ubu7XbW1tmcG%2BaK15AxKDgDQ3N3%2BAm60S%2F4LVKDIOGKXw2dFYWh8OktCntPngkCqcGzt2489qEzX%2FVzQxfw4PD189RANs5SMMKKkaKzgkWdP4%2BLhpZWXFAoNGdDYGOGL39%2Fd%2B8H01NTXewcFBqvM%2BPYcapt8v6Q2F8eXvclQWKwAAAABJRU5ErkJggg%3D%3D&logoColor=white)](https://app.cranl.com)
[![Deploy with Coolify](https://img.shields.io/badge/Deploy%20with-Coolify-111827?style=flat&logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACshmLzAAACj0lEQVRYCe1WO2sUURT%2BzszsBuNGJNlGAykUEbIgGLATCVsoNiJK%2FAMWFkbEB5Yy%2FgAjKDZikcomYAg20UK2NLYpfDSKoCJqY2RfM%2Fdev7tm3XF3ZnbWNAH3wN2Zvfec737ncc9cYCjDCPzvEZCsAVg4Y85DcFJrqKw24sA1BqvXH8vDJBsvaaF73gBH8i7OhpkpAy51A4VdC3Nm7eqSrHdj2v9O3GTCnKY30AMMRV0jmIJGmSQmfd%2F07JcYgftzptAIMM1NPbitfTdChVfEnCDBRLsoeeZKxCAkxpQI9qGCL1zXUZ1EoFqAg8bFCimPwXpicJPeXOT7cQLsISBn%2B4jVsCkT1LSK108kwOQ4tC3wZ6fFcQyOkcRLz8MiwaazVqJLY02yJBzG0U0m8Fv7T94JMMkxE2o8Gyvi6Y9ay7c4zL%2FmLNHROuRrHdqv9J6gfgSiYA6LqkAS%2BQsPpBpd2Mp7T1WmgTEl%2FfOeBhCzNhCBGPstTw0JbN8IKA2xXZBVz3a2mWqeZQnjz%2FO%2FFkMbusf%2B3imzt%2Blhnk3kKBcnWooGn9ha37BJfSa5RNs2GI%2BMR70XN5ZltT3X%2FUwF8WeNN1pEme1jhh3xnOfgcAsg1aqzBfVRD%2FAk52L%2B8pJ86Kx03lJrwK9IWP2G5zlghd68tz4zNVBsb1lGk82XEdjP54k7p81uY7%2BNXZJKwOpaEleW8ZoReMvLyE8SqXE0sgxybZJ0jheTA4GD0q1Zfle7JGMrFtNwzO18iHXmv8x%2BWGRhkkMGkc3%2Br%2BLvHj0hSYPkpWIHv%2BYlRqJEw0wE6L0YxYw5eFc9hDXf5zmKyEAErN3dS2Zk4yPGWViZCFibnIKoEQTXHuG72CvKUIYR2E4R%2BAUZtws3z61%2BQAAAAABJRU5ErkJggg%3D%3D&logoColor=white)](https://app.coolify.io)
[![Deploy with Dokploy](https://img.shields.io/badge/Deploy%20with-Dokploy-0284C7?style=flat&logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACshmLzAAAIQUlEQVRYCcVXaUyVZxY%2BXDYBARcoAsEVROOGVXFQXIaqVHBpdPwhCoLoj8HIjPJDa%2BOANCpip2sEkynjADZulA4gjI1msGjL6mhHZFwiZSd2VJAWFIF75jyH3k9Q2zSZNP2Sl3vv%2B33f%2B57znOc8z4vV06fdTL%2FiZfoV99atf9EArKysyNra%2Bidz%2FMUCwOZPnjyh2tpaDcJkenErPPPCrI2NDdna2v3IsCW89HMubHjnzh2KjIyiiooK6u3tNdCw7GEyWZGVhYRYGKOmpoYaGhqIf6Am9gOMGC4uLjRp0iRydXWV%2B0x9fX36%2BbKAEEBzczMFBs6VZGxp%2Fvz59NZbe2jq1KlUXV1NdXX1VFxcTIQAent7uL29jePjt%2FOwYcN4%2BPDhPGLEiBcG7vn5%2BXJKykGuqbmh70kgjDWeHz09T2XuKSckJCAVHSEhv%2BWkpCR2d3fjIUOG6JwiAEgyMjIoPv4PtHPnDpo5c6ZmZmVlIsAkC5HZzNTV1UlffvkVnTp1iiRAWrp0KW3eHENBQUGKEBAxm80GIECtqamJtm%2FfTgUFZwehZW9vL%2FvF9yNgNvfxqlUrecWKFfz4cReS0quhoZ4%2F%2F%2Fwcd3Z%2Bb5nSTMvKSnnjxo38yisePHSoM0dHb%2BLi4n8qingQiFoQwdoSOO%2Ffv58lUZ4%2BfRpHRkayJMHd3U9YS4CHFixYwNu2bTM2wpecnByeO3cu19belV9mXRTQWr5fu3aVDx48wKNHj5ZAhvJrr4VwWtoRbm1tMZ5FMFVVlbxw4UL29fXlW7duYmm5zIy1jBKEhISQm5sb7du3T8jY3xx9fb0K28SJE8nefogwuceAEYRF6WQlamlpoczMTDpx4oS03Tfk4OCgZPP09KS2tjYqKyvTMmZnZ9Hatb8T8vavi3cNBEJDQ4UYDpqNj48PY4wZM4anTZvGERHruaCgYEB5zCyLKNTIENngunevlQsLCzk5OZkXL15skM%2FLy5OPH8%2F%2BgbRmfvjwAXd0PFIEbCyMkc0kIxO9%2FnoojRo1SkSkW8ZjbZdLly5Tbu5nBJQiIzdqdu7u7uTo6GiQD6Lz3Xffa%2FY9PT2qAWhXCYQSE%2F8kxH6VHjy4T3l5%2BSR8oOjoaNq7d%2B8zBC5cuMBSAq1jYeFZIytkKNrAR44c4RkzZrCIFHt5efHs2bN42bJlHB4ezqGhy5QrQAxcQAtv3bqVz58%2FrwQEx%2FLy%2Fs7z5s2T9205LCyMr1y5oogoB1BP1Coj46%2BUnZ1Nt2%2FfJiENxcX9noScJGxXoAQ2Kim5ROfO%2FYPu3q2ljo4OVThwwcXFmSQweX4hCRnJx2e08MOsKvjBBx%2FS6dOnyc%2FPj7Zs2UIrV64gb29v4ZV9PwKoZ1xcnGYkROGPP%2F6LZDud7ezseNasWfzOO4e5paXZQAX1Rgu1tT3k%2B%2Ff%2Fq5%2F4bbmQcUVFuXAnQkVt5Eg36ZaDOpeYmCi8mqqI4nmDhEuWLFHSCHP5k0%2BOc2NjAx8%2BfFgDgGpJxLx79y7Oz8%2Fj69f%2Fzc3NTbrxo0ftSipoRmVlhZDtOG%2FYsIGlE7QUEREb%2BOuvr%2FHFi8UcGBhoEHPPnjc1XiOATZs28eTJk7U%2BeHn9%2BvVcV%2FeNbnL27FkWxdMFUWNPTy%2BeMmWK1hT6ERT0GxaPEIl1V4kdN24cC8EYOoHOQOBCSBYfYFFa%2Ff7RRx9qANoFMJzAwDmUn59Pb7%2BdTAEBAXT06FESooguJNHq1atJyEbJyU108eIXVFlZqUbT2dmpHLC3d6GxY8fS%2BPET1HSCg4PJycmRSktLKSoqWk1n7dq1lJCwk06ePKnmFBDQL%2FcGApBXcTuFOisri0tKSnjRokXKA5jImTNntHc1bP1jVh5AuvvV0XLHrJnHxMSws7Oz6smpUyd1DlIv3iIdNFvlHe9pAGi1b7%2B9x2KZWiOQLykpkevr6zg19RCLEsqLJuUDRCYn5wyXln6lXLhxo5qvXv2XekZ6ejqvW7fOqH9UVCRXV1%2BXZL7QTbE5nPHAgQMSbb%2B0awAwDjBX4NeM58yZw05OTtLfoWq7TU2NjO7Ab3DA0useHh6MAZajxiJMygUEiT6HiaWnpymyqD%2B0Q0ROSYnOw77GgQTW2draSsuXh5GQiIKDF9C77%2F5Z65WamkrilqJ8TiSoUHl5hWjFLdUOnHQwL4ZE0rLCnxlkZ2dPN2%2F%2Bh1JSDpGUk954YzWtWbOGdu9%2Bk0S8SJASBTX1%2B4rFNvGJKzc3VyHE4URMRJUOXQE%2BAAWUyqL9%2BsKAP7BdtOK2bXGilp6K1KFDKeqAIuPs7%2B%2FPErj4SJ9h14YXQOqECxQWtpxiYzdTWlo6jRkzVlzub%2Bp0mZlZot8x4hMequ%2F%2B%2FpNITkhyYDFRd3e3dgVcTwRIVNFVu0HaTzpjvKjfVqqqqtIO8PObSEI%2BVVb9MxABfEdtoHBQRpAxNjZWs4biwSPkdKP9jGObZeCoBn8IDw9j9Df6H8pYXl6uxHV1deFjx46p9oP5A%2Fc0SDhwEoTEGXHHjj8qjDARlKa9%2FaECjvsoBc6FUDkcWAaemqCi77%2F%2FnpBzpFp6bu6n%2Bt7zm2PPlwaAG2hNsWMuKirUFgIP4Ia7du3iy5cviRQ3G1IsNqstW1RUpIhBCdERYrkaJAIemODA70YXPCvKs2%2F9px5bEviVzfn5BXJsvyG%2FHxBOO97eXnpSgiI2NjZqV4hnSDe8SiLl0jmr1PFwPvix6ycDsLwEollb25CURdqwXq0YgeBs39XVpf8v%2BPpOIPEHmjBhvFqxg4PjoCOcZa3nP39WAJaXEAgGkJGiWqb1E3O4cCzHeP6%2B3nzJn0Ft%2BJL7g6Ysiw%2Ba%2FD9%2F%2FA%2Bif%2F7LELCzQAAAAABJRU5ErkJggg%3D%3D&logoColor=white)](https://app.dokploy.com)

- **Vercel:** native Next.js via `vercel.json`. Prompts for site URL, memorial name, donation URL, and colors. Production = `main` → [meshari.charity](https://meshari.charity). Preview deploys = `sandbox` only → [sandbox.meshari.charity](https://sandbox.meshari.charity) (Git Branch domain in Project Settings → Domains; `git.deploymentEnabled` ignores feature branches). See [DEPLOYMENT.md](./DEPLOYMENT.md) for Domains UI steps and GitHub URL behavior.
- **Netlify:** Next.js runtime via `netlify.toml` (template environment hints for white-label keys).
- **Render:** Docker via `render.yaml` and `Dockerfile`, with `/health` and prompted white-label env vars.
- **Cloudflare:** Workers via `@opennextjs/cloudflare`, `wrangler.jsonc`, and the official [Deploy to Cloudflare](https://deploy.workers.cloudflare.com/?url=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity) button. Plain Cloudflare Pages static export is unsupported.
- **Railway:** Dockerfile deploy via `railway.json` and Railway’s [template-from-GitHub](https://railway.com/new/template?template=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity) button; set `NEXT_PUBLIC_*` variables then redeploy.
- **Docker:** one-command Compose — see [DEPLOYMENT.md § Docker](./DEPLOYMENT.md#docker).
- **CranL:** hosted PaaS at [app.cranl.com](https://app.cranl.com) — connect GitHub, build with `Dockerfile`, port `3000` ([guide](./DEPLOYMENT.md#cranl)). Distinct from Coolify.
- **Coolify:** Coolify Cloud or self-hosted — public/GitHub repo + Dockerfile ([guide](./DEPLOYMENT.md#coolify)).
- **Dokploy:** Dokploy Cloud or self-hosted — GitHub application or Compose ([guide](./DEPLOYMENT.md#dokploy)).

### Railway and Docker (quick)

```bash
cp .env.example .env.local
# edit memorial name, colors, donation URL, and NEXT_PUBLIC_SITE_URL
docker compose --env-file .env.local up --build -d
```

The container listens on port `3000`, runs as a non-root user, exposes `/health`, and uses Next.js standalone output. `railway.json` selects the same Dockerfile on Railway.

### White-label before deploying

All core branding is centralized in [`src/config/site.ts`](./src/config/site.ts). Fork owners can edit that file or set documented `NEXT_PUBLIC_*` variables from [`.env.example`](./.env.example) to update:

- Site, organization, and short names
- Visible logo, favicon, Apple icon, PWA icons, and Open Graph image
- SEO title, description, keywords, URL, and social identity
- PWA name, identity, start URL, theme, and background colors
- Memorial headline / date / description overrides and donation URL
- Quran and favorite-reciter playlist / thumbnail IDs
- Brand, accent, link, light-mode, and dark-mode colors

See [WHITE_LABELING.md](./WHITE_LABELING.md). Never put passwords, tokens, private keys, or secrets in `NEXT_PUBLIC_*` variables.

### Copy-ready AI agent prompt

Copy this prompt into Hermes, Claude Code, Codex, OpenCode, or another coding agent after cloning or forking the repository. Replace the bracketed values first.

```text
Configure and validate my fork of nawaf-inter4/meshari-alabra-ongoing-charity.

Branding and deployment inputs:
- Site name: [SITE NAME]
- Short/PWA name: [SHORT NAME]
- Organization: [ORGANIZATION]
- Canonical production URL: [HTTPS URL]
- Default locale: [LOCALE]
- Default direction: [ltr OR rtl]
- Memorial legal name: [NAME]
- Memorial display name: [NAME]
- Memorial alternate-script name: [NAME]
- Memorial date: [YYYY-MM-DD]
- Respectful hero description: [DESCRIPTION]
- Donation URL: [HTTPS URL]
- Logo path: [PUBLIC PATH]
- Favicon path: [PUBLIC PATH]
- Apple/PWA icon paths: [PUBLIC PATHS]
- Open Graph image path: [PUBLIC PATH]
- Brand, accent, link, light, and dark colors: [COLORS]
- Quran playlist and representative thumbnail video IDs: [IDS]
- Favorite-reciter playlist and representative thumbnail video IDs: [IDS]
- Deployment target: [Vercel, Netlify, Render, Cloudflare, Railway, Docker, CranL, Coolify, or Dokploy]

Requirements:
1. Read README.md, WHITE_LABELING.md, `/llms.txt`, .env.example,
   src/config/site.ts, and the selected provider manifest before editing.
2. Use src/config/site.ts and documented NEXT_PUBLIC_* values as the central
   white-label source. Do not scatter identity, domains, assets, or colors
   through components. Use translationOverrides for localized copy.
3. Preserve Quranic text exactly and keep all memorial/religious language
   respectful. Do not replace content that I did not explicitly provide.
4. Keep the application on its current Next.js 16.3 stable line, Cache Components,
   Partial Prefetching, Instant Navigations, React 19, and TypeScript 7 setup.
5. Preserve native one-click YouTube players. A playlist ID controls playback;
   its representative video ID supplies the native poster, and the iframe is
   inserted near the viewport to defer third-party work.
6. Preserve direction-aware typography: LTR interface controls use Lexend Deca;
   RTL interface controls use Tajawal; Quranic Arabic may use its dedicated
   Arabic/Quran font. Never add a broad CSS selector that overrides both.
   Keep landing-page titles for dedicated sections clickable, and generate every
   section URL with the active locale (`/[lang]/sections/[section]`).
7. Never commit .env, .env.local, credentials, tokens, private keys, .agents/,
   .claude/, skills-lock.json, SKILL.md, Playwright output, or browser state.
   Only .env.example may be committed, and it must contain placeholders.
8. NEXT_PUBLIC_* values are public browser data. Never place a secret in one.
9. Do not configure static-only hosting: the app requires a Next.js runtime for
   API routes and dynamic behavior.
10. Branch from `sandbox`, open PRs into `sandbox` first, then promote to `main` with a `fix:` / `feat:` title.
    Delete feature branches after they are fully merged.
11. After implementation, run and report real output from:
    npm ci --legacy-peer-deps
    npm run lint
    npm run type-check
    npm run test:e2e
    npm run build
    git diff --check
12. In browser tests, verify the configured title, canonical URL, logo, favicon,
    /manifest.webmanifest, theme variables, both YouTube thumbnails, donation
    destination, an LTR route, an RTL route, and computed CTA font families.
13. Validate the selected provider manifest and, for Docker, build the image and
    smoke-test /, /manifest.webmanifest, and /api/ip-location without inventing
    successful output if a provider or Docker is unavailable.
14. Show me the final diff and validation results before committing or deploying.
```

### Post-deployment checklist

- [ ] Configure custom domain
- [ ] Verify HTTPS is enabled
- [ ] Test PWA installation and service worker
- [ ] Verify prayer times API
- [ ] Smoke-test LTR and RTL locales
- [ ] Confirm `/health`, `/manifest.webmanifest`, `/llms.txt`, and sitemap
- [ ] Run Lighthouse / PageSpeed on mobile

---

## Features breakdown

### YouTube playlist

- Embedded Quran recitation playlists
- Responsive 16:9 native players
- Deferred third-party iframe work near the viewport
- Direct playlist links

### Orphan sponsorship

- Direct integration with the Ehsan.sa campaign
- Benefits of orphan sponsorship listed
- Header and section CTAs labeled for orphan sponsorship (not a generic “Donate”)

### Prayer times and Hijri calendar

- Geolocation with fallback to Riyadh, Saudi Arabia
- Five daily prayers plus sunrise
- Hijri and Gregorian dates
- Location display

### Quran

- All 114 Surahs
- Arabic text rendering with translations
- Search and surah selection
- Long-lived API caching

### Tafseer

- Search by Surah and Ayah
- Multiple interpretation sources
- Readable HTML rendering

### Hadith

- Authentic selections with Arabic and translation
- Source references (e.g. Bukhari, Muslim)

### Dhikr counter

- Digital tasbih options (SubhanAllah, Alhamdulillah, Allahu Akbar)
- Milestone tracking and reset
- Haptic feedback on supporting devices

### Qibla finder

- Compass direction and distance to Makkah
- Device orientation / geolocation support

---

## Security and privacy

**Security headers (via Proxy / platform):** HSTS (preload), `Referrer-Policy: strict-origin-when-cross-origin`, frame protections, nosniff, COOP, and CSP as configured in `src/proxy.ts` / `next.config.js`. Details and residual CSP risk: [docs/SECURITY-HEADERS.md](./docs/SECURITY-HEADERS.md).

**CI Security job:** `npm audit --audit-level=high` and gitleaks on PRs to `sandbox` / `main`.

**Privacy:**

- Vercel Analytics and Speed Insights are configurable; analytics can be disabled with the documented public setting
- Prayer times and Qibla may use visitor IP/browser location with permission or API lookup
- Browser storage is used for preferences, bookmarks, PWA dismissal state, and cached offline resources
- External Quran, prayer, geolocation, donation, audio, and YouTube services have their own privacy policies

---

## Orphan sponsorship

Continue Meshari's legacy through orphan sponsorship (كفالة اليتيم):

[Donate for orphans via Ehsan.sa](https://ehsan.sa/campaign/6FC11E15DA)

> When a person dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him.  
> — Prophet Muhammad ﷺ (Sahih Muslim 1631)

---

## Development notes

### Code structure

```text
meshari-alabra-ongoing-charity/
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── [lang]/                  # Localized landing + sections
│   │   ├── api/                     # Quran proxy, location, audio, etc.
│   │   ├── llms.txt/route.ts        # Agent orientation file
│   │   ├── sitemap.ts / robots.ts / manifest.ts / og-image/
│   │   └── globals.css
│   ├── components/                  # UI, sections, wrappers, PWA, audio
│   ├── config/site.ts               # White-label identity and media
│   ├── lib/                         # Metadata, translations, routes
│   ├── locales/                     # 15 language JSON packs
│   └── proxy.ts                     # Routing + security headers
├── public/                          # Icons, fonts, stories, sw.js, offline.html
├── tests/e2e/                       # Playwright suite
├── docs/screenshots/                # README screenshots
├── vercel.json / netlify.toml / render.yaml / railway.json / wrangler.jsonc
├── open-next.config.ts / Dockerfile
└── package.json
```

### Key technologies

- Dynamic imports and deferred client shells for non-critical UI
- Dependency-free service worker with bounded caching
- Image optimization (AVIF/WebP)
- Direction-aware self-hosted fonts
- Strategic caching for external APIs

---

## In memory of

**Meshari Ahmed Sulaiman Alabra**  
**مشاري بن أحمد بن سليمان العبره (رحمه الله)**

*Passed away on March 29, 2023 (7th Ramadan, 1444h) in Riyadh, Saudi Arabia*

> إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ  
> *Indeed we belong to Allah, and indeed to Him we will return.*

May Allah have mercy on him, forgive his sins, expand his grave, and accept every Quran recitation, prayer, and charitable act done through this platform in his favor.

---

## Contributing

This is a memorial project. Please read [CONTRIBUTING.md](./CONTRIBUTING.md).

1. Branch from `sandbox`
2. Keep changes focused and respectful
3. Run `npm run lint`, `npm run type-check`, `npm run test:e2e`, `npm run build`, and `npm audit --audit-level=high`
4. Use [Conventional Commits](https://www.conventionalcommits.org/) so Release Please can batch patch/minor releases
5. Open a PR into `sandbox`, then promote with `fix:` / `feat:` via `scripts/promote-sandbox-to-main.sh`
6. Delete the feature branch after it is fully merged

---

## License

Source code is available under the [MIT License](./LICENSE). Dedicated to the memory of Meshari Ahmed Sulaiman Alabra as ongoing charity.

---

## Links

- Live site: [https://meshari.charity](https://meshari.charity)
- Releases: [GitHub Releases](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/releases)
- Issues: [GitHub Issues](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/issues)
- Orphan sponsorship: [Ehsan.sa campaign](https://ehsan.sa/campaign/6FC11E15DA)

<div align="center">

**اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ**

*May Allah forgive him and have mercy upon him*

Sadaqah Jariyah — صدقة جارية

</div>
