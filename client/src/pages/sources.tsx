import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Sources() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Sources & References
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            All claims and specifications on this site are sourced from manufacturer websites, 
            official documentation, or documented user feedback from verified channels.
          </p>
        </div>

        <div className="space-y-8">
          {/* Manufacturer Sources */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">
                Official Manufacturer Sources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  JD2 (JD Squared, Inc.)
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>
                    <strong>Lead Times:</strong> Die sets 4-6 weeks, benders 3-4 weeks
                    <br />
                    <span className="text-sm text-blue-600 dark:text-blue-400">
                      Source: <a href="https://www.jd2.com/lead-times" target="_blank" rel="noopener noreferrer" className="underline">
                        JD2.com/lead-times
                      </a> (accessed June 2025)
                    </span>
                  </li>
                  <li>
                    <strong>Model specifications:</strong> Capacity, dimensions, features
                    <br />
                    <span className="text-sm text-blue-600 dark:text-blue-400">
                      Source: <a href="https://www.jd2.com" target="_blank" rel="noopener noreferrer" className="underline">
                        JD2.com
                      </a> product pages
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  RogueFab
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>
                    <strong>Product specifications:</strong> M6xx series features, pricing, capacity
                    <br />
                    <span className="text-sm text-blue-600 dark:text-blue-400">
                      Source: <a href="https://www.roguefab.com" target="_blank" rel="noopener noreferrer" className="underline">
                        RogueFab.com
                      </a> product documentation
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Baileigh Industrial
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>
                    <strong>RDB-050 specifications:</strong> Capacity, features, pricing
                    <br />
                    <span className="text-sm text-blue-600 dark:text-blue-400">
                      Source: <a href="https://www.baileigh.com" target="_blank" rel="noopener noreferrer" className="underline">
                        Baileigh.com
                      </a> official product pages
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Woodward Fab
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>
                    <strong>WFB2 specifications:</strong> Dimensions, capacity, features
                    <br />
                    <span className="text-sm text-blue-600 dark:text-blue-400">
                      Source: <a href="https://www.woodwardfab.com" target="_blank" rel="noopener noreferrer" className="underline">
                        WoodwardFab.com
                      </a> product listings
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* User Feedback Sources */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">
                User Feedback Sources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  JD2 Model 32 User Reports
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>
                    <strong>Degree indicator movement:</strong> Reported in multiple user reviews
                    <br />
                    <span className="text-sm text-blue-600 dark:text-blue-400">
                      Sources: YouTube user reviews, fabrication forums (WeldingWeb, Garage Journal)
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Industry Standards */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">
                Industry Standards & Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Tube Bending Standards
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>
                    <strong>Minimum bend radius:</strong> 3x material OD for quality bends
                    <br />
                    <span className="text-sm text-blue-600 dark:text-blue-400">
                      Source: Industry standard practice for preventing kinking and deformation
                    </span>
                  </li>
                  <li>
                    <strong>Die CLR specifications:</strong> 4.5" minimum for 1.5" tubing
                    <br />
                    <span className="text-sm text-blue-600 dark:text-blue-400">
                      Source: Calculated based on 3x OD rule (1.5" × 3 = 4.5")
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Source Verification
              </h3>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                All information is sourced from publicly available manufacturer documentation, 
                official websites, or documented user feedback from established fabrication communities. 
                Pricing and specifications are subject to change by manufacturers. Lead times and 
                availability information is current as of the access date noted above.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}