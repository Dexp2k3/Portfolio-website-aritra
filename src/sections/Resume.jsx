import React, { useState } from 'react';
import { Download, FileText, Check, Sparkles, Maximize2, ExternalLink, Eye, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { resumeData } from '../data/portfolioData';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import aritraResumeImg from '../assets/aritra-resume.png';

export function Resume({ onShowToast }) {
  const [downloadState, setDownloadState] = useState('idle'); // 'idle' | 'downloading' | 'completed'
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadFormat, setDownloadFormat] = useState('png'); // 'png' | 'pdf'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalZoom, setModalZoom] = useState(1);

  const handleDownload = (e) => {
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

      const isPdf = downloadFormat === 'pdf';
      const fileUrl = isPdf ? resumeData.pdfUrl : resumeData.pngUrl;
      const fileName = isPdf ? 'Aritra_Mondal_Resume.pdf' : 'Aritra_Mondal_Resume.png';

      // Trigger native download
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (onShowToast) {
        onShowToast('Resume downloaded', 'success');
      }

      // Reset back to idle state after 3.5s
      setTimeout(() => {
        setDownloadState('idle');
        setDownloadProgress(0);
      }, 3500);
    }, 1250);
  };

  const handleZoomIn = () => setModalZoom((z) => Math.min(2, +(z + 0.25).toFixed(2)));
  const handleZoomOut = () => setModalZoom((z) => Math.max(0.75, +(z - 0.25).toFixed(2)));
  const handleResetZoom = () => setModalZoom(1);

  return (
    <section id="resume" className="scroll-mt-20 py-20 md:py-28 border-t border-zinc-200 dark:border-zinc-900 relative transition-colors duration-300">
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
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
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Verified</span>
                    </p>
                  </div>
                </div>

                {/* Format Toggle (PNG vs PDF) - Dedicated Mobile & Desktop Space */}
                <div className="flex items-center self-start sm:self-auto p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/60 text-xs font-mono flex-shrink-0">
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
                  <button
                    type="button"
                    onClick={() => setDownloadFormat('pdf')}
                    className={`px-3.5 py-1.5 min-h-[34px] rounded-lg transition-all cursor-pointer flex items-center justify-center font-bold ${
                      downloadFormat === 'pdf'
                        ? 'bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                    }`}
                  >
                    PDF
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
                        <span>Download {downloadFormat.toUpperCase()}</span>
                      </>
                    )}
                  </span>
                </button>

                {/* Fullscreen Expand Preview Trigger */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl font-medium text-xs sm:text-sm bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white transition-all cursor-pointer min-h-[46px] active:scale-[0.98] outline-none select-none touch-manipulation"
                  title="Expand Full Resume"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </button>
              </div>

              {/* Status footer note */}
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400 pt-1 border-t border-zinc-100 dark:border-zinc-800/60">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Ready for offline viewing</span>
                </span>
                <a
                  href={downloadFormat === 'pdf' ? resumeData.pdfUrl : resumeData.pngUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>Open raw</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
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
                
                {/* Document Top Bar */}
                <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-zinc-50 dark:bg-zinc-950/60 border-b border-zinc-200 dark:border-zinc-800/80 select-none">
                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                    </div>
                    <span className="ml-1 sm:ml-2 text-[11px] sm:text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 truncate">
                      Aritra_Mondal_Resume.pdf
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 transition-colors cursor-pointer flex-shrink-0"
                      title="View Fullscreen"
                    >
                      <Maximize2 className="w-3 h-3 flex-shrink-0" />
                      <span className="text-[11px] sm:text-xs whitespace-nowrap font-medium">Fullscreen</span>
                    </button>
                  </div>
                </div>

                {/* High-Resolution Resume Sheet Display */}
                <div
                  onClick={() => setIsModalOpen(true)}
                  className="relative cursor-zoom-in overflow-hidden bg-zinc-100/80 dark:bg-zinc-950/80 p-3 sm:p-5 flex justify-center"
                >
                  <div className="relative w-full max-w-xl shadow-2xl rounded-xl overflow-hidden bg-white ring-1 ring-zinc-900/5 dark:ring-white/10">
                    <img
                      src={aritraResumeImg}
                      alt="Aritra Mondal - Graphic & UI/UX Designer Official Resume"
                      className="w-full h-auto object-contain select-none transition-transform duration-500 group-hover:scale-[1.01]"
                      loading="eager"
                      decoding="sync"
                    />
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

      {/* FULLSCREEN LIGHTBOX MODAL WITH INTERACTIVE ZOOM CONTROLS */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setModalZoom(1);
        }}
        title="Aritra Mondal — Professional Profile"
        subtitle="Graphic & UI/UX Designer · Single Page Resume"
        maxWidth="max-w-5xl"
      >
        <div className="flex flex-col gap-4">
          {/* Modal Header Actions with Interactive Zoom Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400">
            {/* Zoom Controls */}
            <div className="flex items-center justify-between sm:justify-start gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  disabled={modalZoom <= 0.75}
                  aria-label="Zoom out"
                  className="p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>

                <span className="px-2 text-[11px] font-semibold text-zinc-900 dark:text-white min-w-[48px] text-center select-none">
                  {Math.round(modalZoom * 100)}%
                </span>

                <button
                  type="button"
                  onClick={handleZoomIn}
                  disabled={modalZoom >= 2}
                  aria-label="Zoom in"
                  className="p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              {modalZoom !== 1 && (
                <button
                  type="button"
                  onClick={handleResetZoom}
                  aria-label="Reset zoom"
                  className="p-1.5 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center"
                  title="Reset to 100%"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Actions in Modal */}
            <div className="flex items-center justify-end gap-2">
              <a
                href={downloadFormat === 'pdf' ? resumeData.pdfUrl : resumeData.pngUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors cursor-pointer min-h-[36px]"
              >
                <span>Open in Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors cursor-pointer min-h-[36px] active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download {downloadFormat.toUpperCase()}</span>
              </button>
            </div>
          </div>

          {/* High-Resolution Document Scrollable Container */}
          <div className="overflow-auto max-h-[75vh] flex justify-center bg-zinc-200/50 dark:bg-zinc-950/90 p-3 sm:p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 select-none">
            <div
              className="transition-transform duration-200 ease-out origin-top shadow-2xl rounded-xl overflow-hidden bg-white ring-1 ring-zinc-900/10"
              style={{ transform: `scale(${modalZoom})` }}
            >
              <img
                src={aritraResumeImg}
                alt="Aritra Mondal Resume High Definition Full Resolution"
                className="w-full max-w-2xl h-auto object-contain"
                loading="eager"
                decoding="sync"
              />
            </div>
          </div>
        </div>
      </Modal>

    </section>
  );
}
