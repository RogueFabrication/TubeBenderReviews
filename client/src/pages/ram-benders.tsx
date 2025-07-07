import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ArrowLeft, CheckCircle, Zap, Wrench } from "lucide-react";
import { Link } from "wouter";

export default function RamBenders() {
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
      <section className="py-16 bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-orange-100 dark:bg-orange-900 rounded-2xl p-4">
              <Shield className="h-12 w-12 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Ram-Style Tube Benders
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Heavy-duty bending machines using hydraulic rams for maximum force and thick-wall capability
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Ram Bending Technology
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Ram-style tube benders use powerful hydraulic cylinders to push tubes around fixed forming dies. 
                This method provides tremendous force capability, making it ideal for thick-wall tubing and 
                structural applications where other bending methods lack sufficient power.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <strong className="text-gray-900 dark:text-gray-100">Maximum force capability</strong>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Handles thick-wall tubing that defeats other methods
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <strong className="text-gray-900 dark:text-gray-100">Structural applications</strong>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Perfect for heavy-duty construction and industrial uses
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <strong className="text-gray-900 dark:text-gray-100">Precise repeatability</strong>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Fixed dies ensure consistent results across production runs
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Primary Applications
              </h3>
              <div className="space-y-3">
                <Badge variant="outline" className="block w-full justify-start p-3">
                  <strong>Structural Tubing</strong> - Heavy construction applications
                </Badge>
                <Badge variant="outline" className="block w-full justify-start p-3">
                  <strong>Thick-Wall Tubes</strong> - When other methods lack power
                </Badge>
                <Badge variant="outline" className="block w-full justify-start p-3">
                  <strong>Production Bending</strong> - High-volume manufacturing
                </Badge>
                <Badge variant="outline" className="block w-full justify-start p-3">
                  <strong>Custom Fabrication</strong> - One-off structural pieces
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ram Bender Types */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
            Ram Bender Configurations
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-orange-600" />
                  Single Ram Systems
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Single hydraulic cylinder setup ideal for simpler bends and smaller operations.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-600 mt-1" />
                    <span>Lower initial cost</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-600 mt-1" />
                    <span>Simpler operation</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-600 mt-1" />
                    <span>Good for basic angles</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-600 mt-1" />
                    <span>Compact footprint</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wrench className="h-5 w-5 mr-2 text-orange-600" />
                  Multi-Ram Systems
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Multiple hydraulic cylinders for complex bends and maximum versatility.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-600 mt-1" />
                    <span>Complex bend sequences</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-600 mt-1" />
                    <span>Multiple plane bending</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-600 mt-1" />
                    <span>Advanced programming</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-600 mt-1" />
                    <span>Production line integration</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Considerations */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
            Key Technical Factors
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Force Requirements
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Ram force must be calculated based on tube material, wall thickness, 
                  bend radius, and material properties. Hydraulic systems typically 
                  provide 20-200 tons of force.
                </p>
              </div>
              
              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Die Design
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Fixed forming dies must be precisely machined for the specific 
                  tube size and desired bend radius. Die quality directly affects 
                  final bend quality.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Support Systems
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Proper tube support during bending prevents buckling and ensures 
                  consistent results. Wiper dies and support blocks are often necessary.
                </p>
              </div>
              
              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Automation Options
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  CNC controls enable programmable bend sequences, automatic 
                  positioning, and integration with material handling systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages and Considerations */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="text-green-800 dark:text-green-200">
                  Advantages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                    <span className="text-sm">Handles thick-wall tubing other methods cannot</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                    <span className="text-sm">Extremely precise and repeatable results</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                    <span className="text-sm">Excellent for production environments</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                    <span className="text-sm">Can handle large diameter tubing</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                    <span className="text-sm">Suitable for automated systems</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-200 dark:border-amber-800">
              <CardHeader>
                <CardTitle className="text-amber-800 dark:text-amber-200">
                  Considerations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-4 h-4 rounded-full bg-amber-500 mt-1"></div>
                    <span className="text-sm">Higher initial investment than manual methods</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-4 h-4 rounded-full bg-amber-500 mt-1"></div>
                    <span className="text-sm">Requires specific tooling for each bend</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-4 h-4 rounded-full bg-amber-500 mt-1"></div>
                    <span className="text-sm">Setup time can be significant for small runs</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-4 h-4 rounded-full bg-amber-500 mt-1"></div>
                    <span className="text-sm">Requires hydraulic power system</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-4 h-4 rounded-full bg-amber-500 mt-1"></div>
                    <span className="text-sm">Less flexible for quick radius changes</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* When to Choose Ram Bending */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-8 text-center">
            <Shield className="h-12 w-12 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-orange-900 dark:text-orange-100 mb-4">
              Best Use Cases for Ram Bending
            </h3>
            <p className="text-orange-700 dark:text-orange-300 mb-6 max-w-2xl mx-auto">
              Ram benders excel in production environments and heavy-duty applications where 
              maximum force is required. For lighter materials and varied bending requirements, 
              rotary draw benders offer more flexibility.
            </p>
            <Link href="/">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                Compare All Bender Types
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}