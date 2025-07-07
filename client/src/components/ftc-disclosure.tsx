import { Info } from "lucide-react";
import { Link } from "wouter";

export default function FTCDisclosure() {
  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center text-sm text-yellow-800 dark:text-yellow-200">
          <Info className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="font-medium">FTC Disclosure:</span>
          <span className="ml-1">
            This site is owned by RogueFab.com. We may earn commissions from qualifying purchases.{" "}
            <Link href="#disclosure" className="underline hover:no-underline">
              Learn more
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
