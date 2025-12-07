"use client";

import { useState, useEffect, useMemo } from "react";
import { FileText } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Dynamically import react-pdf only on client to avoid SSR issues
let Document: any = null;
let Page: any = null;
let pdfjs: any = null;

if (typeof window !== "undefined") {
  import("react-pdf").then((module) => {
    Document = module.Document;
    Page = module.Page;
    pdfjs = module.pdfjs;
    // Set up PDF.js worker - use local file for reliability
    pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;
  });
}

interface PDFThumbnailProps {
  pdfUrl: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function PDFThumbnail({ 
  pdfUrl, 
  className = "", 
  width = 400,
  height = 300 
}: PDFThumbnailProps) {
  const [mounted, setMounted] = useState(false);
  const [pdfModuleLoaded, setPdfModuleLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load react-pdf module immediately
    if (typeof window !== "undefined") {
      const loadModule = async () => {
        try {
          const module = await import("react-pdf");
          Document = module.Document;
          Page = module.Page;
          pdfjs = module.pdfjs;
          pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;
          setPdfModuleLoaded(true);
        } catch (err) {
          console.error("Failed to load react-pdf:", err);
        }
      };
      loadModule();
    }
  }, []);

  // Memoize file object to prevent unnecessary reloads
  const fileConfig = useMemo(() => ({
    url: pdfUrl,
    httpHeaders: {
      'Accept': 'application/pdf',
    },
    withCredentials: false,
  }), [pdfUrl]);

  // Memoize options to prevent unnecessary reloads
  const pdfOptions = useMemo(() => ({
    cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/standard_fonts/',
  }), []);

  // Show placeholder only if not mounted
  if (!mounted) {
    return (
      <div className={`${className} bg-gradient-to-br from-islamic-gold/20 to-islamic-green/20 flex items-center justify-center`}>
        <FileText className="w-12 h-12 text-islamic-gold/50" />
      </div>
    );
  }

  // If module not loaded yet, show placeholder but start loading
  if (!pdfModuleLoaded || !Document || !Page) {
    return (
      <div className={`${className} bg-gradient-to-br from-islamic-gold/20 to-islamic-green/20 flex items-center justify-center`}>
        <FileText className="w-12 h-12 text-islamic-gold/50" />
      </div>
    );
  }

  // Render PDF immediately - no loading state blocking
  return (
    <div className={`${className} relative overflow-hidden bg-gray-100 dark:bg-gray-900 flex items-center justify-center`}>
      <Document
        file={fileConfig}
        className="w-full h-full flex items-center justify-center"
        error={
          <div className="flex items-center justify-center w-full h-full">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <FileText className="w-12 h-12 mx-auto mb-2 text-islamic-gold" />
              <p className="text-sm">PDF Preview</p>
            </div>
          </div>
        }
        options={pdfOptions}
      >
        <Page
          pageNumber={1}
          width={width}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          className="!max-w-full !max-h-full object-contain shadow-sm"
        />
      </Document>
    </div>
  );
}
