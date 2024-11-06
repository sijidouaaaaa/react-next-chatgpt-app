export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-blue-500 p-10">
      {children}

      <div>dd</div>
    </div>
  );
}
