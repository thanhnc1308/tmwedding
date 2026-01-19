export default function Layout({
  children,
  removeGuestDialog,
}: {
  children: React.ReactNode;
  removeGuestDialog: React.ReactNode;
}) {
  return (
    <>
      {children}
      {removeGuestDialog}
    </>
  );
}
