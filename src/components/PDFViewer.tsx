import { useState } from 'react';

interface PDFViewerProps {
  fileId: string;
  downloadId: string;
  height?: string;
  title?: string;
}

function PDFViewer({ fileId, height = "580px", title = "PDF Document", downloadId }: PDFViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ CORRECT: Uses the preview URL (shows PDF, doesn't download)
  const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
  
  // For the download button
  const downloadUrl = `https://drive.usercontent.google.com/u/0/uc?id=${downloadId}&export=download`;

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden">
        {/* Toolbar */}
        <div className="flex justify-between items-center p-3 lg:p-4 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100">
          <span className="font-amharic text-sm lg:text-base font-semibold text-gray-800">{title}</span>
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 hover:text-orange-800 text-sm lg:text-base font-amharic font-medium flex items-center gap-1 transition-colors duration-200"
          >
            ⬇ አውርድ
          </a>
        </div>

        {/* PDF Viewer */}
        <div className="relative">
          {isLoading && (
            <div className="flex items-center justify-center" style={{ height }}>
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-10 w-10 lg:h-12 lg:w-12 border-4 border-orange-600 border-t-transparent"></div>
                <p className="mt-3 text-gray-500 font-amharic text-sm lg:text-base">ፎርም ከመሙላት በፊት ይመልከቱ...</p>
              </div>
            </div>
          )}

          {error ? (
            <div className="flex items-center justify-center" style={{ height }}>
              <p className="text-red-500 font-amharic text-sm lg:text-base">⚠️ {error}</p>
            </div>
          ) : (
            <iframe
              src={embedUrl}
              width="100%"
              height={height}
              allowFullScreen
              title={title}
              className="w-full"
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setError("ፒዲኤፍ መጫን አልተቻለም። እባክዎ ፋይሉ በይፋ መጋራቱን ያረጋግጡ።");
              }}
            />
          )}
        </div>
        <div className="p-3 lg:p-4 bg-orange-50 border-t border-orange-100">
          <p className="text-orange-800 font-amharic text-sm lg:text-base font-medium">⚠️ ፎርም ከመሙላት በፊት ያንብቡ</p>
        </div>
      </div>
    </div>
  );
}

export default PDFViewer;