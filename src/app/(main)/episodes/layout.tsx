export default function EpisodesLayout({
  children,
  episodeModal,
}: Readonly<{
  children: React.ReactNode;
  episodeModal: React.ReactNode;
}>) {
  return (
    <>
      {children}
      {episodeModal}
    </>
  );
}
