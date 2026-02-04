'use client';

import { useEffect, useState } from 'react';

export function RMXQuickStartContent() {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/images/rmx-quick-start/RMXQuickStart (2),image001,image002/RMXQuickStart (2).html')
      .then(response => response.text())
      .then(html => {
        // Extract body content and update image paths
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const bodyContent = doc.body.innerHTML;
        
        // Update relative image paths to absolute paths
        const updatedContent = bodyContent.replace(
          /RMXQuickStart%20\(2\)_files\//g,
          '/images/rmx-quick-start/RMXQuickStart (2),image001,image002/RMXQuickStart (2)_files/'
        );
        
        setHtmlContent(updatedContent);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading HTML:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading RMX Quick Start Guide...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="rmx-quick-start-content prose max-w-none"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
