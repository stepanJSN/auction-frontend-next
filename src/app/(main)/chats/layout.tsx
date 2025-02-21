type ChatsLayout = {
  children: React.ReactNode;
  createModal: React.ReactNode;
};

export default function layout({ children, createModal }: ChatsLayout) {
  return (
    <>
      {children}
      {createModal}
    </>
  );
}
