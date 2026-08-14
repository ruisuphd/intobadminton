import { AdSenseScript } from "@/components/AdSenseScript";

export default function BestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdSenseScript />
      {children}
    </>
  );
}
