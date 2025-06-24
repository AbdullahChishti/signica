"use client"

import { Sparkles } from "lucide-react"
import Header from "@/components/Header"
import {
  Loader,
  PageLoader,
  CardLoader,
  ButtonLoader,
  InlineLoader
} from "@/components/ui/loader"
import { Button } from "@/components/ui/button"

export default function UIDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 lg:px-8 max-w-6xl">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-blue-600/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">UI Components</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Loader
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block">
              Components
            </span>
          </h1>
          
          <p className="text-xl text-gray-600/90 mb-12 max-w-xl mx-auto leading-relaxed font-medium">
            Glassmorphic loaders with <span className="text-gray-700">dramatic shadows and premium feel</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Default Loader Variants */}
          <div 
            className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-3xl p-8"
            style={{
              boxShadow: `
                0 25px 50px -12px rgba(0, 0, 0, 0.15),
                0 10px 20px -8px rgba(0, 0, 0, 0.1),
                0 4px 15px -3px rgba(0, 0, 0, 0.05)
              `
            }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Default Variants</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Small</h3>
                <Loader size="sm" text="Loading small..." />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Medium</h3>
                <Loader size="md" text="Loading medium..." />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Large</h3>
                <Loader size="lg" text="Loading large..." />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Extra Large</h3>
                <Loader size="xl" text="Loading extra large..." />
              </div>
            </div>
          </div>

          {/* Card Loader */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Card Loader</h2>
            <CardLoader text="Processing your request..." />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Minimal Loaders */}
          <div 
            className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-3xl p-8"
            style={{
              boxShadow: `
                0 25px 50px -12px rgba(0, 0, 0, 0.15),
                0 10px 20px -8px rgba(0, 0, 0, 0.1),
                0 4px 15px -3px rgba(0, 0, 0, 0.05)
              `
            }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Minimal Variants</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Inline Loader</h3>
                <InlineLoader text="Saving changes..." size="md" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Button Loader</h3>
                <div className="flex space-x-4">
                  <Button 
                    disabled 
                    className="bg-gradient-to-r from-primary to-blue-600 text-white rounded-2xl"
                  >
                    <ButtonLoader size="sm" />
                    Submitting
                  </Button>
                  
                  <Button 
                    disabled 
                    variant="outline"
                    className="border-primary/30 text-primary rounded-2xl"
                  >
                    <ButtonLoader size="sm" />
                    Processing
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Minimal Only</h3>
                <Loader variant="minimal" size="md" text="Just the spinner..." />
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div 
            className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-3xl p-8"
            style={{
              boxShadow: `
                0 25px 50px -12px rgba(0, 0, 0, 0.15),
                0 10px 20px -8px rgba(0, 0, 0, 0.1),
                0 4px 15px -3px rgba(0, 0, 0, 0.05)
              `
            }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Usage Examples</h2>
            
            <div className="space-y-4 text-sm">
              <div className="p-4 bg-gray-50/80 rounded-xl border border-gray-200/60">
                <code className="text-primary font-medium">
                  {`<PageLoader text="Loading dashboard..." />`}
                </code>
                <p className="text-gray-600 mt-2">Fullscreen loader for page transitions</p>
              </div>

              <div className="p-4 bg-gray-50/80 rounded-xl border border-gray-200/60">
                <code className="text-primary font-medium">
                  {`<CardLoader text="Fetching data..." />`}
                </code>
                <p className="text-gray-600 mt-2">Card-style loader for content areas</p>
              </div>

              <div className="p-4 bg-gray-50/80 rounded-xl border border-gray-200/60">
                <code className="text-primary font-medium">
                  {`<ButtonLoader size="sm" />`}
                </code>
                <p className="text-gray-600 mt-2">Minimal loader for buttons</p>
              </div>

              <div className="p-4 bg-gray-50/80 rounded-xl border border-gray-200/60">
                <code className="text-primary font-medium">
                  {`<Loader variant="minimal" text="Saving..." />`}
                </code>
                <p className="text-gray-600 mt-2">Inline loading state</p>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Fullscreen Loader Button */}
        <div className="text-center">
          <div 
            className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-3xl p-8 inline-block"
            style={{
              boxShadow: `
                0 25px 50px -12px rgba(0, 0, 0, 0.15),
                0 10px 20px -8px rgba(0, 0, 0, 0.1),
                0 4px 15px -3px rgba(0, 0, 0, 0.05)
              `
            }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fullscreen Loader</h2>
            <p className="text-gray-600/90 mb-6">Click to see the fullscreen loading experience</p>
            <Button 
              onClick={() => {
                // Demo: Show fullscreen loader for 3 seconds
                const loaderDiv = document.createElement('div')
                loaderDiv.innerHTML = `
                  <div class="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center z-50" id="demo-loader">
                    <div style="
                      background: rgba(255, 255, 255, 0.9);
                      backdrop-filter: blur(8px);
                      border: 1px solid rgba(229, 231, 235, 0.6);
                      border-radius: 24px;
                      padding: 48px;
                      text-align: center;
                      position: relative;
                      overflow: hidden;
                      box-shadow: 
                        0 25px 50px -12px rgba(0, 0, 0, 0.25),
                        0 10px 20px -8px rgba(0, 0, 0, 0.15),
                        0 4px 15px -3px rgba(0, 0, 0, 0.1);
                    ">
                      <div style="position: absolute; top: -24px; right: -24px; width: 96px; height: 96px; background: linear-gradient(to right, rgba(99, 102, 241, 0.2), rgba(37, 99, 235, 0.2)); border-radius: 50%; filter: blur(20px);"></div>
                      <div style="position: absolute; bottom: -24px; left: -24px; width: 128px; height: 128px; background: linear-gradient(to right, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1)); border-radius: 50%; filter: blur(32px);"></div>
                      <div style="position: relative;">
                        <div style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 9999px; background: linear-gradient(to right, rgba(99, 102, 241, 0.1), rgba(37, 99, 235, 0.1)); border: 1px solid rgba(99, 102, 241, 0.2); margin-bottom: 32px;">
                          <div style="width: 16px; height: 16px; color: rgb(99, 102, 241); animation: pulse 2s infinite;">✨</div>
                          <span style="font-size: 14px; font-weight: 500; color: rgb(99, 102, 241);">Loading</span>
                        </div>
                        <div style="display: flex; justify-content: center; margin-bottom: 32px;">
                          <div style="
                            width: 64px; 
                            height: 64px; 
                            border-radius: 24px; 
                            background: linear-gradient(to right, rgba(99, 102, 241, 0.2), rgba(37, 99, 235, 0.2)); 
                            display: flex; 
                            align-items: center; 
                            justify-content: center;
                            box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.2), 0 4px 10px -2px rgba(99, 102, 241, 0.1);
                          ">
                            <div style="width: 32px; height: 32px; border: 3px solid rgb(99, 102, 241); border-top: 3px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                          </div>
                        </div>
                        <div style="margin-bottom: 24px;">
                          <h2 style="font-size: 24px; font-weight: bold; color: rgb(17, 24, 39); margin-bottom: 12px; line-height: 1.2;">
                            <span style="background: linear-gradient(to right, rgb(99, 102, 241), rgb(37, 99, 235)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Demo Loader</span>
                          </h2>
                          <p style="color: rgba(75, 85, 99, 0.9); font-weight: 500;">
                            Just a moment <span style="color: rgb(55, 65, 81);">while we prepare everything</span>
                          </p>
                        </div>
                        <div style="display: flex; justify-content: center; gap: 8px;">
                          <div style="width: 8px; height: 8px; background: rgb(99, 102, 241); border-radius: 50%; animation: bounce 1s infinite;"></div>
                          <div style="width: 8px; height: 8px; background: rgb(99, 102, 241); border-radius: 50%; animation: bounce 1s infinite; animation-delay: 0.1s;"></div>
                          <div style="width: 8px; height: 8px; background: rgb(99, 102, 241); border-radius: 50%; animation: bounce 1s infinite; animation-delay: 0.2s;"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                `
                document.body.appendChild(loaderDiv)
                setTimeout(() => {
                  document.body.removeChild(loaderDiv)
                }, 3000)
              }}
              className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Sparkles className="w-5 h-5 mr-3" />
              Demo Fullscreen Loader
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
} 