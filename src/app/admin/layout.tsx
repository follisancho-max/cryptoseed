
'use client';

import React from 'react';

// This layout marks the entire /admin route as a client-side rendered
// application, which is necessary because its pages use client-side
// hooks and browser-only APIs. This resolves build-time errors related
// to environment variables and client-side code execution.
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
