import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Scale, Calculator, TrendingUp } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ScoringMethodology() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Tube Bender Scoring Methodology</h1>
        <p className="text-lg text-muted-foreground">
          Complete transparency in how we calculate objective scores for tube bender comparisons
        </p>
      </div>

      <Alert className="mb-8">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Our scoring system is designed to be completely objective and transparent. All calculations are based on 
          verifiable specifications, measurable features, and documented capabilities. No subjective quality assessments are used.
        </AlertDescription>
      </Alert>

      <div className="grid gap-8">
        {/* Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              Scoring Overview
            </CardTitle>
            <CardDescription>
              Our 11-category scoring system evaluates tube benders across measurable criteria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Total Points: 100</h4>
                  <p className="text-sm text-muted-foreground">
                    Each tube bender receives a score out of 100 points across 11 objective categories
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Scoring Types</h4>
                  <div className="flex gap-2">
                    <Badge variant="outline">Scaled Scoring</Badge>
                    <Badge variant="outline">Binary Scoring</Badge>
                    <Badge variant="outline">Tier-Based</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Categories */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Calculator className="h-6 w-6" />
            Detailed Category Scoring
          </h2>

          {/* Category 1: Value for Money */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">1. Value for Money (20 points)</CardTitle>
              <CardDescription>Tier-based scoring by complete setup price range</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Scoring Method: Tier-Based</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>$780-$885 range:</span>
                        <Badge>20 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>$839-$970 range:</span>
                        <Badge>19 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>$1,000-$1,250 range:</span>
                        <Badge>17 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>$1,609-$1,895 range:</span>
                        <Badge>15 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>$2,050-$2,895 range:</span>
                        <Badge>12 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>$3,850+ range:</span>
                        <Badge>8 points</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Methodology</h4>
                    <p className="text-sm text-muted-foreground">
                      Complete setup pricing includes base unit, dies, clamp blocks, pressure dies, and hydraulic components. 
                      Lower-priced options receive higher scores as they provide better value for entry-level users.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category 2: Ease of Use & Setup */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">2. Ease of Use & Setup (12 points)</CardTitle>
              <CardDescription>Feature-based scoring on documented capabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Scoring Method: Feature-Based</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Vertical design + portable:</span>
                        <Badge>11 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>95% pre-assembled:</span>
                        <Badge>10 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Well-documented setup:</span>
                        <Badge>9 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Hydraulic operation:</span>
                        <Badge>9 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Manual operation:</span>
                        <Badge>8 points</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Evaluation Criteria</h4>
                    <p className="text-sm text-muted-foreground">
                      Scoring based on documented setup complexity, assembly requirements, space efficiency, 
                      and operational simplicity as stated in manufacturer specifications.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category 3: Max Diameter & Radius Capacity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">3. Max Diameter & Radius Capacity (12 points)</CardTitle>
              <CardDescription>Scaled scoring based on maximum tube diameter capability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Scoring Method: Scaled</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>2.5" (2-1/2") capacity:</span>
                        <Badge>12 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>2-3/8" capacity:</span>
                        <Badge>11 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>2-1/4" capacity:</span>
                        <Badge>10 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>2.0" capacity:</span>
                        <Badge>9 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>1-3/4" capacity:</span>
                        <Badge>7 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>1-1/2" or smaller:</span>
                        <Badge>5 points</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Technical Basis</h4>
                    <p className="text-sm text-muted-foreground">
                      Maximum tube diameter capacity directly impacts project flexibility and material compatibility. 
                      Larger capacity machines can handle more diverse fabrication requirements.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category 4: USA Manufacturing */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">4. USA Manufacturing (10 points)</CardTitle>
              <CardDescription>Binary scoring based on country of origin</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Scoring Method: Binary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Made in USA:</span>
                        <Badge>10 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Imported:</span>
                        <Badge variant="secondary">0 points</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Data Source</h4>
                    <p className="text-sm text-muted-foreground">
                      Country of origin verified through manufacturer specifications and product documentation. 
                      Reflects customer preference for domestic manufacturing and support availability.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category 5: Bend Angle Capability */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">5. Bend Angle Capability (10 points)</CardTitle>
              <CardDescription>Scaled scoring based on maximum bend angle specifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Scoring Method: Scaled</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>195° or greater:</span>
                        <Badge>10 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>180° to 194°:</span>
                        <Badge>8 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>120° to 179°:</span>
                        <Badge>5 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Below 120°:</span>
                        <Badge variant="secondary">3 points</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Technical Basis</h4>
                    <p className="text-sm text-muted-foreground">
                      Maximum bend angle directly affects fabrication flexibility. Higher angles enable more complex 
                      geometries and reduce the need for multiple bends or specialized jigs.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category 6: Wall Thickness Capability */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">6. Wall Thickness Capability (9 points)</CardTitle>
              <CardDescription>Scaled scoring based on 1.75" OD DOM tubing capacity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Scoring Method: Scaled</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>0.156" wall or thicker:</span>
                        <Badge>9 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>0.120" to 0.155" wall:</span>
                        <Badge>7 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>0.095" to 0.119" wall:</span>
                        <Badge>5 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Under 0.095" wall:</span>
                        <Badge>3 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>No published data:</span>
                        <Badge variant="secondary">3 points</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Standardization</h4>
                    <p className="text-sm text-muted-foreground">
                      All measurements standardized to 1.75" OD DOM tubing capacity for fair comparison. 
                      Manufacturers without published data receive minimum baseline score.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category 7: Die Selection & Shapes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">7. Die Selection & Shapes (8 points)</CardTitle>
              <CardDescription>Brand-based scoring on die variety and availability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Scoring Method: Brand-Based</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Universal tooling system:</span>
                        <Badge>8 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Round, square, rectangle shapes:</span>
                        <Badge>7 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Professional die selection:</span>
                        <Badge>6 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Standard round dies + shapes:</span>
                        <Badge>5 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Round focus, limited shapes:</span>
                        <Badge>4 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Basic round die capability:</span>
                        <Badge>3 points</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Shape Categories</h4>
                    <p className="text-sm text-muted-foreground">
                      Evaluated shapes include round tube, square tube, rectangle tube, EMT conduit, flat bar, 
                      hexagon tube, and combination dies. More shape variety increases fabrication versatility.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category 8: Years in Business */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">8. Years in Business (7 points)</CardTitle>
              <CardDescription>Tier-based scoring on company longevity and market experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Scoring Method: Tier-Based</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>100+ years (1915-era):</span>
                        <Badge>7 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>30+ years established:</span>
                        <Badge>6 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>20+ years in business:</span>
                        <Badge>5 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>15+ years proven track record:</span>
                        <Badge>4 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Newer market entry:</span>
                        <Badge>3 points</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Business Stability</h4>
                    <p className="text-sm text-muted-foreground">
                      Company longevity indicates market stability, customer satisfaction, and ongoing support availability. 
                      Established companies typically offer better parts availability and service continuity.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category 9: Upgrade Path & Modularity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">9. Upgrade Path & Modularity (5 points)</CardTitle>
              <CardDescription>Brand-based scoring on available upgrades and modularity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Scoring Method: Brand-Based</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Extensive modular system:</span>
                        <Badge>5 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Universal tooling upgrades:</span>
                        <Badge>4 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Some upgrade options:</span>
                        <Badge>3 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Limited upgrade path:</span>
                        <Badge>2 points</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Future-Proofing</h4>
                    <p className="text-sm text-muted-foreground">
                      Modularity allows users to expand capabilities without replacing the base unit. 
                      Better upgrade paths provide protection against obsolescence and growing needs.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category 10: Mandrel Compatibility */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">10. Mandrel Compatibility (4 points)</CardTitle>
              <CardDescription>Tier-based scoring on mandrel bending availability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Scoring Method: Tier-Based</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Integrated mandrel system:</span>
                        <Badge>4 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Mandrel upgrade available:</span>
                        <Badge>2 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>No mandrel capability:</span>
                        <Badge variant="secondary">0 points</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Thin-Wall Applications</h4>
                    <p className="text-sm text-muted-foreground">
                      Mandrel bending enables clean bends in thin-wall tubing without collapse or distortion. 
                      Critical for aerospace, automotive, and precision applications.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category 11: S-Bend Capability */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">11. S-Bend Capability (3 points)</CardTitle>
              <CardDescription>Binary scoring based on documented S-bend ability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Scoring Method: Binary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Documented S-bend capability:</span>
                        <Badge>3 points</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>No S-bend capability:</span>
                        <Badge variant="secondary">0 points</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Complex Geometries</h4>
                    <p className="text-sm text-muted-foreground">
                      S-bend capability enables complex curves and geometries in a single operation. 
                      Verified through manufacturer documentation or demonstrated examples.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transparency Note */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Transparency & Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                All scoring data is based on publicly available manufacturer specifications, product documentation, 
                and verifiable technical capabilities. When specifications are not published, conservative baseline 
                scores are applied to maintain fairness.
              </p>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Data Sources</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Manufacturer technical specifications</li>
                    <li>• Product documentation and manuals</li>
                    <li>• Published capacity charts</li>
                    <li>• Company founding dates and history</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Scoring Verification</h4>
                  <p className="text-sm text-muted-foreground">
                    Score breakdowns show exactly how each point is earned across all categories. 
                    Click any product's score ring for detailed breakdown and reasoning.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}