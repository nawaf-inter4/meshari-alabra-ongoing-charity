"use client";

import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Dynamically import react-pdf only on client to avoid SSR issues
let Document: any = null;
let Page: any = null;
let pdfjs: any = null;

interface PDFViewerProps {
  pdfUrl: string;
  className?: string;
}

export default function PDFViewer({ pdfUrl, className = "" }: PDFViewerProps) {
  const { direction } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [pdfModuleLoaded, setPdfModuleLoaded] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [containerWidth, setContainerWidth] = useState(800);
  
  const isRTL = direction === "rtl";
  
  // Calculate responsive scale and width based on screen size
  const getResponsiveScale = () => {
    if (typeof window === "undefined") return 1.5;
    const width = window.innerWidth;
    if (width < 640) return 0.8; // Mobile
    if (width < 768) return 1.0; // Tablet
    if (width < 1024) return 1.2; // Small desktop
    return 1.5; // Desktop
  };
  
  const [scale, setScale] = useState(getResponsiveScale());
  
  // Update container width and scale on resize
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const updateDimensions = () => {
      const width = window.innerWidth;
      setContainerWidth(Math.min(width - 32, 1200)); // Max width with padding
      setScale((prev) => {
        const newScale = getResponsiveScale();
        // Only update if significantly different to avoid constant updates
        return Math.abs(prev - newScale) > 0.1 ? newScale : prev;
      });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    setMounted(true);
    // Load react-pdf module
    if (typeof window !== "undefined") {
      import("react-pdf").then((module) => {
        Document = module.Document;
        Page = module.Page;
        pdfjs = module.pdfjs;
        pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;
        setPdfModuleLoaded(true);
      });
    }
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setError(false);
    setErrorMessage("");
    console.log("PDF loaded successfully:", numPages, "pages");
  }

  function onDocumentLoadError(error: any) {
    console.error("Error loading PDF:", error);
    console.error("PDF URL:", pdfUrl);
    console.error("Error details:", {
      name: error?.name,
      message: error?.message,
      stack: error?.stack,
    });
    setErrorMessage(error?.message || error?.toString() || "Unknown error");
    setError(true);
  }

  function goToPrevPage() {
    setPageNumber((prev) => Math.max(1, prev - 1));
  }

  function goToNextPage() {
    setPageNumber((prev) => Math.min(numPages || 1, prev + 1));
  }

  // Memoize file object to prevent unnecessary reloads
  const fileConfig = useMemo(() => ({
    url: pdfUrl,
    httpHeaders: {
      'Accept': 'application/pdf',
    },
    withCredentials: false,
  }), [pdfUrl]);

  if (!mounted || !pdfModuleLoaded || !Document || !Page) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-lg min-h-[400px]`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-islamic-gold"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className} flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-lg min-h-[400px]`}>
        <div className="text-center text-gray-500 dark:text-gray-400 mb-4">
          <p className="text-lg mb-2 font-semibold">Failed to load PDF</p>
          <p className="text-sm mb-4">{errorMessage || "Unable to load the PDF document"}</p>
          <div className="flex gap-2 justify-center">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-islamic-gold text-white rounded-full hover:bg-islamic-green transition-colors text-sm"
            >
              Open in New Tab
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} flex flex-col items-center w-full`}>
      {/* Controls - Responsive layout */}
      <div className={`w-full flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4 p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
        {/* Page Navigation */}
        <div className={`flex items-center justify-center gap-2 sm:gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Forward (Next Page) - Left side */}
          <button
            onClick={goToNextPage}
            disabled={pageNumber >= (numPages || 1)}
            className="p-2 sm:p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
            Page {pageNumber} of {numPages || "..."}
          </span>
          {/* Back (Previous Page) - Right side */}
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="p-2 sm:p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
        
        {/* Divider - hidden on mobile */}
        <div className="hidden sm:block w-px h-6 bg-gray-300 dark:bg-gray-600" />
        
        {/* Zoom Controls */}
        <div className={`flex items-center justify-center gap-2 sm:gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <button
            onClick={() => setScale((prev) => Math.max(0.5, prev - 0.25))}
            className="p-2 sm:p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
          </button>
          <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[50px] sm:min-w-[60px] text-center" aria-label={`Current zoom level: ${Math.round(scale * 100)}%`}>
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => setScale((prev) => Math.min(3, prev + 0.25))}
            className="p-2 sm:p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* PDF Document - Responsive container */}
      <div 
        className="w-full overflow-auto bg-gray-100 dark:bg-gray-900 rounded-lg p-2 sm:p-4"
        style={{ 
          overscrollBehavior: 'contain',
          maxHeight: 'calc(100vh - 200px)',
          minHeight: '400px',
        }}
        onWheel={(e) => {
          const target = e.currentTarget;
          const { scrollTop, scrollHeight, clientHeight } = target;
          const isScrollingUp = e.deltaY < 0;
          const isScrollingDown = e.deltaY > 0;
          const isAtTop = scrollTop <= 0;
          const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;
          
          // Prevent page scroll when scrolling inside the PDF container
          // Only allow page scroll when at boundaries
          if ((isScrollingUp && !isAtTop) || (isScrollingDown && !isAtBottom)) {
            e.stopPropagation();
          }
        }}
      >
        <div className="flex justify-center">
          <Document
            file={fileConfig}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="flex items-center justify-center w-full h-full min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-islamic-gold"></div>
              </div>
            }
            error={
              <div className="flex items-center justify-center w-full h-full min-h-[400px]">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <p className="text-lg mb-2">Failed to load PDF</p>
                  <p className="text-sm">{errorMessage || "Please try opening it in a new tab"}</p>
                </div>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              width={containerWidth}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="shadow-lg max-w-full h-auto"
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </Document>
        </div>
      </div>
    </div>
  );
}

