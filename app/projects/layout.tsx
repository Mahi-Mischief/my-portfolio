import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Archive — Mahi Deshpande",
  description: "Stacked case studies and hobbyist workbench.",
};

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
