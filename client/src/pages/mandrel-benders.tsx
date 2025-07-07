import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, ArrowLeft, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { Link } from "wouter";

export default function MandrelBenders() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <div className="bg-primary text-primary-foreground py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Main Reviews
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 dark:bg-blue-900 rounded-2xl p-4">
              <Scale className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Mandrel Tube Benders
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Precision bending with internal mandrel support for tight radius bends without tube collapse
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                What is a Mandrel Bender?
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                A mandrel tube bender uses an internal support rod (mandrel) that's inserted into the tube during bending. 
                This prevents the tube from collapsing, wrinkling, or flattening during tight radius bends, making it 
                essential for applications requiring smooth internal flow.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <strong className="text-gray-900 dark:text-gray-100">Prevents tube collapse</strong>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Maintains tube integrity during tight radius bends
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <strong className="text-gray-900 dark:text-gray-100">Smooth internal surface</strong>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Critical for exhaust and fluid flow applications
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <strong className="text-gray-900 dark:text-gray-100">Precise radius control</strong>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Consistent bends with exact radius specifications
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Best Applications
              </h3>
              <div className="space-y-3">
                <Badge variant="outline" className="block w-full justify-start p-3">
                  <strong>Exhaust Systems</strong> - Smooth flow, no restrictions
                </Badge>
                <Badge variant="outline" className="block w-full justify-start p-3">
                  <strong>Hydraulic Lines</strong> - Pressure integrity maintained
                </Badge>
                <Badge variant="outline" className="block w-full justify-start p-3">
                  <strong>Fuel Lines</strong> - Clean internal surfaces
                </Badge>
                <Badge variant="outline" className="block w-full justify-start p-3">
                  <strong>HVAC Ducts</strong> - Airflow optimization
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Comparison */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
            Mandrel vs. Standard Bending
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Scale className="h-5 w-5 mr-2 text-blue-600" />
                  With Mandrel Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                    <span className="text-sm">No tube collapse or wrinkling</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                    <span className="text-sm">Maintains wall thickness uniformity</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                    <span className="text-sm">Achieves tighter bend radii</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                    <span className="text-sm">Professional finish quality</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-amber-600" />
                  Without Mandrel Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-1" />
                    <span className="text-sm">Risk of tube collapse</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-1" />
                    <span className="text-sm">Wall thickness variations</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-1" />
                    <span className="text-sm">Limited bend radius capability</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-1" />
                    <span className="text-sm">May require post-bend processing</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Available Options */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
            Mandrel Bending Options
          </h2>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 text-center">
            <Info className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
              Upgrade Available for Rotary Draw Benders
            </h3>
            <p className="text-blue-700 dark:text-blue-300 mb-6 max-w-2xl mx-auto">
              Many modern rotary draw tube benders can be equipped with mandrel kits as an upgrade option. 
              This provides the flexibility to choose between standard and mandrel bending based on your project requirements.
            </p>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                View Rotary Draw Benders with Mandrel Options
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}