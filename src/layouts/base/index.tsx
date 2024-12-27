import { PropsWithChildren } from "react";
import { Header } from "../../components/ui/header";

export default function BaseLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-main flex flex-col">
      <Header />
      <main className="p-8 md:p-20">{children}</main>
      <footer className="fixed bottom-0 left-0 right-0 bg-muted border-t border-main/10 py-3 px-4">
        <div className="container mx-auto max-w-3xl flex items-center justify-between text-main/80">
          <span className="text-sm">An experiment to learn Canvas</span>
          <div className="flex items-center gap-4">
            <a href="https://github.com/mrSamDev/sam-paddle-game" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-main transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              View on GitHub
            </a>
            <a href="https://www.sijosam.in/blog/paddle-game" target="_blank" rel="noopener noreferrer" className="hover:text-main hover:underline underline-offset-2">
              Blog
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
