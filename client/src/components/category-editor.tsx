import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Save, X, Settings } from "lucide-react";
import { TubeBender } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

interface CategoryEditorProps {
  className?: string;
}

const commonCategories = [
  "Professional",
  "Heavy-Duty", 
  "Budget-Friendly",
  "Entry-Level",
  "Mid-Range",
  "High-Volume Production",
  "Small Shop",
  "DIY Enthusiast",
  "Automotive",
  "Industrial",
  "Fabrication Shop",
  "Racing Teams",
  "Custom Work",
  "Prototype Development"
];

export default function CategoryEditor({ className = "" }: CategoryEditorProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingCategory, setEditingCategory] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  
  const queryClient = useQueryClient();
  
  const { data: tubeBenders, isLoading } = useQuery<TubeBender[]>({
    queryKey: ["/api/tube-benders"],
  });

  const updateCategoryMutation = useMutation({
    mutationFn: async ({ id, category }: { id: number; category: string }) => {
      const response = await fetch(`/api/tube-benders/${id}/category`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ category })
      });
      
      if (!response.ok) {
        throw new Error("Failed to update category");
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tube-benders"] });
      setEditingId(null);
      setEditingCategory("");
    }
  });

  const startEdit = (product: TubeBender) => {
    setEditingId(product.id);
    setEditingCategory(getCategoryDisplayName(product.category));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingCategory("");
  };

  const saveCategory = () => {
    if (editingId && editingCategory.trim()) {
      updateCategoryMutation.mutate({ 
        id: editingId, 
        category: editingCategory.trim() 
      });
    }
  };

  const getCategoryDisplayName = (category: string): string => {
    switch (category) {
      case 'professional': return 'Professional';
      case 'heavy-duty': return 'Heavy-Duty';
      case 'budget': return 'Budget-Friendly';
      case 'entry': return 'Entry-Level';
      case 'mid-range': return 'Mid-Range';
      default: return category;
    }
  };

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (!showEditor) {
    return (
      <div className={className}>
        <Button 
          variant="outline" 
          onClick={() => setShowEditor(true)}
          className="flex items-center gap-2"
        >
          <Settings className="w-4 h-4" />
          Edit "Best For" Categories
        </Button>
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Edit "Best For" Categories</CardTitle>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowEditor(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Customize how each tube bender is positioned in the "Best For" column
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tubeBenders?.map((product) => (
            <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <div className="font-medium">{product.name}</div>
                <div className="text-sm text-muted-foreground">{product.brand} {product.model}</div>
              </div>
              
              <div className="flex items-center gap-3">
                {editingId === product.id ? (
                  <div className="flex items-center gap-2">
                    <Select value={editingCategory} onValueChange={setEditingCategory}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {commonCategories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      value={editingCategory}
                      onChange={(e) => setEditingCategory(e.target.value)}
                      placeholder="Or type custom category"
                      className="w-48"
                    />
                    <Button 
                      size="sm" 
                      onClick={saveCategory}
                      disabled={updateCategoryMutation.isPending || !editingCategory.trim()}
                    >
                      <Save className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={cancelEdit}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">
                      {getCategoryDisplayName(product.category)}
                    </Badge>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => startEdit(product)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
          <h4 className="font-medium mb-2">Common Categories:</h4>
          <div className="flex flex-wrap gap-2">
            {commonCategories.slice(0, 8).map((cat) => (
              <Badge key={cat} variant="secondary" className="text-xs">
                {cat}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}