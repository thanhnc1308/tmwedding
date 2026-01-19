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
      {removeResponseDialog}
    </>
  );
}
