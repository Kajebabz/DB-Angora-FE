// src/app/layoutWrapper.tsx (client component)
'use client'
import Providers from "@/components/Providers";
import TopNav from "@/components/navbar/TopNav";
import { GiRabbit } from "react-icons/gi";
import PageHeader from "@/components/header/pageHeader";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <TopNav />
      {/* Header row with Logo + Title */}
      <div className="h-16 flex items-center px-4 bg-default-100">
        <div className="max-w-7xl mx-auto w-full flex items-center gap-4">
          <GiRabbit size={40} className="text-blue-700" />
          <PageHeader />
        </div>
      </div>
      {/* Main content with sidebar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex">
          <div className="w-72 flex-shrink-0" /> {/* Sidebar space */}
          <main className="flex-1 pl-4">
            {children}
          </main>
        </div>
      </div>
    </Providers>
  );
}