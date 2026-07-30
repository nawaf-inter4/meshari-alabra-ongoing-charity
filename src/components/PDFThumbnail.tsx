"use client";

import { useEffect, useRef, useState } from "react";
import { FileText } from "lucide-react";

interface PDFThumbnailProps {
  pdfUrl: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export default function PDFThumbnail({
  pdfUrl,
  className = "",
  width = 400,
  height = 300,
  priority = false,
}: PDFThumbnailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shouldRender, setShouldRender] = useState(priority);
  const [rendered, setRendered] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || shouldRender) return;

    const reveal = () => setShouldRender(true);
    const revealIfNear = () => {
      const bounds = container.getBoundingClientRect();
      if (bounds.top <= window.innerHeight + 600 && bounds.bottom >= -600) reveal();
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) reveal();
      },
      { rootMargin: "600px" },
    );

    observer.observe(container);
    window.addEventListener("scroll", revealIfNear, { passive: true });
    window.addEventListener("resize", revealIfNear);
    revealIfNear();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", revealIfNear);
      window.removeEventListener("resize", revealIfNear);
    };
  }, [priority, shouldRender]);

  useEffect(() => {
    if (!shouldRender) return;

    let cancelled = false;
    let loadingTask: { promise: Promise<any>; destroy: () => Promise<void> } | null = null;
    let renderTask: { cancel: () => void; promise: Promise<void> } | null = null;

    const renderThumbnail = async () => {
      try {
        const pdfModule = await import("pdfjs-dist");
        pdfModule.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        loadingTask = pdfModule.getDocument({ url: pdfUrl, withCredentials: false });
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        if (cancelled || !canvasRef.current) return;

        const baseViewport = page.getViewport({ scale: 1 });
        const scale = Math.min(width / baseViewport.width, height / baseViewport.height);
        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Canvas rendering is unavailable");

        const pixelRatio = window.devicePixelRatio || 1;
        canvas.width = Math.floor(viewport.width * pixelRatio);
        canvas.height = Math.floor(viewport.height * pixelRatio);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const currentRenderTask = page.render({
          canvas,
          canvasContext: context,
          viewport,
          transform: pixelRatio === 1 ? undefined : [pixelRatio, 0, 0, pixelRatio, 0, 0],
        });
        renderTask = currentRenderTask;
        await currentRenderTask.promise;
        if (!cancelled) setRendered(true);
      } catch (error) {
        if (!cancelled && !(error instanceof Error && error.name === "RenderingCancelledException")) {
          console.error("Failed to render PDF thumbnail:", error);
          setFailed(true);
        }
      }
    };

    void renderThumbnail();

    return () => {
      cancelled = true;
      renderTask?.cancel();
      void loadingTask?.destroy();
    };
  }, [height, pdfUrl, shouldRender, width]);

  return (
    <div
      ref={containerRef}
      className={`${className} relative overflow-hidden bg-gray-100 dark:bg-gray-900 flex items-center justify-center`}
    >
      {!rendered && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-islamic-gold/20 to-islamic-green/20">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <FileText className="w-12 h-12 mx-auto mb-2 text-islamic-gold/50" />
            {failed && <p className="text-sm">PDF Preview</p>}
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`max-w-full max-h-full object-contain shadow-sm ${rendered ? "block" : "invisible"}`}
      />
    </div>
  );
}