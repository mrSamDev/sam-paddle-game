import { GithubIcon, Rss, NewspaperIcon } from "lucide-react";
import { Button } from "../../atoms/button/button";

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-muted border-t border-main/10 py-2 sm:py-3 px-3 sm:px-4">
      <div className="container mx-auto max-w-3xl flex flex-col sm:flex-row items-center gap-3 sm:gap-0 sm:justify-between text-main/80">
        <span className="text-xs sm:text-sm text-center sm:text-left">An experiment to learn Canvas</span>

        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <Button as="a" href="https://github.com/mrSamDev/sam-paddle-game" target="_blank" rel="noopener noreferrer" icon={GithubIcon} className="w-full sm:w-auto">
            View on GitHub
          </Button>

          <Button as="a" href="https://www.sijosam.in/tags/paddle-game" target="_blank" rel="noopener noreferrer" icon={NewspaperIcon} className="w-full sm:w-auto">
            Blog
          </Button>
        </div>
      </div>
    </footer>
  );
}
