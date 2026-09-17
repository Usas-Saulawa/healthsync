import ProviderWrapper from "@/hooks/context/dashboard/ProviderWrapper";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProviderWrapper>{children}</ProviderWrapper>;
}
