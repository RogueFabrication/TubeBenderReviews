import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ScoringBreakdown from "@/components/scoring-breakdown";
import ProductImage from "@/components/product-image";
import { ExternalLink, Trophy, CheckCircle, XCircle, AlertTriangle, Gavel, Clock, Truck, ArrowLeft } from "lucide-react";
import { TubeBender } from "@shared/schema";
import { Link } from "wouter";

export default function ProductReview() {
  const { id } = useParams();
  
  const { data: product, isLoading, error } = useQuery<TubeBender>({
    queryKey: [`/api/tube-benders/${id}`],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-lg text-gray-600">Loading review...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The tube bender review you're looking for doesn't exist.</p>
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Reviews
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/" className="text-primary hover:text-primary/80 flex items-center text-sm">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Reviews
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <Card className={`${product.isRecommended ? 'ring-2 ring-success/20 bg-green-50/50 dark:bg-green-900/10' : ''}`}>
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {product.isRecommended && (
                      <Badge className="bg-accent text-accent-foreground">
                        <Trophy className="mr-1 h-3 w-3" />
                        EDITOR'S CHOICE
                      </Badge>
                    )}
                    <Badge variant="outline">
                      {product.category === 'professional' ? 'Professional' :
                       product.category === 'heavy-duty' ? 'Heavy-Duty' :
                       product.category === 'budget' ? 'Budget Pick' : product.category}
                    </Badge>
                  </div>
                  <ScoringBreakdown product={product} />
                </div>
                
                <CardTitle className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {product.name}
                </CardTitle>
                <p className="text-lg text-gray-600 dark:text-gray-400">{product.model}</p>
              </CardHeader>
              
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <ProductImage 
                      imageUrl={product.imageUrl}
                      productName={product.name}
                      className="rounded-lg shadow-md w-full h-64"
                      showOverlay={false}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {product.description}
                    </p>
                    
                    {product.purchaseUrl && product.purchaseUrl !== "#" && (
                      <Button
                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                        onClick={() => window.open(product.purchaseUrl, '_blank')}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Product
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Specifications */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Brand:</span>
                      <span className="text-gray-900 dark:text-gray-100">{product.brand}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Model:</span>
                      <span className="text-gray-900 dark:text-gray-100">{product.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Price Range:</span>
                      <span className="text-success font-semibold">{product.priceRange}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Max Capacity:</span>
                      <span className="text-gray-900 dark:text-gray-100">{product.maxCapacity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Power Type:</span>
                      <span className="text-gray-900 dark:text-gray-100">{product.powerType}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Bend Angle:</span>
                      <span className="text-gray-900 dark:text-gray-100">{product.bendAngle}°</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Country of Origin:</span>
                      <span className={`font-semibold ${product.countryOfOrigin === 'USA' ? 'text-success' : 'text-gray-900 dark:text-gray-100'}`}>
                        {product.countryOfOrigin}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Warranty:</span>
                      <span className="text-gray-900 dark:text-gray-100">{product.warranty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Mandrel Available:</span>
                      <span className={`font-semibold ${product.mandrelBender === 'Yes' ? 'text-success' : 'text-gray-600 dark:text-gray-400'}`}>
                        {product.mandrelBender}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700 dark:text-gray-300">S-Bend Capable:</span>
                      <span className={`font-semibold ${product.sBendCapability ? 'text-success' : 'text-gray-600 dark:text-gray-400'}`}>
                        {product.sBendCapability ? 'Yes' : 'No'}
                      </span>
                    </div>
                </div>
                <div className="md:col-span-2 mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Note:</strong> S-bends are bends in opposite directions with zero space between them, requiring precise back-to-back positioning without any straight section between bend points.
                  </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pros and Cons */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-success flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Pros
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {product.pros.map((pro, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="text-success mt-1 mr-3 h-4 w-4 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600 flex items-center">
                    <XCircle className="mr-2 h-5 w-5" />
                    Cons
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {product.cons.map((con, index) => (
                      <li key={index} className="flex items-start">
                        <XCircle className="text-red-600 mt-1 mr-3 h-4 w-4 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{con}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <CheckCircle className="text-success mr-2 h-4 w-4 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Materials Compatibility */}
            <Card>
              <CardHeader>
                <CardTitle>Materials Compatibility</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {product.materials.map((material, index) => (
                    <Badge key={index} variant="outline" className="justify-center py-2">
                      {material}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase CTA */}
            <Card>
              <CardHeader>
                <CardTitle>Ready to Purchase?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {product.purchaseUrl && product.purchaseUrl !== "#" && (
                  <Button
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    onClick={() => window.open(product.purchaseUrl, '_blank')}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Product
                  </Button>
                )}
                
                <Link href="/comparison">
                  <Button variant="outline" className="w-full">
                    Compare with Others
                  </Button>
                </Link>
                
                <Link href="/#calculator">
                  <Button variant="secondary" className="w-full">
                    Calculate Total Cost
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
