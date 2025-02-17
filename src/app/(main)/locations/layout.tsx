export default function LocationsLayout({
  children,
  locationModal,
}: Readonly<{
  children: React.ReactNode;
  locationModal: React.ReactNode;
}>) {
  return (
    <>
      {children}
      {locationModal}
    </>
  );
}
