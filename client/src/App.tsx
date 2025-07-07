import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import ProductReview from "@/pages/product-review";
import Comparison from "@/pages/comparison";
import MandrelBenders from "@/pages/mandrel-benders";
import RollBenders from "@/pages/roll-benders";
import RamBenders from "@/pages/ram-benders";
import Sources from "@/pages/sources";
import ScoringMethodology from "@/pages/scoring-methodology";
import Admin from "@/pages/admin";
import AdminLogin from "@/pages/admin-login";
import Contact from "@/pages/contact";
import Legal from "@/pages/legal";
import NotFound from "@/pages/not-found";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FTCDisclosure from "@/components/ftc-disclosure";
import { AuthProvider, RequireAuth } from "@/hooks/use-auth";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <FTCDisclosure />
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/product/:id" component={ProductReview} />
          <Route path="/comparison" component={Comparison} />
          <Route path="/mandrel-benders" component={MandrelBenders} />
          <Route path="/roll-benders" component={RollBenders} />
          <Route path="/ram-benders" component={RamBenders} />
          <Route path="/sources" component={Sources} />
          <Route path="/scoring-methodology" component={ScoringMethodology} />
          <Route path="/admin/login" component={AdminLogin} />
          <Route path="/admin">
            <RequireAuth>
              <Admin />
            </RequireAuth>
          </Route>
          <Route path="/contact" component={Contact} />
          <Route path="/legal" component={Legal} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
