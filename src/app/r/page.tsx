'use client';

import { useEffect, Suspense } from 'react';

import { APP_STORE_URL } from '@/lib/site';

function RedirectContent() {
  useEffect(() => {
    window.location.href = APP_STORE_URL;
  }, []);
  return null;
}

export default function ReferralRedirect() {
  return (
    <Suspense fallback={null}>
      <RedirectContent />
    </Suspense>
  );
}
