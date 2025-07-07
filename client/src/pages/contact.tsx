import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare, Shield, AlertTriangle, CheckCircle, ExternalLink } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: "accuracy" | "fairness" | "general" | "manufacturer";
  // Spam protection fields
  honeypot: string; // Hidden field for bots
  mathAnswer: string; // Simple math verification
  timeSpent: number; // Time tracking
  fingerprint: string; // Browser fingerprint
}

export default function Contact() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "general",
    honeypot: "",
    mathAnswer: "",
    timeSpent: 0,
    fingerprint: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [mathQuestion, setMathQuestion] = useState<{ question: string; answer: number }>({ question: "", answer: 0 });
  const [startTime, setStartTime] = useState<number>(0);
  const [errors, setErrors] = useState<string[]>([]);

  // Generate math question and browser fingerprint on component mount
  useEffect(() => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setMathQuestion({
      question: `${num1} + ${num2}`,
      answer: num1 + num2
    });
    
    setStartTime(Date.now());
    
    // Simple browser fingerprint
    const fingerprint = btoa(
      navigator.userAgent + 
      screen.width + 
      screen.height + 
      new Date().getTimezoneOffset()
    ).slice(0, 16);
    
    setForm(prev => ({ ...prev, fingerprint }));
  }, []);

  const submitMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      return apiRequest("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
        type: "general",
        honeypot: "",
        mathAnswer: "",
        timeSpent: 0,
        fingerprint: form.fingerprint
      });
    },
    onError: (error: any) => {
      setErrors([error.message || "Failed to send message. Please try again."]);
    }
  });

  const updateField = (field: keyof ContactForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];
    
    // Check honeypot field (should be empty)
    if (form.honeypot) {
      newErrors.push("Bot detection triggered");
      setErrors(newErrors);
      return false;
    }
    
    // Check math answer
    if (parseInt(form.mathAnswer) !== mathQuestion.answer) {
      newErrors.push("Please solve the math problem correctly");
    }
    
    // Check time spent (minimum 10 seconds to prevent rapid submissions)
    const timeSpent = Date.now() - startTime;
    if (timeSpent < 10000) {
      newErrors.push("Please take more time to fill out the form");
    }
    
    // Check for common spam patterns
    const spamPatterns = [
      /\b(viagra|cialis|pharmacy|casino|poker|loan|credit|bitcoin|crypto)\b/i,
      /http[s]?:\/\//g, // No URLs allowed
      /(.)\1{10,}/g, // No repeated characters
    ];
    
    const allText = `${form.name} ${form.email} ${form.subject} ${form.message}`;
    for (const pattern of spamPatterns) {
      if (pattern.test(allText)) {
        newErrors.push("Message contains prohibited content");
        break;
      }
    }
    
    // Check message length (minimum 20 characters)
    if (form.message.length < 20) {
      newErrors.push("Message must be at least 20 characters");
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    
    if (!validateForm()) {
      return;
    }
    
    // Update time spent before submission
    const finalForm = {
      ...form,
      timeSpent: Date.now() - startTime
    };
    
    submitMutation.mutate(finalForm);
  };

  const getSubjectPlaceholder = () => {
    switch (form.type) {
      case "accuracy":
        return "Accuracy concern about [Product Name]";
      case "fairness":
        return "Fairness concern about review methodology";
      case "manufacturer":
        return "Manufacturer inquiry or product information";
      default:
        return "General inquiry";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-600 text-lg">
          We welcome feedback on accuracy, fairness, and product information
        </p>
      </div>

      {/* Important Disclaimers */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Alert className="border-blue-200 bg-blue-50">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            <strong>Independence Notice:</strong> We do not manufacture any tube bending equipment. 
            We are an independent review site dedicated to providing fair, objective comparisons 
            based on publicly available information and industry expertise.
          </AlertDescription>
        </Alert>

        <Alert className="border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Product Support:</strong> For specific technical questions, warranty issues, 
            or product support, please contact the manufacturer directly. We provide contact 
            information for each manufacturer in our reviews.
          </AlertDescription>
        </Alert>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Send Us a Message</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Message Sent!</strong> Thank you for your feedback. 
                    We review all submissions and will respond within 2-3 business days if needed.
                  </AlertDescription>
                </Alert>
              ) : (
                <>
                  {errors.length > 0 && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="space-y-1">
                          {errors.map((error, index) => (
                            <div key={index} className="text-red-700">{error}</div>
                          ))}
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Honeypot field - hidden from users but visible to bots */}
                    <div style={{ display: 'none' }}>
                      <Label htmlFor="website">Leave this field empty</Label>
                      <Input
                        id="website"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.honeypot}
                        onChange={(e) => updateField("honeypot", e.target.value)}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Your Name *</Label>
                        <Input
                          id="name"
                          value={form.name}
                          onChange={(e) => updateField("name", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                  <div>
                    <Label htmlFor="type">Message Type</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                      {[
                        { value: "accuracy", label: "Accuracy", icon: "📊" },
                        { value: "fairness", label: "Fairness", icon: "⚖️" },
                        { value: "manufacturer", label: "Manufacturer", icon: "🏭" },
                        { value: "general", label: "General", icon: "💬" }
                      ].map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => updateField("type", type.value)}
                          className={`p-3 border rounded-lg text-sm transition-colors ${
                            form.type === type.value
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="text-lg mb-1">{type.icon}</div>
                          <div className="font-medium">{type.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={form.subject}
                      onChange={(e) => updateField("subject", e.target.value)}
                      placeholder={getSubjectPlaceholder()}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={form.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      placeholder="Please provide details about your concern or inquiry..."
                      rows={6}
                      required
                    />
                  </div>

                  {/* Math verification */}
                  <div className="border-t pt-4">
                    <Label htmlFor="mathAnswer" className="flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <span>Security Verification: What is {mathQuestion.question}? *</span>
                    </Label>
                    <Input
                      id="mathAnswer"
                      type="number"
                      value={form.mathAnswer}
                      onChange={(e) => updateField("mathAnswer", e.target.value)}
                      placeholder="Enter the answer"
                      className="mt-2 max-w-32"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={submitMutation.isPending}
                    className="w-full"
                  >
                    {submitMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                  </form>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Contact Information & Guidelines */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Contact Guidelines</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Badge variant="outline" className="mb-2">Accuracy Concerns</Badge>
                <p className="text-sm text-gray-600">
                  If you believe any product information is inaccurate, please provide 
                  specific details and sources. We update our reviews regularly.
                </p>
              </div>

              <div>
                <Badge variant="outline" className="mb-2">Fairness Questions</Badge>
                <p className="text-sm text-gray-600">
                  Our scoring methodology is transparent and objective. Contact us 
                  if you have concerns about our evaluation process.
                </p>
              </div>

              <div>
                <Badge variant="outline" className="mb-2">Manufacturers</Badge>
                <p className="text-sm text-gray-600">
                  We welcome manufacturers to provide updated product information, 
                  specifications, and official imagery.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manufacturer Contacts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">RogueFab</span>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://www.roguefab.com/contact/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Contact
                  </a>
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-medium">Baileigh Industrial</span>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://www.baileigh.com/contact-us" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Contact
                  </a>
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-medium">JD Squared</span>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://jd2.com/contact-us/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Contact
                  </a>
                </Button>
              </div>

              <div className="text-xs text-gray-500 mt-4">
                For product-specific questions, warranty claims, or technical support, 
                contact manufacturers directly for fastest response.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}