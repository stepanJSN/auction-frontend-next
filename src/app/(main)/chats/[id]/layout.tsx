type ChatLayoutProps = {
  children: React.ReactNode;
  editModal: React.ReactNode;
};

export default function chatLayout({ children, editModal }: ChatLayoutProps) {
  return (
    <>
      {children}
      {editModal}
    </>
  );
}
