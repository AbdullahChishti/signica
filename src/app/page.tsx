import { Shield, Users, BarChart3, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck } from "lucide-react"
import Header from '@/components/Header';

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background">
      <div className="flex h-full grow flex-col">
        <Header />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-slate-50 to-blue-100">
            <div className="container mx-auto px-6">
              <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
                <div className="aspect-square w-full rounded-xl bg-primary/10 p-4 sm:p-6 md:p-8 shadow-lg flex items-center justify-center">
                  <svg
                    className="h-full w-full object-contain text-primary"
                    viewBox="0 0 500 500"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect fill="currentColor" className="text-primary/10" height="500" width="500" x="0" y="0" />
                    <g transform="translate(50 50)">
                      <rect
                        fill="#FFFFFF"
                        height="150"
                        rx="10"
                        stroke="currentColor"
                        strokeWidth="5"
                        width="200"
                        x="100"
                        y="150"
                      />
                      <circle cx="200" cy="100" fill="currentColor" r="30" />
                      <rect fill="#FFFFFF" height="70" width="50" x="175" y="130" />
                      <path d="M150 280 Q200 320 250 280" fill="none" stroke="currentColor" strokeWidth="5" />
                      <line stroke="currentColor" strokeWidth="5" x1="130" x2="130" y1="180" y2="250" />
                      <line stroke="currentColor" strokeWidth="5" x1="270" x2="270" y1="180" y2="250" />
                      <rect fill="currentColor" className="opacity-10" height="100" width="160" x="120" y="170" />
                      <line stroke="currentColor" strokeWidth="3" x1="130" x2="250" y1="190" y2="190" />
                      <line stroke="currentColor" strokeWidth="3" x1="130" x2="230" y1="210" y2="210" />
                      <line stroke="currentColor" strokeWidth="3" x1="130" x2="250" y1="230" y2="230" />
                    </g>
                  </svg>
                </div>
                <div className="flex flex-col gap-6 text-center md:text-left">
                  <div className="flex flex-col gap-4">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl lg:text-6xl">
                      Simplify Your <span className="text-primary">Form W9</span> Process
                    </h1>
                    <p className="text-lg text-muted-foreground">
                      Our app streamlines the collection and management of Form W9, making it easier for businesses to
                      gather necessary information from vendors and contractors.
                    </p>
                  </div>
                  <Button size="lg" className="self-center md:self-start">
                    Get Started Today
                  </Button>
                  <div className="flex items-center gap-4 mt-4 justify-center md:justify-start">
                      <Badge variant="success">
                        <ShieldCheck className="w-4 h-4 mr-1.5" />
                        IRS Compliant
                      </Badge>
                      <Badge>
                        <ShieldCheck className="w-4 h-4 mr-1.5" />
                        Secure & Safe
                      </Badge>
                    </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="bg-muted/50 py-20 md:py-28" id="features">
            <div className="container mx-auto px-6">
              <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
                <div className="flex flex-col gap-8 text-center md:text-left md:order-last">
                  <div className="flex flex-col gap-4">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-800 md:text-4xl">
                      Key <span className="text-primary">Features</span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Our app offers a range of features designed to simplify the Form W9 process for businesses of all
                      sizes.
                    </p>
                  </div>
                  <div className="flex flex-col gap-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 text-primary">
                        <Shield className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Secure Data Collection</h3>
                        <p className="text-base text-muted-foreground">
                          Collect Form W9 data securely with encryption and compliance features.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 text-primary">
                        <Users className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">User-Friendly Interface</h3>
                        <p className="text-base text-muted-foreground">
                          Our intuitive interface makes it easy for vendors and contractors to submit their information.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 text-primary">
                        <BarChart3 className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Automated Reporting</h3>
                        <p className="text-base text-muted-foreground">
                          Generate reports and track submissions effortlessly with our automated reporting tools.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="aspect-square w-full rounded-xl bg-primary/10 p-4 sm:p-6 md:p-8 shadow-lg flex items-center justify-center">
                  <svg
                    className="h-full w-full object-contain text-primary"
                    viewBox="0 0 500 500"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect fill="currentColor" className="text-primary/10" height="500" width="500" x="0" y="0" />
                    <g transform="translate(50 50)">
                      <rect fill="currentColor" className="text-primary" height="200" rx="15" width="100" x="150" y="100" />
                      <rect fill="#FFFFFF" height="180" width="80" x="160" y="110" />
                      <text
                        fill="currentColor"
                        className="text-primary"
                        fontFamily="Arial, sans-serif"
                        fontSize="20"
                        fontWeight="bold"
                        textAnchor="middle"
                        x="200"
                        y="140"
                      >
                        W-9
                      </text>
                      <line stroke="#B0BEC5" strokeWidth="2" x1="170" x2="230" y1="160" y2="160" />
                      <line stroke="#B0BEC5" strokeWidth="2" x1="170" x2="230" y1="175" y2="175" />
                      <line stroke="#B0BEC5" strokeWidth="2" x1="170" x2="200" y1="190" y2="190" />
                      <line stroke="#B0BEC5" strokeWidth="2" x1="170" x2="230" y1="205" y2="205" />
                      <rect fill="currentColor" className="text-primary" height="20" rx="5" width="60" x="170" y="220" />
                      <text
                        fill="#FFFFFF"
                        fontFamily="Arial, sans-serif"
                        fontSize="10"
                        textAnchor="middle"
                        x="200"
                        y="234"
                      >
                        SUBMIT
                      </text>
                      <circle cx="280" cy="120" fill="#FFFFFF" r="20" stroke="currentColor" strokeWidth="3" />
                      <path d="M273 120 L280 127 L287 115" fill="none" stroke="currentColor" strokeWidth="3" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" className="bg-white py-20 md:py-28">
            <div className="container mx-auto px-6">
              <div className="flex flex-col gap-12">
                <div className="flex flex-col gap-4 text-center">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-800 md:text-4xl">
                    How It Works: Your Journey to W9 Simplicity
                  </h2>
                  <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
                    Discover how our Form W9 app transforms a complex process into a few simple steps, from initial setup to successful compliance.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="flex aspect-square w-full max-w-xs items-center justify-center rounded-xl bg-primary/10 p-6 shadow-lg">
                      <svg className="h-full w-full object-contain text-primary" fill="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <rect fill="currentColor" className="text-primary/10" height="100" width="100" x="0" y="0"></rect>
                        <path d="M25 65C25 55.0517 33.0517 47 43 47H57C66.9483 47 75 55.0517 75 65V70H25V65Z" fill="#FFFFFF" stroke="currentColor" strokeWidth="3"></path>
                        <circle cx="50" cy="35" fill="#FFFFFF" r="12" stroke="currentColor" strokeWidth="3"></circle>
                        <path d="M40 80H60" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
                        <path d="M45 70V75" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
                        <path d="M55 70V75" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
                        <path d="M60 25L65 20" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path>
                        <path d="M40 25L35 20" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path>
                        <path d="M50 18L50 12" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path>
                        <ellipse cx="68" cy="45" fill="#CFD8DC" rx="8" ry="4"></ellipse>
                        <text fill="currentColor" className="text-primary" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" textAnchor="middle" x="68" y="47">?</text>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-foreground">1. Initial Need</h3>
                    <p className="text-base text-muted-foreground">You're facing the challenge of collecting W9 forms efficiently and securely.</p>
                  </div>
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="flex aspect-square w-full max-w-xs items-center justify-center rounded-xl bg-primary/10 p-6 shadow-lg">
                      <svg className="h-full w-full object-contain text-primary" fill="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <rect fill="currentColor" className="text-primary/10" height="100" width="100" x="0" y="0"></rect>
                        <rect fill="#FFFFFF" height="50" rx="5" stroke="currentColor" strokeWidth="3" width="60" x="20" y="25"></rect>
                        <rect fill="currentColor" className="text-primary" height="8" rx="2" width="40" x="30" y="35"></rect>
                        <rect fill="#CFD8DC" height="8" rx="2" width="30" x="30" y="48"></rect>
                        <rect fill="#CFD8DC" height="8" rx="2" width="35" x="30" y="61"></rect>
                        <path d="M65 50L78 50L72 60L78 70L65 70" fill="currentColor" stroke="#FFFFFF" strokeLinejoin="round" strokeWidth="2"></path>
                        <circle cx="50" cy="50" fill="currentColor" className="text-primary/10" r="15" stroke="currentColor" strokeWidth="2" transform="translate(25, 10)"></circle>
                        <path d="M70 38L73 41L78 36" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-foreground">2. Solution Engagement</h3>
                    <p className="text-base text-muted-foreground">Our app provides an intuitive platform to request, complete, and manage W9 forms.</p>
                  </div>
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="flex aspect-square w-full max-w-xs items-center justify-center rounded-xl bg-primary/10 p-6 shadow-lg">
                      <svg className="h-full w-full object-contain text-primary" fill="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <rect fill="currentColor" className="text-primary/10" height="100" width="100" x="0" y="0"></rect>
                        <path d="M25 75H75V40C75 31.7157 68.2843 25 60 25H40C31.7157 25 25 31.7157 25 40V75Z" fill="currentColor"></path>
                        <rect fill="#FFFFFF" height="30" rx="3" width="40" x="30" y="40"></rect>
                        <path d="M40 50L48 58L60 45" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                        <path d="M40 85L45 80L50 85L55 80L60 85" fill="none" stroke="#CFD8DC" strokeLinecap="round" strokeWidth="2"></path>
                        <circle cx="70" cy="30" fill="#FFFFFF" r="8" stroke="currentColor" strokeWidth="2"></circle>
                        <path d="M67 30L70 33L73 28" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-foreground">3. Successful Outcome</h3>
                    <p className="text-base text-muted-foreground">Enjoy streamlined compliance, organized data, and peace of mind.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section id="cta" className="bg-background py-20 md:py-28">
            <div className="container mx-auto px-6">
              <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
                <div className="aspect-square w-full rounded-xl bg-primary/10 p-4 sm:p-6 md:p-8 shadow-lg flex items-center justify-center">
                  <svg
                    className="h-full w-full object-contain text-primary"
                    viewBox="0 0 500 500"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect fill="currentColor" className="text-primary/10" height="500" width="500" x="0" y="0" />
                    <g transform="translate(50 50)">
                      <circle cx="100" cy="150" fill="currentColor" r="30" />
                      <rect fill="#FFFFFF" height="100" stroke="currentColor" strokeWidth="3" width="60" x="70" y="180" />
                      <line stroke="currentColor" strokeWidth="2" x1="80" x2="120" y1="200" y2="200" />
                      <line stroke="currentColor" strokeWidth="2" x1="80" x2="120" y1="220" y2="220" />
                      <circle cx="300" cy="150" fill="currentColor" r="30" />
                      <rect fill="#FFFFFF" height="100" stroke="currentColor" strokeWidth="3" width="60" x="270" y="180" />
                      <line stroke="currentColor" strokeWidth="2" x1="280" x2="320" y1="200" y2="200" />
                      <line stroke="currentColor" strokeWidth="2" x1="280" x2="320" y1="220" y2="220" />
                      <rect
                        fill="#FFFFFF"
                        height="60"
                        rx="5"
                        stroke="currentColor"
                        strokeWidth="3"
                        width="100"
                        x="150"
                        y="180"
                      />
                      <line stroke="#B0BEC5" strokeWidth="2" x1="160" x2="240" y1="195" y2="195" />
                      <line stroke="#B0BEC5" strokeWidth="2" x1="160" x2="220" y1="210" y2="210" />
                      <path
                        d="M135 190 L145 180 M135 190 L145 200 M135 190 H 150"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                      <path
                        d="M265 210 L255 200 M265 210 L255 220 M265 210 H 250"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                      <line stroke="currentColor" strokeDasharray="5,5" strokeWidth="2" x1="50" x2="80" y1="250" y2="250" />
                      <line
                        stroke="currentColor"
                        strokeDasharray="5,5"
                        strokeWidth="2"
                        x1="320"
                        x2="350"
                        y1="250"
                        y2="250"
                      />
                    </g>
                  </svg>
                </div>
                <div className="flex flex-col gap-6 text-center md:text-left">
                  <div className="flex flex-col gap-4">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-800 md:text-4xl">
                      Ready to Simplify Your <span className="text-primary">Form W9</span> Process?
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Sign up today and experience the benefits of our streamlined Form W9 app.
                    </p>
                  </div>
                  <Button size="lg" className="self-center md:self-start">
                    Get Started for Free
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t bg-muted/50">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
                <a
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  href="#"
                >
                  Terms of Service
                </a>
                <a
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  href="#"
                >
                  Privacy Policy
                </a>
                <a
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  href="#support"
                >
                  Contact Us
                </a>
              </div>
              <p className="text-sm text-muted-foreground">
                © 2024 Form W9 App. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
