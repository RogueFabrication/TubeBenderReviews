import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Settings, Save, Edit3, Package, FileText, DollarSign, ImageIcon, Upload, X, LogOut, User } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { TubeBender } from "@shared/schema";
import CategoryEditor from "@/components/category-editor";
import { useAuth } from "@/hooks/use-auth";

export default function Admin() {
  const { user, logout } = useAuth();
  const [editingProduct, setEditingProduct] = useState<number | null>(null);
  const [productForm, setProductForm] = useState<Partial<TubeBender>>({});
  const [editingPricing, setEditingPricing] = useState<number | null>(null);
  const [pricingForm, setPricingForm] = useState<{
    priceRange: string; 
    priceMin: string; 
    priceMax: string;
    componentPricing: {
      frame: { min: number; max: number };
      hydraulicRam: { min: number; max: number };
      die: { min: number; max: number };
      standMount: { min: number; max: number };
    } | null;
  }>({
    priceRange: '',
    priceMin: '',
    priceMax: '',
    componentPricing: null
  });

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["/api/tube-benders"],
  });

  const updateProductMutation = useMutation({
    mutationFn: async (data: { id: number; updates: Partial<TubeBender> }) => {
      return apiRequest("PATCH", `/api/tube-benders/${data.id}`, data.updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tube-benders"] });
      setEditingProduct(null);
      setProductForm({});
    },
  });

  const startEdit = (product: TubeBender) => {
    setEditingProduct(product.id);
    setProductForm(product);
  };

  const startPricingEdit = (product: TubeBender) => {
    setEditingPricing(product.id);
    setPricingForm({
      priceRange: product.priceRange,
      priceMin: product.priceMin || '',
      priceMax: product.priceMax || '',
      componentPricing: product.componentPricing || {
        frame: { min: 0, max: 0 },
        hydraulicRam: { min: 0, max: 0 },
        die: { min: 0, max: 0 },
        standMount: { min: 0, max: 0 }
      }
    });
  };

  const savePricing = async (productId: number) => {
    try {
      // Calculate min/max from component pricing if available
      let calculatedMin = pricingForm.priceMin;
      let calculatedMax = pricingForm.priceMax;
      
      if (pricingForm.componentPricing) {
        const totalMin = Object.values(pricingForm.componentPricing).reduce((sum, component) => sum + component.min, 0);
        const totalMax = Object.values(pricingForm.componentPricing).reduce((sum, component) => sum + component.max, 0);
        calculatedMin = totalMin.toString();
        calculatedMax = totalMax.toString();
      }

      await updateProductMutation.mutateAsync({
        id: productId,
        updates: {
          priceRange: pricingForm.priceRange,
          priceMin: calculatedMin || null,
          priceMax: calculatedMax || null,
          componentPricing: pricingForm.componentPricing
        }
      });
      setEditingPricing(null);
      setPricingForm({ 
        priceRange: '', 
        priceMin: '', 
        priceMax: '', 
        componentPricing: null 
      });
    } catch (error) {
      console.error('Failed to update pricing:', error);
    }
  };

  const saveProduct = () => {
    if (editingProduct && productForm) {
      updateProductMutation.mutate({
        id: editingProduct,
        updates: productForm,
      });
    }
  };

  const updateField = (field: string, value: any) => {
    setProductForm(prev => ({ ...prev, [field]: value }));
  };

  const updateArrayField = (field: string, value: string) => {
    const items = value.split('\n').filter(item => item.trim() !== '');
    updateField(field, items);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Settings className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <Badge variant="secondary">Content Management</Badge>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {user?.username}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user?.email}
            </p>
          </div>
          <Button variant="outline" onClick={logout} className="flex items-center space-x-2">
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="products" className="flex items-center space-x-2">
            <Package className="h-4 w-4" />
            <span>Products</span>
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Categories</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Site Content</span>
          </TabsTrigger>
          <TabsTrigger value="pricing" className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4" />
            <span>Pricing</span>
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center space-x-2">
            <Edit3 className="h-4 w-4" />
            <span>Important Notes</span>
          </TabsTrigger>
          <TabsTrigger value="images" className="flex items-center space-x-2">
            <ImageIcon className="h-4 w-4" />
            <span>Images</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {products.map((product: TubeBender) => (
                  <Card key={product.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-6">
                      {editingProduct === product.id ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="name">Product Name</Label>
                              <Input
                                id="name"
                                value={productForm.name || ''}
                                onChange={(e) => updateField('name', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="priceRange">Price Range</Label>
                              <Input
                                id="priceRange"
                                value={productForm.priceRange || ''}
                                onChange={(e) => updateField('priceRange', e.target.value)}
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              value={productForm.description || ''}
                              onChange={(e) => updateField('description', e.target.value)}
                              rows={3}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="pros">Pros (one per line)</Label>
                              <Textarea
                                id="pros"
                                value={(productForm.pros || []).join('\n')}
                                onChange={(e) => updateArrayField('pros', e.target.value)}
                                rows={4}
                              />
                            </div>
                            <div>
                              <Label htmlFor="cons">Cons (one per line)</Label>
                              <Textarea
                                id="cons"
                                value={(productForm.cons || []).join('\n')}
                                onChange={(e) => updateArrayField('cons', e.target.value)}
                                rows={4}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor="maxCapacity">Max Capacity</Label>
                              <Input
                                id="maxCapacity"
                                value={productForm.maxCapacity || ''}
                                onChange={(e) => updateField('maxCapacity', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="powerType">Power Type</Label>
                              <Input
                                id="powerType"
                                value={productForm.powerType || ''}
                                onChange={(e) => updateField('powerType', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="countryOfOrigin">Country of Origin</Label>
                              <Input
                                id="countryOfOrigin"
                                value={productForm.countryOfOrigin || ''}
                                onChange={(e) => updateField('countryOfOrigin', e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button onClick={saveProduct} disabled={updateProductMutation.isPending}>
                              <Save className="h-4 w-4 mr-2" />
                              {updateProductMutation.isPending ? 'Saving...' : 'Save Changes'}
                            </Button>
                            <Button variant="outline" onClick={() => setEditingProduct(null)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <p className="text-gray-600 mt-1">{product.description}</p>
                            <div className="flex space-x-4 mt-2 text-sm text-gray-500">
                              <span>Price: {product.priceRange}</span>
                              <span>Capacity: {product.maxCapacity}</span>
                              <span>Origin: {product.countryOfOrigin}</span>
                            </div>
                          </div>
                          <Button onClick={() => startEdit(product)} variant="outline" size="sm">
                            <Edit3 className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <CategoryEditor />
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Site Content Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="heroTitle">Hero Section Title</Label>
                <Input id="heroTitle" placeholder="Professional Tube Bender Reviews & Comparisons" />
              </div>
              
              <div>
                <Label htmlFor="heroSubtitle">Hero Section Subtitle</Label>
                <Textarea 
                  id="heroSubtitle" 
                  placeholder="Expert analysis of rotary draw tube benders for fabricators and manufacturers"
                  rows={2}
                />
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Editorial Content</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="sBendDefinition">S-Bend Definition</Label>
                    <Textarea 
                      id="sBendDefinition" 
                      placeholder="S-bends feature opposite directions with zero space between bends"
                      rows={2}
                      className="mt-1"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      This text appears in product specifications and educational content about S-bend capability.
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="mandrelExplanation">Mandrel Bending Explanation</Label>
                    <Textarea 
                      id="mandrelExplanation" 
                      placeholder="Mandrel bending uses an internal support to prevent tube collapse during forming"
                      rows={3}
                      className="mt-1"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Used in product descriptions and educational sections about mandrel tube benders.
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="valueProposition">Value Proposition Text</Label>
                    <Textarea 
                      id="valueProposition" 
                      placeholder="Find the perfect tube bender for your specific needs and budget"
                      rows={2}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button className="flex items-center space-x-2">
                    <Save className="h-4 w-4" />
                    <span>Save Editorial Content</span>
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="aboutText">About Section</Label>
                <Textarea 
                  id="aboutText" 
                  placeholder="Our comprehensive reviews help you choose the right tube bender..."
                  rows={4}
                />
              </div>

              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Content Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Update pricing information and cost calculations for all products.
              </p>
              
              <div className="space-y-4">
                {products.map((product: TubeBender) => (
                  <div key={product.id} className="p-4 border rounded">
                    {editingPricing === product.id ? (
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">{product.name}</h4>
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div>
                              <Label htmlFor={`priceRange-${product.id}`}>Price Range Display</Label>
                              <Input
                                id={`priceRange-${product.id}`}
                                value={pricingForm.priceRange}
                                onChange={(e) => setPricingForm(prev => ({ ...prev, priceRange: e.target.value }))}
                                placeholder="$1,000 - $2,000"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`priceMin-${product.id}`}>Calculated Minimum (Read Only)</Label>
                              <Input
                                id={`priceMin-${product.id}`}
                                value={pricingForm.componentPricing ? 
                                  Object.values(pricingForm.componentPricing).reduce((sum, component) => sum + component.min, 0).toString() :
                                  pricingForm.priceMin
                                }
                                readOnly
                                className="bg-gray-100"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`priceMax-${product.id}`}>Calculated Maximum (Read Only)</Label>
                              <Input
                                id={`priceMax-${product.id}`}
                                value={pricingForm.componentPricing ? 
                                  Object.values(pricingForm.componentPricing).reduce((sum, component) => sum + component.max, 0).toString() :
                                  pricingForm.priceMax
                                }
                                readOnly
                                className="bg-gray-100"
                              />
                            </div>
                          </div>
                          
                          {pricingForm.componentPricing && (
                            <div className="border rounded p-4 bg-gray-50">
                              <h5 className="font-medium mb-3">Component Pricing</h5>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-3">
                                  <div>
                                    <Label>Frame</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                      <Input
                                        type="number"
                                        placeholder="Min"
                                        value={pricingForm.componentPricing.frame.min}
                                        onChange={(e) => setPricingForm(prev => ({
                                          ...prev,
                                          componentPricing: {
                                            ...prev.componentPricing!,
                                            frame: { ...prev.componentPricing!.frame, min: parseInt(e.target.value) || 0 }
                                          }
                                        }))}
                                      />
                                      <Input
                                        type="number"
                                        placeholder="Max"
                                        value={pricingForm.componentPricing.frame.max}
                                        onChange={(e) => setPricingForm(prev => ({
                                          ...prev,
                                          componentPricing: {
                                            ...prev.componentPricing!,
                                            frame: { ...prev.componentPricing!.frame, max: parseInt(e.target.value) || 0 }
                                          }
                                        }))}
                                      />
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <Label>Hydraulic Ram</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                      <Input
                                        type="number"
                                        placeholder="Min"
                                        value={pricingForm.componentPricing.hydraulicRam.min}
                                        onChange={(e) => setPricingForm(prev => ({
                                          ...prev,
                                          componentPricing: {
                                            ...prev.componentPricing!,
                                            hydraulicRam: { ...prev.componentPricing!.hydraulicRam, min: parseInt(e.target.value) || 0 }
                                          }
                                        }))}
                                      />
                                      <Input
                                        type="number"
                                        placeholder="Max"
                                        value={pricingForm.componentPricing.hydraulicRam.max}
                                        onChange={(e) => setPricingForm(prev => ({
                                          ...prev,
                                          componentPricing: {
                                            ...prev.componentPricing!,
                                            hydraulicRam: { ...prev.componentPricing!.hydraulicRam, max: parseInt(e.target.value) || 0 }
                                          }
                                        }))}
                                      />
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="space-y-3">
                                  <div>
                                    <Label>Die</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                      <Input
                                        type="number"
                                        placeholder="Min"
                                        value={pricingForm.componentPricing.die.min}
                                        onChange={(e) => setPricingForm(prev => ({
                                          ...prev,
                                          componentPricing: {
                                            ...prev.componentPricing!,
                                            die: { ...prev.componentPricing!.die, min: parseInt(e.target.value) || 0 }
                                          }
                                        }))}
                                      />
                                      <Input
                                        type="number"
                                        placeholder="Max"
                                        value={pricingForm.componentPricing.die.max}
                                        onChange={(e) => setPricingForm(prev => ({
                                          ...prev,
                                          componentPricing: {
                                            ...prev.componentPricing!,
                                            die: { ...prev.componentPricing!.die, max: parseInt(e.target.value) || 0 }
                                          }
                                        }))}
                                      />
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <Label>Stand/Mount</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                      <Input
                                        type="number"
                                        placeholder="Min"
                                        value={pricingForm.componentPricing.standMount.min}
                                        onChange={(e) => setPricingForm(prev => ({
                                          ...prev,
                                          componentPricing: {
                                            ...prev.componentPricing!,
                                            standMount: { ...prev.componentPricing!.standMount, min: parseInt(e.target.value) || 0 }
                                          }
                                        }))}
                                      />
                                      <Input
                                        type="number"
                                        placeholder="Max"
                                        value={pricingForm.componentPricing.standMount.max}
                                        onChange={(e) => setPricingForm(prev => ({
                                          ...prev,
                                          componentPricing: {
                                            ...prev.componentPricing!,
                                            standMount: { ...prev.componentPricing!.standMount, max: parseInt(e.target.value) || 0 }
                                          }
                                        }))}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-2 mt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setPricingForm(prev => ({
                                ...prev,
                                componentPricing: prev.componentPricing ? null : {
                                  frame: { min: 0, max: 0 },
                                  hydraulicRam: { min: 0, max: 0 },
                                  die: { min: 0, max: 0 },
                                  standMount: { min: 0, max: 0 }
                                }
                              }))}
                            >
                              {pricingForm.componentPricing ? 'Switch to Simple Pricing' : 'Switch to Component Pricing'}
                            </Button>
                          </div>
                          <div className="flex space-x-2 mt-4">
                            <Button 
                              onClick={() => savePricing(product.id)}
                              disabled={updateProductMutation.isPending}
                              size="sm"
                            >
                              <Save className="h-4 w-4 mr-2" />
                              Save
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={() => setEditingPricing(null)}
                              size="sm"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-gray-600">Current: {product.priceRange}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => startPricingEdit(product)}>
                          <Edit3 className="h-4 w-4 mr-2" />
                          Edit Pricing
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Important Notes Editor</CardTitle>
              <p className="text-sm text-gray-600">
                Edit the important notes that appear in price breakdown popups for each product
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {products.map((product: TubeBender) => (
                  <div key={product.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">{product.name}</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const currentNotes = product.importantNotes || [
                            "Prices current as of January 2025",
                            "Additional dies and accessories sold separately",
                            "Lead times vary by manufacturer (JD2: 6-8 weeks, others: 2-4 weeks)",
                            "Hydraulic upgrades available for compatible models"
                          ];
                          setProductForm({ 
                            ...product, 
                            importantNotes: currentNotes 
                          });
                          setEditingProduct(product.id);
                        }}
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit Notes
                      </Button>
                    </div>
                    
                    {editingProduct === product.id ? (
                      <div className="space-y-4">
                        <div>
                          <Label>Important Notes (one per line)</Label>
                          <Textarea
                            value={(productForm.importantNotes || []).join('\n')}
                            onChange={(e) => updateArrayField('importantNotes', e.target.value)}
                            placeholder="• Prices current as of January 2025&#10;• Additional dies and accessories sold separately&#10;• Lead times vary by manufacturer&#10;• Hydraulic upgrades available for compatible models"
                            rows={6}
                            className="font-mono text-sm"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Each line will become a bullet point in the price breakdown popup
                          </p>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button onClick={saveProduct} size="sm">
                            <Save className="h-4 w-4 mr-2" />
                            Save Notes
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setEditingProduct(null);
                              setProductForm({});
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-600">
                        <p className="font-medium mb-2">Current Notes:</p>
                        <ul className="space-y-1">
                          {(product.importantNotes || [
                            "Prices current as of January 2025",
                            "Additional dies and accessories sold separately",
                            "Lead times vary by manufacturer (JD2: 6-8 weeks, others: 2-4 weeks)",
                            "Hydraulic upgrades available for compatible models"
                          ]).map((note, index) => (
                            <li key={index} className="text-xs">• {note}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Image Management</CardTitle>
              <p className="text-sm text-gray-600">
                Upload and manage product images. These images will be used on both the home page and individual product pages.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map((product: TubeBender) => (
                  <div key={product.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">{product.name}</h4>
                      <Badge variant="outline">{product.brand}</Badge>
                    </div>
                    
                    {/* Current Image Display */}
                    <div className="mb-4">
                      <Label className="text-sm font-medium mb-2 block">Current Image</Label>
                      <div className="w-full h-48 border border-gray-200 rounded-lg overflow-hidden">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={`${product.name} tube bender`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <div className="text-center">
                              <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-500">No image uploaded</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Upload New Image</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                // For now, we'll use a simple file reader to show preview
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                  const imageUrl = e.target?.result as string;
                                  setProductForm({
                                    ...product,
                                    imageUrl: imageUrl
                                  });
                                  setEditingProduct(product.id);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="flex-1"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setProductForm({
                                ...product,
                                imageUrl: null
                              });
                              setEditingProduct(product.id);
                            }}
                          >
                            <X className="h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      </div>

                      {/* URL Input Option */}
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Or Enter Image URL</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            placeholder="https://example.com/image.jpg"
                            value={editingProduct === product.id ? productForm.imageUrl || '' : product.imageUrl || ''}
                            onChange={(e) => {
                              setProductForm({
                                ...product,
                                imageUrl: e.target.value
                              });
                              setEditingProduct(product.id);
                            }}
                            className="flex-1"
                          />
                        </div>
                      </div>

                      {/* Save Button */}
                      {editingProduct === product.id && (
                        <div className="flex space-x-2">
                          <Button onClick={saveProduct} size="sm">
                            <Save className="h-4 w-4 mr-2" />
                            Save Image
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setEditingProduct(null);
                              setProductForm({});
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}