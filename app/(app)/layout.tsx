import * as React from 'react';

// This is an intentional pass-through. The real root layout lives at
// `app/layout.tsx` and defines <html>, <body>, <head>, metadata, providers,
// toaster, analytics scripts, and structured data. Keeping this file as a
// simple pass-through prevents duplicate <html> trees and a cascading
// title template (which was doubling suffixes like "| RMDB by User Solutions
// | RMDB by User Solutions" in analytics).
export default function AppGroupLayout({
  children
}: React.PropsWithChildren): React.JSX.Element {
  return <>{children}</>;
}
