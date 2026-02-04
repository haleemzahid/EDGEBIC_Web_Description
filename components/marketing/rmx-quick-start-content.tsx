'use client';

import { useEffect, useRef, useState } from 'react';

export function RMXQuickStartContent() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHtmlContent = async () => {
      try {
        const response = await fetch('/images/rmx-quick-start/rmx.html');
        if (!response.ok) {
          throw new Error(`Failed to load: ${response.status}`);
        }
        let html = await response.text();

        // Remove the dark background color (#444) and replace with white
        html = html.replace(/background-color:\s*#444;?/g, 'background-color: white;');

        // Remove body padding to make content full width
        html = html.replace(/padding:\s*0\s+10px;?/g, 'padding: 0;');
        html = html.replace(/margin:\s*0;?/g, 'margin: 0;');

        if (iframeRef.current) {
          const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
          if (iframeDoc) {
            iframeDoc.open();
            iframeDoc.write(html);
            iframeDoc.close();
            setIsLoading(false);
          }
        }
      } catch (err) {
        console.error('Error loading HTML:', err);
        setError('Failed to load content');
        setIsLoading(false);
      }
    };

    loadHtmlContent();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading RMX Quick Start Guide...</p>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        className="w-full border-0"
        style={{ minHeight: '1163vw' }}
        title="RMX Quick Start Guide"
        sandbox="allow-same-origin allow-scripts"
      />
    </div>
  );
}
