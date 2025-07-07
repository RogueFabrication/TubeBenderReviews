import { Link } from "wouter";
import { Settings, Star, Calculator, BookOpen, Shield, FileText, Eye } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-xl font-bold mb-4 flex items-center">
              <Settings className="h-6 w-6 mr-2 text-accent" />
              TubeBenderReviews
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Independent reviews and comparisons to help you choose the best tube bender for your needs.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Reviews</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/product/1" className="hover:text-white transition-colors flex items-center">
                  <Star className="h-3 w-3 mr-1" />
                  RogueFab M6xx Series
                </Link>
              </li>
              <li>
                <Link href="/product/2" className="hover:text-white transition-colors">
                  Baileigh RDB-050
                </Link>
              </li>
              <li>
                <Link href="/product/3" className="hover:text-white transition-colors">
                  JD2 Model 32
                </Link>
              </li>
              <li>
                <Link href="/product/4" className="hover:text-white transition-colors">
                  Budget Options
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Tools</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/comparison" className="hover:text-white transition-colors flex items-center">
                  <Settings className="h-3 w-3 mr-1" />
                  Comparison Tool
                </Link>
              </li>
              <li>
                <Link href="/#calculator" className="hover:text-white transition-colors flex items-center">
                  <Calculator className="h-3 w-3 mr-1" />
                  Cost Calculator
                </Link>
              </li>
              <li>
                <Link href="/#guide" className="hover:text-white transition-colors flex items-center">
                  <BookOpen className="h-3 w-3 mr-1" />
                  Buyer's Guide
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/legal" className="hover:text-white transition-colors flex items-center">
                  <Eye className="h-3 w-3 mr-1" />
                  Legal Disclaimers
                </Link>
              </li>
              <li>
                <Link href="/legal#ftc" className="hover:text-white transition-colors flex items-center">
                  <Shield className="h-3 w-3 mr-1" />
                  FTC Compliance
                </Link>
              </li>
              <li>
                <Link href="/legal#trademarks" className="hover:text-white transition-colors flex items-center">
                  <FileText className="h-3 w-3 mr-1" />
                  Trademark Notice
                </Link>
              </li>
              <li>
                <Link href="/sources" className="hover:text-white transition-colors flex items-center">
                  <BookOpen className="h-3 w-3 mr-1" />
                  Sources & References
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2025 TubeBenderReviews.com - All trademarks property of respective owners. 
              <Link href="/legal" className="underline hover:text-white ml-1">Legal Disclaimers</Link>
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <span>Independent Reviews</span>
              <span>FTC Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
