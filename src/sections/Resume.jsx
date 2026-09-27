import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Download, 
  FileText, 
  Check, 
  Sparkles, 
  Maximize2, 
  Minimize2, 
  ExternalLink, 
  Eye, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Expand, 
  Shrink,
  ChevronLeft,
  ChevronRight,
  Layers
} from 'lucide-react';
import { resumeData } from '../data/portfolioData';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { cn } from '../utils/helpers';
import aritraResumeP1 from '../assets/aritra-resume-p1.png';
import aritraResumeP2 from '../assets/aritra-resume-p2.png';
import aritraResumeImg from '../assets/aritra-resume.png';

export function Resume({ onShowToast }) {
  const [downloadState, setDownloadState] = useState('idle'); // 'idle' | 'downloading' | 'completed'
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadFormat, setDownloadFormat] = useState('pdf'); // 'pdf' | 'png'
  
  // Page states
  const [activePreviewPage, setActivePreviewPage] = useState(1); // 1 | 2
  const [modalPage, setModalPage] = useState(1); // 1 | 2 | 'all'
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalZoom, setModalZoom] = useState(1);
  const [viewMode, setViewMode] = useState('fit-page'); // 'fit-page' | 'fit-width'
  const [isFullscreenActive, setIsFullscreenActive] = useState(false);

  // Touch tracking for swipe gestures
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e, context = 'preview') => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;

    // Trigger only if horizontal movement is dominant and > 45px
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX < 0) {
        // Swipe Left -> Next Page
        if (context === 'preview') {
          setActivePreviewPage(2);
        } else if (modalPage === 1) {
          setModalPage(2);
        }
      } else {
        // Swipe Right -> Prev Page
        if (context === 'preview') {
          setActivePreviewPage(1);
        } else if (modalPage === 2) {
          setModalPage(1);
        }
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  const handleDownload = (e, specificFile = null) => {
    if (e) e.preventDefault();
    if (downloadState === 'downloading') return;

    setDownloadState('downloading');
    setDownloadProgress(0);

    // Smooth multi-step progress animation
    const steps = [
      { p: 20, delay: 120 },
      { p: 48, delay: 350 },
      { p: 75, delay: 650 },
      { p: 92, delay: 900 },
      { p: 100, delay: 1100 },
    ];

    steps.forEach(({ p, delay }) => {
      setTimeout(() => {
        setDownloadProgress(p);
      }, delay);
    });

    // Complete download after animation finishes
    setTimeout(() => {
      setDownloadState('completed');

      let fileUrl = resumeData.pdfUrl;
      let fileName = 'Aritra_Mondal_Resume.pdf';

      if (specificFile === 'p1') {
        fileUrl = resumeData.page1PngUrl || '/Aritra_Mondal_Resume_Page1.png';
        fileName = 'Aritra_Mondal_Resume_Page1.png';
      } else if (specificFile === 'p2') {
        fileUrl = resumeData.page2PngUrl || '/Aritra_Mondal_Resume_Page2.png';
        fileName = 'Aritra_Mondal_Resume_Page2.png';
      } else if (downloadFormat === 'png') {
        fileUrl = resumeData.pngUrl;
        fileName = 'Aritra_Mondal_Resume.png';
      }

      // Trigger native download
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (onShowToast) {
        onShowToast(`Downloaded ${fileName}`, 'success');
      }

      // Reset back to idle state after 3.5s
      setTimeout(() => {
        setDownloadState('idle');
        setDownloadProgress(0);
      }, 3500);
    }, 1250);
  };

  const openModal = (page = null) => {
    if (typeof page === 'number' || page === 'all') {
      setModalPage(page);
    } else {
      setModalPage(activePreviewPage);
    }
    setIsModalOpen(true);
    setViewMode('fit-page');
    setModalZoom(1);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setViewMode('fit-page');
    setModalZoom(1);
    if (document.fullscreenElement) {
      try {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
      } catch {}
    }
  };

  const toggleViewMode = useCallback(() => {
    setViewMode((prev) => (prev === 'fit-page' ? 'fit-width' : 'fit-page'));
    setModalZoom(1);
  }, []);

  const handleZoomIn = useCallback(() => {
    setModalZoom((z) => Math.min(2.5, +(z + 0.25).toFixed(2)));
    setViewMode((mode) => (mode === 'fit-page' ? 'fit-width' : mode));
  }, []);

  const handleZoomOut = useCallback(() => {
    setModalZoom((z) => {
      const next = +(z - 0.25).toFixed(2);
      return next <= 0.6 ? 0.6 : next;
    });
  }, []);

  const handleResetZoom = useCallback(() => {
    setModalZoom(1);
    setViewMode('fit-page');
  }, []);

  const toggleNativeFullscreen = () => {
    try {
      if (!document.fullscreenElement) {
        const root = document.documentElement;
        if (root.requestFullscreen) root.requestFullscreen();
        else if (root.webkitRequestFullscreen) root.webkitRequestFullscreen();
        else if (root.msRequestFullscreen) root.msRequestFullscreen();
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
      }
    } catch {}
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreenActive(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        setModalPage((prev) => (prev === 1 ? 2 : prev));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        setModalPage((prev) => (prev === 2 ? 1 : prev));
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        handleZoomIn();
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        handleZoomOut();
      } else if (e.key === '0') {
        e.preventDefault();
        handleResetZoom();
      } else if (e.key.toLowerCase() === 'f' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        toggleViewMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, handleZoomIn, handleZoomOut, handleResetZoom, toggleViewMode]);

  return (
    <section id="resume" className="scroll-mt-20 py-20 md:py-28 border-t border-zinc-200 dark:border-zinc-900 relative transition-colors duration-300">
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP SECTION HEADER */}
        <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-zinc-500 dark:text-zinc-400 uppercase mb-4 select-none">
          <span className="text-zinc-400 dark:text-zinc-600 font-semibold">{resumeData.sectionNumber}</span>
          <span>/</span>
          <span>{resumeData.sectionTitle}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT COLUMN: TITLE, INFO & INTERACTIVE DOWNLOAD CARD */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white mb-3 flex items-center gap-2.5">
                <span>Professional Profile</span>
                <Sparkles className="w-5 h-5 text-blue-500 hidden sm:inline" />
              </h3>

              <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                {resumeData.description}
              </p>
            </div>

            {/* Quick Resume Highlights Pills */}
            {resumeData.highlights && (
              <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
                {resumeData.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 transition-all hover:border-zinc-300 dark:hover:border-zinc-700 flex flex-col justify-center"
                  >
                    <div className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-semibold">
                      {item.label}
                    </div>
                    <div className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 mt-0.5 leading-snug break-words">
                      {item.val}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Interactive Download Controller Card */}
            <Card
              spotlight={true}
              tilt={false}
              className="p-5 sm:p-6 flex flex-col gap-5 border-blue-500/20 dark:border-blue-500/20 shadow-md"
            >
              {/* Card Meta Header - Responsive Stack on Mobile */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-500 dark:text-red-400 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-white tracking-tight truncate">
                      {downloadFormat === 'pdf' ? 'Aritra_Mondal_Resume.pdf' : 'Aritra_Mondal_Resume.png'}
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 font-mono flex items-center gap-2">
                      <span>{resumeData.fileInfo}</span>
                      <span className="text-zinc-300 dark:text-zinc-700">·</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Vector Clean</span>
                    </p>
                  </div>
                </div>

                {/* Format Toggle (PDF vs PNG) - Dedicated Mobile & Desktop Space */}
                <div className="flex items-center self-start sm:self-auto p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/60 text-xs font-mono flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setDownloadFormat('pdf')}
                    className={`px-3.5 py-1.5 min-h-[34px] rounded-lg transition-all cursor-pointer flex items-center justify-center font-bold ${
                      downloadFormat === 'pdf'
                        ? 'bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                    }`}
                  >
                    PDF (Vector)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDownloadFormat('png')}
                    className={`px-3.5 py-1.5 min-h-[34px] rounded-lg transition-all cursor-pointer flex items-center justify-center font-bold ${
                      downloadFormat === 'png'
                        ? 'bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                    }`}
                  >
                    PNG
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* INTERACTIVE DOWNLOAD ANIMATION BUTTON */}
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={downloadState === 'downloading'}
                  aria-label="Download resume"
                  className={`relative overflow-hidden inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 flex-1 shadow-sm select-none cursor-pointer active:scale-[0.98] min-h-[46px] outline-none touch-manipulation ${
                    downloadState === 'completed'
                      ? 'bg-emerald-600 text-white shadow-emerald-500/25'
                      : downloadState === 'downloading'
                      ? 'bg-zinc-900 text-white dark:bg-zinc-800 cursor-wait'
                      : 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 hover:shadow-md'
                  }`}
                >
                  {/* Dynamic Progress Bar Fill during downloading */}
                  {downloadState === 'downloading' && (
                    <span
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 transition-all duration-200 ease-out opacity-90 animate-progress-shimmer"
                      style={{ width: `${downloadProgress}%` }}
                    />
                  )}

                  {/* Button Content States */}
                  <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
                    {downloadState === 'downloading' ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Downloading {downloadProgress}%...</span>
                      </>
                    ) : downloadState === 'completed' ? (
                      <>
                        <Check className="w-4 h-4 text-white animate-success-pop" />
                        <span>Downloaded!</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                        <span>Download {downloadFormat.toUpperCase()} ({downloadFormat === 'pdf' ? '2 Pages' : 'High-Res'})</span>
                      </>
                    )}
                  </span>
                </button>

                {/* Fullscreen Expand Preview Trigger */}
                <button
                  type="button"
                  onClick={() => openModal(activePreviewPage)}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl font-medium text-xs sm:text-sm bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white transition-all cursor-pointer min-h-[46px] active:scale-[0.98] outline-none select-none touch-manipulation"
                  title="Expand Full Resume"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </button>
              </div>

              {/* Granular Individual Page Downloads */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-zinc-100 dark:border-zinc-800/60 text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                <span className="text-zinc-400 dark:text-zinc-500">Quick page save:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => handleDownload(e, 'p1')}
                    className="hover:text-blue-600 dark:hover:text-blue-400 underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    Page 1 PNG
                  </button>
                  <span className="text-zinc-300 dark:text-zinc-700">·</span>
                  <button
                    type="button"
                    onClick={(e) => handleDownload(e, 'p2')}
                    className="hover:text-blue-600 dark:hover:text-blue-400 underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    Page 2 PNG
                  </button>
                  <span className="text-zinc-300 dark:text-zinc-700">·</span>
                  <a
                    href={resumeData.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span>Raw PDF</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT COLUMN: DIRECT RESUME DOCUMENT PRESENTATION */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative group w-full max-w-lg lg:max-w-none">
              
              {/* Subtle ambient paper drop shadow & glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-blue-500/10 via-zinc-400/5 to-indigo-500/10 dark:from-blue-500/15 dark:to-indigo-500/15 blur-xl -z-10 group-hover:scale-102 transition-transform duration-500" />

              {/* Document Frame */}
              <div className="relative rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:border-blue-500/40">
                
                {/* Document Top Bar with Interactive Page 1 / Page 2 Switcher */}
                <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-zinc-50 dark:bg-zinc-950/60 border-b border-zinc-200 dark:border-zinc-800/80 select-none">
                  {/* Traffic light dots & filename */}
                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                    </div>
                    <span className="ml-1 sm:ml-2 text-[11px] sm:text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 truncate">
                      Aritra_Mondal_Resume.pdf
                    </span>
                    <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-zinc-200/80 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 flex-shrink-0">
                      Page {activePreviewPage} of 2
                    </span>
                  </div>

                  {/* Page Switcher & Fullscreen Action */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Page 1 / Page 2 Toggle Pills */}
                    <div className="flex items-center p-0.5 rounded-lg bg-zinc-200/70 dark:bg-zinc-800 border border-zinc-300/60 dark:border-zinc-700/60 text-xs font-mono">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePreviewPage(1);
                        }}
                        className={cn(
                          "px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1",
                          activePreviewPage === 1
                            ? "bg-white dark:bg-zinc-950 text-blue-600 dark:text-blue-400 shadow-xs"
                            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                        )}
                        title="Show Page 1: Summary, Skills & Selected Projects"
                      >
                        <span>P1</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePreviewPage(2);
                        }}
                        className={cn(
                          "px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1",
                          activePreviewPage === 2
                            ? "bg-white dark:bg-zinc-950 text-blue-600 dark:text-blue-400 shadow-xs"
                            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                        )}
                        title="Show Page 2: Experience, Education & Achievements"
                      >
                        <span>P2</span>
                      </button>
                    </div>

                    {/* Fullscreen Button */}
                    <button
                      type="button"
                      onClick={() => openModal(activePreviewPage)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 transition-colors cursor-pointer flex-shrink-0"
                      title="View Fullscreen"
                    >
                      <Maximize2 className="w-3 h-3 flex-shrink-0" />
                      <span className="text-[11px] sm:text-xs whitespace-nowrap font-medium">Fullscreen</span>
                    </button>
                  </div>
                </div>

                {/* High-Resolution Resume Sheet Display with Touch Swipe */}
                <div
                  onClick={() => openModal(activePreviewPage)}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={(e) => handleTouchEnd(e, 'preview')}
                  className="relative cursor-zoom-in overflow-hidden bg-zinc-100/80 dark:bg-zinc-950/80 p-3 sm:p-5 flex flex-col items-center"
                >
                  <div className="relative w-full max-w-xl shadow-2xl rounded-xl overflow-hidden bg-white ring-1 ring-zinc-900/5 dark:ring-white/10 transition-transform duration-300">
                    <img
                      src={activePreviewPage === 1 ? aritraResumeP1 : aritraResumeP2}
                      alt={`Aritra Mondal - Graphic & UI/UX Designer Official Resume Page ${activePreviewPage}`}
                      className="w-full h-auto object-contain select-none transition-transform duration-500 group-hover:scale-[1.01]"
                      loading="eager"
                      decoding="sync"
                    />

                    {/* Page Content Label Ribbon */}
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md bg-zinc-900/85 dark:bg-zinc-900/90 text-white text-[10px] font-mono font-medium backdrop-blur-md shadow-md border border-white/10 pointer-events-none">
                      {activePreviewPage === 1 ? 'Page 1 · Summary & Projects' : 'Page 2 · Experience & Education'}
                    </div>
                  </div>

                  {/* Floating Bottom Page Nav Bar for quick mobile & desktop flipping */}
                  <div 
                    onClick={(e) => e.stopPropagation()} 
                    className="mt-3.5 flex items-center gap-1.5 p-1 rounded-xl bg-white/95 dark:bg-zinc-900/95 border border-zinc-200 dark:border-zinc-800 shadow-md backdrop-blur-md text-xs font-mono"
                  >
                    <button
                      type="button"
                      onClick={() => setActivePreviewPage(1)}
                      disabled={activePreviewPage === 1}
                      className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer flex items-center gap-1"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline text-[11px]">Prev Page</span>
                    </button>

                    <div className="flex items-center px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
                      Page {activePreviewPage} of 2
                    </div>

                    <button
                      type="button"
                      onClick={() => setActivePreviewPage(2)}
                      disabled={activePreviewPage === 2}
                      className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer flex items-center gap-1"
                      aria-label="Next page"
                    >
                      <span className="hidden sm:inline text-[11px]">Next Page</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Hover Overlay Hint */}
                  <div className="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/20 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                    <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 px-4 py-2 rounded-xl bg-zinc-950/90 text-white text-xs font-mono font-medium backdrop-blur-md shadow-xl border border-white/10 flex items-center gap-2">
                      <ZoomIn className="w-3.5 h-3.5 text-blue-400" />
                      <span>Click to view & zoom in full size</span>
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL WITH 2-PAGE VIEWER & INTERACTIVE FIT & ZOOM CONTROLS */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Aritra Mondal — Professional Profile"
        subtitle="Graphic & UI/UX Designer · 2-Page Resume"
        maxWidth="max-w-6xl 2xl:max-w-7xl"
        className="h-[92vh] sm:h-[94vh] flex flex-col"
        bodyClassName="p-2 sm:p-4 flex-1 min-h-0 flex flex-col overflow-hidden"
      >
        <div className="flex flex-col h-full gap-2 sm:gap-3">
          {/* Modal Header Actions with Interactive Page Switching, Zoom & View Mode Toolbar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 pb-2.5 border-b border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400 flex-shrink-0">
            {/* Left Controls: Page Switcher + Fit Mode + Zoom */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {/* Page Switcher Toolbar */}
              <div className="flex items-center p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60">
                <button
                  type="button"
                  onClick={() => setModalPage(1)}
                  disabled={modalPage === 1}
                  aria-label="Previous Page"
                  className="p-1 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                  title="Page 1 (Arrow Left)"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setModalPage(1)}
                  className={cn(
                    'px-2 py-0.5 rounded-lg text-xs font-semibold transition-all cursor-pointer',
                    modalPage === 1
                      ? 'bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                  )}
                >
                  Page 1
                </button>

                <button
                  type="button"
                  onClick={() => setModalPage(2)}
                  className={cn(
                    'px-2 py-0.5 rounded-lg text-xs font-semibold transition-all cursor-pointer',
                    modalPage === 2
                      ? 'bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                  )}
                >
                  Page 2
                </button>

                <button
                  type="button"
                  onClick={() => setModalPage('all')}
                  className={cn(
                    'px-2 py-0.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1',
                    modalPage === 'all'
                      ? 'bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                  )}
                  title="View both pages continuous scroll"
                >
                  <Layers className="w-3 h-3" />
                  <span className="hidden sm:inline">All</span>
                </button>

                <button
                  type="button"
                  onClick={() => setModalPage(2)}
                  disabled={modalPage === 2}
                  aria-label="Next Page"
                  className="p-1 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                  title="Page 2 (Arrow Right)"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Fit Mode Switcher */}
              <div className="flex items-center p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60">
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('fit-page');
                    setModalZoom(1);
                  }}
                  className={cn(
                    'px-2 sm:px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5',
                    viewMode === 'fit-page' && modalZoom === 1
                      ? 'bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-sm font-semibold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  )}
                  title="Fit entire page to screen height (F)"
                >
                  <Shrink className="w-3.5 h-3.5" />
                  <span>Fit Page</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setViewMode('fit-width');
                    setModalZoom(1);
                  }}
                  className={cn(
                    'px-2 sm:px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5',
                    viewMode === 'fit-width' && modalZoom === 1
                      ? 'bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-sm font-semibold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  )}
                  title="Fit width for comfortable reading (F)"
                >
                  <Expand className="w-3.5 h-3.5" />
                  <span>Fit Width</span>
                </button>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  disabled={modalZoom <= 0.6}
                  aria-label="Zoom out"
                  className="p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer min-w-[28px] min-h-[28px] flex items-center justify-center"
                  title="Zoom Out (-)"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>

                <span className="px-1.5 text-[11px] font-semibold text-zinc-900 dark:text-white min-w-[42px] text-center select-none">
                  {viewMode === 'fit-page' && modalZoom === 1 ? '100%' : `${Math.round(modalZoom * 100)}%`}
                </span>

                <button
                  type="button"
                  onClick={handleZoomIn}
                  disabled={modalZoom >= 2.5}
                  aria-label="Zoom in"
                  className="p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer min-w-[28px] min-h-[28px] flex items-center justify-center"
                  title="Zoom In (+)"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>

                {(modalZoom !== 1 || viewMode !== 'fit-page') && (
                  <button
                    type="button"
                    onClick={handleResetZoom}
                    aria-label="Reset to Fit Page"
                    className="p-1.5 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer min-w-[28px] min-h-[28px] flex items-center justify-center"
                    title="Reset view (0)"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Quick Actions: Fullscreen, Open in Tab, Download */}
            <div className="flex items-center justify-end gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={toggleNativeFullscreen}
                className="hidden md:inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors cursor-pointer min-h-[34px]"
                title={isFullscreenActive ? "Exit Browser Fullscreen" : "Enter True Desktop Fullscreen"}
              >
                {isFullscreenActive ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                <span>{isFullscreenActive ? "Windowed" : "Maximize"}</span>
              </button>

              <a
                href={resumeData.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors cursor-pointer min-h-[34px]"
                title="Open pristine vector PDF in new browser tab"
              >
                <span>Open PDF</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors cursor-pointer min-h-[34px] active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download {downloadFormat.toUpperCase()}</span>
              </button>
            </div>
          </div>

          {/* Document Canvas Container with Touch Gestures */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={(e) => handleTouchEnd(e, 'modal')}
            className={cn(
              "flex-1 min-h-0 w-full rounded-xl bg-zinc-200/50 dark:bg-zinc-950/90 border border-zinc-200 dark:border-zinc-800/80 p-2 sm:p-4 select-none relative transition-all",
              viewMode === 'fit-page' && modalZoom === 1 && modalPage !== 'all'
                ? "flex items-center justify-center overflow-hidden"
                : "flex justify-center overflow-auto items-start"
            )}
          >
            {/* Previous Page Floating Button (Single page mode) */}
            {modalPage === 2 && (
              <button
                type="button"
                onClick={() => setModalPage(1)}
                className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-zinc-900/80 hover:bg-zinc-900 text-white shadow-xl backdrop-blur-md border border-white/20 items-center justify-center cursor-pointer transition-transform hover:scale-105"
                title="View Page 1"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Next Page Floating Button (Single page mode) */}
            {modalPage === 1 && (
              <button
                type="button"
                onClick={() => setModalPage(2)}
                className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-zinc-900/80 hover:bg-zinc-900 text-white shadow-xl backdrop-blur-md border border-white/20 items-center justify-center cursor-pointer transition-transform hover:scale-105"
                title="View Page 2"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}

            {/* The Document Sheet */}
            {modalPage === 'all' ? (
              /* Continuous Stacked View showing both Page 1 and Page 2 */
              <div 
                className={cn(
                  "flex flex-col gap-6 w-full max-w-2xl 2xl:max-w-3xl my-auto transition-transform duration-200 origin-top",
                  modalZoom !== 1 && "origin-top"
                )}
                style={modalZoom !== 1 ? { transform: `scale(${modalZoom})` } : undefined}
              >
                {/* Page 1 */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400 px-1">
                    <span className="font-semibold">Page 1 of 2 — Summary, Skills & Projects</span>
                    <button
                      type="button"
                      onClick={(e) => handleDownload(e, 'p1')}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Save PNG
                    </button>
                  </div>
                  <div className="shadow-2xl rounded-lg overflow-hidden bg-white ring-1 ring-zinc-900/10">
                    <img
                      src={aritraResumeP1}
                      alt="Aritra Mondal Resume Page 1"
                      className="w-full h-auto object-contain select-none"
                      loading="eager"
                      decoding="sync"
                    />
                  </div>
                </div>

                {/* Page 2 */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400 px-1">
                    <span className="font-semibold">Page 2 of 2 — Experience, Education & Achievements</span>
                    <button
                      type="button"
                      onClick={(e) => handleDownload(e, 'p2')}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Save PNG
                    </button>
                  </div>
                  <div className="shadow-2xl rounded-lg overflow-hidden bg-white ring-1 ring-zinc-900/10">
                    <img
                      src={aritraResumeP2}
                      alt="Aritra Mondal Resume Page 2"
                      className="w-full h-auto object-contain select-none"
                      loading="eager"
                      decoding="sync"
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* Single Page Mode (Page 1 or Page 2) */
              <div
                onDoubleClick={toggleViewMode}
                title="Double-click to toggle Fit Page / Fit Width"
                className={cn(
                  "transition-all duration-200 ease-out shadow-2xl rounded-lg overflow-hidden bg-white ring-1 ring-zinc-900/10 cursor-pointer",
                  viewMode === 'fit-page' && modalZoom === 1
                    ? "h-full max-h-full w-auto flex items-center justify-center origin-center"
                    : "w-full max-w-2xl 2xl:max-w-3xl my-auto origin-top"
                )}
                style={
                  modalZoom !== 1
                    ? { transform: `scale(${modalZoom})` }
                    : undefined
                }
              >
                <img
                  src={modalPage === 1 ? aritraResumeP1 : aritraResumeP2}
                  alt={`Aritra Mondal Resume Page ${modalPage}`}
                  className={cn(
                    "object-contain transition-all select-none",
                    viewMode === 'fit-page' && modalZoom === 1
                      ? "h-full max-h-full w-auto max-w-full"
                      : "w-full h-auto"
                  )}
                  loading="eager"
                  decoding="sync"
                />
              </div>
            )}
          </div>
        </div>
      </Modal>

    </section>
  );
}
