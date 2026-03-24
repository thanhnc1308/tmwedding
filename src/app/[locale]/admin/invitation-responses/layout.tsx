import { Suspense } from 'react';

export default function Layout({
  children,
  removeResponseDialog,
}: {
  children: React.ReactNode;
  removeResponseDialog: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Suspense>{removeResponseDialog}</Suspense>
    </>
  );
}
