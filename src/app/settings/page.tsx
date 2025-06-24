import Link from "next/link"
import { Settings, User, Mail, Lock, Globe, Bell, CreditCard, Trash2, Sparkles, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/Header"
import { RequireAuth } from "@/components/AuthGuard"

export default function SettingsPage() {
  return (
    <RequireAuth>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Header />

        {/* Main Content */}
        <main className="container mx-auto px-6 py-12 lg:px-8 max-w-4xl">
          
          {/* Page Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-blue-600/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Account Control</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Account
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block">
                Settings
              </span>
            </h1>
            
            <p className="text-xl text-gray-600/90 mb-12 max-w-xl mx-auto leading-relaxed font-medium">
              Manage your profile and preferences. <span className="text-gray-700">Stay in control.</span>
            </p>
          </div>

          <div className="space-y-8">
            
            {/* Personal Information Section */}
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
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-primary/20 to-blue-600/20 flex items-center justify-center mr-4">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
              </div>
              
              <div className="space-y-4">
                <SettingItem 
                  icon={<User className="w-5 h-5" />}
                  title="Name"
                  description="Official document name"
                />
                
                <SettingItem 
                  icon={<Mail className="w-5 h-5" />}
                  title="Email"
                  description="Account email address"
                />
                
                <SettingItem 
                  icon={<Lock className="w-5 h-5" />}
                  title="Password"
                  description="Enhanced security"
                />
              </div>
            </div>

            {/* Preferences Section */}
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
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center mr-4">
                  <Settings className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Preferences</h2>
              </div>
              
              <div className="space-y-4">
                <SettingItem 
                  icon={<Globe className="w-5 h-5" />}
                  title="Language"
                  description="Interface language"
                />
                
                <SettingItem 
                  icon={<Bell className="w-5 h-5" />}
                  title="Notifications"
                  description="Updates and alerts"
                />
                
                <SettingItem 
                  icon={<CreditCard className="w-5 h-5" />}
                  title="Subscription"
                  description="Plan and billing"
                />
              </div>
            </div>

            {/* Account Management Section */}
            <div 
              className="bg-white/90 backdrop-blur-sm border border-red-200/60 rounded-3xl p-8"
              style={{
                boxShadow: `
                  0 25px 50px -12px rgba(239, 68, 68, 0.15),
                  0 10px 20px -8px rgba(239, 68, 68, 0.1),
                  0 4px 15px -3px rgba(239, 68, 68, 0.05)
                `
              }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-red-100 to-pink-100 flex items-center justify-center mr-4">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Danger Zone</h2>
              </div>
              
              <div className="space-y-4">
                <SettingItem 
                  icon={<Trash2 className="w-5 h-5" />}
                  title="Delete Account"
                  description="Permanently remove account"
                  isDanger={true}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </RequireAuth>
  )
}

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isDanger?: boolean;
}

function SettingItem({ icon, title, description, isDanger = false }: SettingItemProps) {
  return (
    <div className="flex items-center justify-between p-6 bg-gray-50/50 backdrop-blur-sm rounded-2xl border border-gray-200/60 hover:bg-gray-100/50 transition-all duration-200 group">
      <div className="flex items-center space-x-4">
        <div 
          className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
            isDanger 
              ? 'bg-red-100 text-red-600' 
              : 'bg-primary/10 text-primary'
          } group-hover:scale-110 transition-transform duration-200`}
          style={isDanger ? {
            boxShadow: `0 4px 10px -2px rgba(239, 68, 68, 0.1)`
          } : {
            boxShadow: `0 4px 10px -2px rgba(99, 102, 241, 0.1)`
          }}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {title}
          </h3>
          <p className="text-gray-600/90 font-medium">
            {description}
          </p>
        </div>
      </div>
      
      <Button
        size="sm"
        variant={isDanger ? "outline" : "outline"}
        className={`${
          isDanger
            ? 'border-red-300 text-red-700 hover:border-red-500 hover:text-red-800 hover:bg-red-50'
            : 'border-primary/30 text-primary hover:border-primary hover:text-primary hover:bg-primary/5'
        } rounded-xl transition-all duration-200 px-6 py-2`}
      >
        <Edit className="w-4 h-4 mr-2" />
        {isDanger ? 'Delete' : 'Edit'}
      </Button>
    </div>
  )
}
