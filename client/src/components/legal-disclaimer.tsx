import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, AlertTriangle, Info } from "lucide-react";

export default function LegalDisclaimer() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Shield className="h-8 w-8 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">Legal Disclaimers & Compliance</h2>
          <p className="text-gray-600 mt-2">Important legal information regarding brand names, data accuracy, and liability</p>
        </div>

        <div className="space-y-6">
          {/* FTC Compliance */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">FTC Compliance Disclosure</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    This website contains reviews and comparisons of tube bending equipment. We may receive compensation 
                    when you click on links to products or make purchases through our affiliate partnerships. This 
                    compensation does not influence our editorial content, scoring methodology, or product rankings. 
                    All opinions and evaluations are based on our independent research and analysis. We are committed 
                    to providing honest, unbiased reviews to help you make informed purchasing decisions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trademark Disclaimer */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Trademark & Brand Name Disclaimer</h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-3">
                    All brand names, product names, trademarks, service marks, trade names, trade dress, logos, and other 
                    intellectual property displayed on this website are the property of their respective owners. This includes 
                    but is not limited to: RogueFab, JD2, Baileigh, Pro-Tools, Hossfeld, SWAG Off Road, Mittler Bros, 
                    Woodward Fab, JMR Manufacturing, and all associated model numbers, logos, and product designs.
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    The use of these trademarks, brand names, and product identifiers is for informational and comparative 
                    purposes only under fair use doctrine. We are not affiliated with, endorsed by, or sponsored by any 
                    of these manufacturers unless explicitly stated. No trademark or copyright infringement is intended. 
                    All rights remain with their respective owners.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Accuracy Disclaimer */}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <strong>Data Accuracy & Liability Disclaimer:</strong> While we strive to provide accurate and up-to-date 
              information about products, specifications, pricing, and performance data, we cannot guarantee the absolute 
              accuracy of all information presented. Product specifications, prices, availability, and features may change 
              without notice. We disclaim all liability for any errors, omissions, or inaccuracies in the information 
              provided. Users should verify all critical specifications and pricing directly with manufacturers before 
              making purchasing decisions.
            </AlertDescription>
          </Alert>

          {/* No Manufacturing Affiliation */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Independent Review Platform</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    TubeBenderReviews.com is an independent review and comparison platform. We do not manufacture, 
                    sell, distribute, or directly service any tube bending equipment. We are not authorized dealers 
                    or representatives of any manufacturer mentioned on this site. For warranty, technical support, 
                    parts, or service inquiries, please contact the respective manufacturers directly.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Limitation of Liability</h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-3">
                    The information on this website is provided "as is" without warranty of any kind. We expressly 
                    disclaim all warranties, express or implied, including but not limited to warranties of 
                    merchantability, fitness for a particular purpose, and non-infringement.
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    In no event shall TubeBenderReviews.com, its operators, or affiliates be liable for any direct, 
                    indirect, incidental, special, consequential, or punitive damages arising out of your use of this 
                    website or the information contained herein, even if we have been advised of the possibility of 
                    such damages. This includes but is not limited to damages for loss of profits, data, or other 
                    intangible losses resulting from equipment purchases based on information from this site.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Responsibility */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <strong>User Responsibility:</strong> By using this website, you acknowledge that you are responsible 
              for conducting your own due diligence before making any purchasing decisions. You agree to verify all 
              product specifications, pricing, and availability directly with manufacturers. You understand that 
              equipment selection should be based on your specific needs, applications, and safety requirements.
            </AlertDescription>
          </Alert>

          {/* Copyright Notice */}
          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              © 2025 TubeBenderReviews.com. All original content is protected by copyright. Reproduction without 
              permission is prohibited. Last updated: January 2025.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}