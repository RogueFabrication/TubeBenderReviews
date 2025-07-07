import LegalDisclaimer from "@/components/legal-disclaimer";

export default function Legal() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-primary text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Legal Disclaimers & Compliance</h1>
          <p className="text-xl text-blue-100">
            Important legal information regarding brand names, trademarks, data accuracy, and liability
          </p>
        </div>
      </div>
      
      <LegalDisclaimer />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose max-w-none">
          <h2 id="additional">Additional Legal Information</h2>
          
          <h3 id="ftc" className="text-lg font-semibold text-gray-900 mt-8 mb-4">FTC 16 CFR Part 255 Compliance</h3>
          <p className="text-gray-700 mb-4">
            This website complies with FTC guidelines regarding endorsements and testimonials in advertising. 
            Any material connections between this website and manufacturers will be clearly disclosed. 
            We may receive compensation for reviews, affiliate links, or advertising partnerships, which 
            will be transparently communicated to users as required by law.
          </p>
          
          <h3 id="trademarks" className="text-lg font-semibold text-gray-900 mt-8 mb-4">USPTO Trademark Compliance</h3>
          <p className="text-gray-700 mb-4">
            All registered trademarks mentioned on this website are used under fair use provisions for 
            comparative and informational purposes. We respect all intellectual property rights and do not 
            claim ownership of any trademarks, patents, or copyrighted materials belonging to manufacturers. 
            Product names, model numbers, and brand identifiers are used solely for identification and 
            comparison purposes.
          </p>
          
          <h4 className="font-semibold text-gray-900 mt-6 mb-3">Registered Trademarks Include:</h4>
          <ul className="text-gray-700 space-y-1 mb-4">
            <li>• RogueFab® and M601®, M605®, M625® (RogueFab Manufacturing)</li>
            <li>• JD2® and Model 32® (JD2 Manufacturing)</li>
            <li>• Baileigh® and RDB-050® (Baileigh Industrial)</li>
            <li>• Pro-Tools® and 105HD®, BRUTE® (Pro-Tools Corporation)</li>
            <li>• Hossfeld® and Universal® (Hossfeld Manufacturing)</li>
            <li>• SWAG Off Road® and REV 2® (SWAG Off Road)</li>
            <li>• All other trademarks property of respective owners</li>
          </ul>
          
          <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">Data Sources & Verification</h3>
          <p className="text-gray-700 mb-4">
            Product specifications, pricing, and performance data are compiled from manufacturer websites, 
            product manuals, industry publications, and verified user reports. While we make every effort 
            to ensure accuracy, specifications may change without notice. Users should always verify 
            critical information directly with manufacturers before making purchasing decisions.
          </p>
          
          <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">Contact for Legal Concerns</h3>
          <p className="text-gray-700 mb-4">
            If you are a manufacturer or trademark owner and have concerns about how your products or 
            intellectual property are represented on this website, please contact us immediately through 
            our <a href="/contact" className="text-primary underline">contact form</a>. We are committed 
            to addressing any legitimate concerns promptly and professionally.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg mt-8">
            <h4 className="font-semibold text-gray-900 mb-3">Quick Legal Summary:</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✓ Independent review platform - not affiliated with manufacturers</li>
              <li>✓ FTC compliant disclosure of any compensation or partnerships</li>
              <li>✓ Fair use of trademarks for comparative purposes only</li>
              <li>✓ No warranty on data accuracy - verify with manufacturers</li>
              <li>✓ Limited liability - users responsible for purchase decisions</li>
              <li>✓ Immediate response to legitimate IP concerns</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}