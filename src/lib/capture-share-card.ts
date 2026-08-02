import { toPng } from "html-to-image";

let amiriFontCssPromise: Promise<string> | null = null;

async function loadAmiriFontEmbedCss(): Promise<string> {
  if (amiriFontCssPromise) return amiriFontCssPromise;

  amiriFontCssPromise = (async () => {
    const origin = window.location.origin;
    const faces = [
      { weight: 400, path: "/fonts/amiri-arabic-400.woff2" },
      { weight: 700, path: "/fonts/amiri-arabic-700.woff2" },
    ] as const;

    const rules: string[] = [];
    for (const face of faces) {
      try {
        const response = await fetch(`${origin}${face.path}`, { cache: "force-cache" });
        if (!response.ok) continue;
        const buffer = await response.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        let binary = "";
        for (let i = 0; i < bytes.length; i++) {
          binary += String.fromCharCode(bytes[i]!);
        }
        const base64 = btoa(binary);
        rules.push(`
          @font-face {
            font-family: 'Amiri';
            font-style: normal;
            font-weight: ${face.weight};
            font-display: block;
            src: url('data:font/woff2;base64,${base64}') format('woff2');
          }
        `);
      } catch {
        /* fall through — still try URL form below */
      }
    }

    if (rules.length === 0) {
      return `
        @font-face {
          font-family: 'Amiri';
          font-style: normal;
          font-weight: 400;
          src: url('${origin}/fonts/amiri-arabic-400.woff2') format('woff2');
        }
        @font-face {
          font-family: 'Amiri';
          font-style: normal;
          font-weight: 700;
          src: url('${origin}/fonts/amiri-arabic-700.woff2') format('woff2');
        }
      `;
    }

    return rules.join("\n");
  })();

  return amiriFontCssPromise;
}

function applyShareCardFonts(root: HTMLElement) {
  const amiriStack = "'Amiri', 'Noto Naskh Arabic', serif";
  const arabicNodes = root.querySelectorAll<HTMLElement>(
    ".share-verse-ayah, .share-verse-surah, .share-verse-meta, .share-verse-tafsir-label, .share-verse-tafsir-body, .arabic-quran-text, [lang='ar']",
  );

  arabicNodes.forEach((node) => {
    node.style.setProperty("font-family", amiriStack, "important");
    node.style.setProperty("text-rendering", "optimizeLegibility", "important");
    node.style.setProperty(
      "font-feature-settings",
      '"liga" 1, "clig" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1',
      "important",
    );
  });

  const ayah = root.querySelector<HTMLElement>(".share-verse-ayah");
  if (ayah) {
    ayah.style.setProperty("line-height", "2.15", "important");
    ayah.style.setProperty("padding-bottom", "0.75rem", "important");
    ayah.style.setProperty("margin-bottom", "1.25rem", "important");
    ayah.style.setProperty("overflow", "visible", "important");
  }

  const surah = root.querySelector<HTMLElement>(".share-verse-surah");
  if (surah) {
    surah.style.setProperty("line-height", "1.55", "important");
    surah.style.setProperty("margin-bottom", "0.25rem", "important");
  }
}

/**
 * Capture the share-card preview as a PNG that matches the on-screen card:
 * embed Amiri as data-URI (reliable), keep layout spacing so ayah never overlaps tafsir.
 */
export async function captureShareCardPng(
  source: HTMLElement,
  options: { backgroundColor: string },
): Promise<string> {
  if (typeof document === "undefined") {
    throw new Error("captureShareCardPng requires a browser document");
  }

  const fontEmbedCSS = await loadAmiriFontEmbedCss();

  try {
    await document.fonts.ready;
    await document.fonts.load('400 28px "Amiri"').catch(() => undefined);
    await document.fonts.load('700 28px "Amiri"').catch(() => undefined);
  } catch {
    /* preview may already be painted */
  }

  const rect = source.getBoundingClientRect();
  const width = Math.max(1, Math.ceil(rect.width));

  const host = document.createElement("div");
  host.setAttribute("data-share-capture-host", "true");
  Object.assign(host.style, {
    position: "fixed",
    left: "0",
    top: "0",
    width: `${width}px`,
    transform: "translateY(-200vh)",
    pointerEvents: "none",
    opacity: "1",
    zIndex: "-1",
    overflow: "visible",
    backgroundColor: options.backgroundColor,
  } as CSSStyleDeclaration);

  // Inject Amiri into the capture host so the clone paints with the right face
  // before html-to-image serializes it.
  const style = document.createElement("style");
  style.textContent = `${fontEmbedCSS}
    [data-share-capture-host] .share-verse-ayah,
    [data-share-capture-host] .share-verse-surah,
    [data-share-capture-host] .share-verse-meta,
    [data-share-capture-host] .share-verse-tafsir-label,
    [data-share-capture-host] .share-verse-tafsir-body,
    [data-share-capture-host] .arabic-quran-text {
      font-family: 'Amiri', 'Noto Naskh Arabic', serif !important;
    }
    [data-share-capture-host] .share-verse-ayah {
      line-height: 2.15 !important;
      padding-bottom: 0.75rem !important;
      margin-bottom: 1.25rem !important;
    }
    [data-share-capture-host] .share-verse-surah {
      line-height: 1.55 !important;
    }
  `;
  host.appendChild(style);

  const clone = source.cloneNode(true) as HTMLElement;
  clone.removeAttribute("data-share-verse-preview");
  clone.setAttribute("data-share-verse-capture", "true");
  clone.style.width = `${width}px`;
  clone.style.maxWidth = `${width}px`;
  clone.style.boxSizing = "border-box";
  clone.style.margin = "0";
  clone.style.transform = "none";
  clone.style.overflow = "visible";
  applyShareCardFonts(clone);

  host.appendChild(clone);
  document.body.appendChild(host);

  try {
    void clone.offsetHeight;
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });
    await document.fonts.load('400 28px "Amiri"').catch(() => undefined);
    await new Promise((resolve) => setTimeout(resolve, 120));

    // Measure after Amiri is applied — add buffer so descenders/diacritics never clip.
    const height = Math.max(1, Math.ceil(clone.scrollHeight) + 24);

    return await toPng(clone, {
      backgroundColor: options.backgroundColor,
      pixelRatio: 2,
      cacheBust: true,
      width,
      height,
      fontEmbedCSS,
      style: {
        width: `${width}px`,
        // Do not force a short height — only set minHeight so content can expand.
        minHeight: `${height}px`,
        transform: "none",
        margin: "0",
        overflow: "visible",
      },
    });
  } finally {
    host.remove();
  }
}
