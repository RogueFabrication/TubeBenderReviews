import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, ArrowLeft, CheckCircle, Info, Settings } from "lucide-react";
import { Link } from "wouter";

export default function RollBenders() {
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
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-purple-100 dark:bg-purple-900 rounded-2xl p-4">
              <TrendingUp className="h-12 w-12 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Roll Tube Benders
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Large radius bending machines using multiple rollers for gradual curve formation
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                How Roll Benders Work
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Roll tube benders use three or more rollers positioned in a triangle configuration. 
                The tube is fed between the rollers, and gradual pressure is applied to create smooth, 
                large-radius curves. The process is continuous and can create consistent arcs over long lengths.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <strong className="text-gray-900 dark:text-gray-100">Gradual forming</strong>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Minimal stress on tube material during bending
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <strong className="text-gray-900 dark:text-gray-100">Large radius capability</strong>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Ideal for architectural and decorative applications
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <strong className="text-gray-900 dark:text-gray-100">Continuous operation</strong>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Can process long lengths in single operations
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Typical Applications
              </h3>
              <div className="space-y-3">
                <Badge variant="outline" className="block w-full justify-start p-3">
                  <strong>Architectural Features</strong> - Decorative curves and arcs
                </Badge>
                <Badge variant="outline" className="block w-full justify-start p-3">
                  <strong>Handrails</strong> - Smooth, comfortable curves
                </Badge>
                <Badge variant="outline" className="block w-full justify-start p-3">
                  <strong>Large Diameter Tubes</strong> - Structural applications
                </Badge>
                <Badge variant="outline" className="block w-full justify-start p-3">
                  <strong>Production Runs</strong> - High volume processing
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Roll Benders */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
            Roll Bender Configurations
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>3-Roll Pyramid</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Most common configuration with two bottom rollers and one adjustable top roller.
                </p>
                <div className="space-y-2 text-sm">
                  <div>• Simple operation</div>
                  <div>• Cost-effective</div>
                  <div>• Good for most applications</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4-Roll Double Pinch</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Additional pinch roller provides better tube control and eliminates flat spots.
                </p>
                <div className="space-y-2 text-sm">
                  <div>• Superior tube control</div>
                  <div>• Reduces flat spots</div>
                  <div>• Higher precision</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Variable Geometry</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Advanced systems with adjustable roller positions for maximum flexibility.
                </p>
                <div className="space-y-2 text-sm">
                  <div>• Maximum versatility</div>
                  <div>• Complex curve capability</div>
                  <div>• Professional grade</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Specifications to Consider */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
            Key Specifications
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Capacity Range
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Tube diameter capacity typically ranges from 1/2" to 6" or larger. 
                  Consider both minimum and maximum diameter requirements.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Minimum Bend Radius
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Generally 3-5 times the tube diameter, though some advanced machines 
                  can achieve tighter radii with proper setup.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Power Requirements
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Most roll benders are electrically powered with variable speed drives. 
                  Power requirements scale with tube capacity.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Control Systems
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Modern systems feature digital displays, preset programs, 
                  and automatic radius adjustment capabilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison with Other Types */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-8 text-center">
            <Settings className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-4">
              When to Choose Roll Bending
            </h3>
            <p className="text-purple-700 dark:text-purple-300 mb-6 max-w-2xl mx-auto">
              Roll benders excel at large radius bends and high-volume production. 
              For tight radius bends and precise angle control, rotary draw benders are typically preferred.
            </p>
            <Link href="/">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Compare with Rotary Draw Benders
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}