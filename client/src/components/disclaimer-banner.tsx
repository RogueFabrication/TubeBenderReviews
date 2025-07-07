import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield } from "lucide-react";
import { Link } from "wouter";

export default function DisclaimerBanner() {
  return (
    <Alert className="border-blue-200 bg-blue-50">
      <Shield className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-sm text-blue-800">
        <strong>Legal Notice:</strong> All brand names and trademarks are property of their respective owners. 
        This site provides independent reviews for comparison purposes only. We are not affiliated with manufacturers. 
        Verify all specifications directly with manufacturers before purchasing. 
        <Link href="/legal" className="underline ml-1">View full disclaimers</Link>
      </AlertDescription>
    </Alert>
  );
}