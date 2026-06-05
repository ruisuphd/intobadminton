import { ToolEngagement } from "@/components/ToolEngagement";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <div className="layout-band max-w-3xl pb-16">
        <ToolEngagement />
      </div>
    </>
  );
}
