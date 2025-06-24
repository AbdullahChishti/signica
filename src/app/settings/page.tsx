import Link from "next/link"
import Header from "@/components/Header"

export default function SettingsPage() {
  return (
    <div className="relative flex size-full min-h-screen flex-col overflow-x-hidden" style={{
      '--primary-color': '#4793ea',
      '--secondary-color': '#f0f2f4',
      '--text-primary': '#111418',
      '--text-secondary': '#637488',
      '--background-primary': '#ffffff',
      '--background-secondary': '#f9fafb',
    } as React.CSSProperties}>
      <div className="layout-container flex h-full grow flex-col">
        <Header />

        {/* Main Content */}
        <main className="px-6 sm:px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-8 bg-[var(--background-secondary)]">
          <div className="layout-content-container flex flex-col max-w-4xl w-full flex-1 bg-[var(--background-primary)] shadow-lg rounded-xl overflow-hidden">
            <div className="flex flex-wrap justify-between gap-3 p-6 border-b border-[var(--secondary-color)]">
              <h1 className="text-[var(--text-primary)] tracking-tight text-3xl font-bold leading-tight">Settings</h1>
            </div>
            
            {/* Personal Information Section */}
            <section className="px-6 pt-6 pb-2">
              <h3 className="text-[var(--text-primary)] text-xl font-semibold leading-tight tracking-[-0.015em] pb-3">Personal Information</h3>
              
              <SettingItem 
                icon={
                  <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                  </svg>
                }
                title="Name"
                description="Update your name as it appears on official documents."
              />
              
              <SettingItem 
                icon={
                  <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z"></path>
                  </svg>
                }
                title="Email"
                description="Change the email address associated with your account."
              />
              
              <SettingItem 
                icon={
                  <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Zm-68-56a12,12,0,1,1-12-12A12,12,0,0,1,140,152Z"></path>
                  </svg>
                }
                title="Password"
                description="Modify your current password for enhanced security."
              />
            </section>
            
            {/* Preferences Section */}
            <section className="px-6 pt-6 pb-2">
              <h3 className="text-[var(--text-primary)] text-xl font-semibold leading-tight tracking-[-0.015em] pb-3">Preferences</h3>
              
              <SettingItem 
                icon={
                  <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM101.63,168h52.74C149,186.34,140,202.87,128,215.89,116,202.87,107,186.34,101.63,168ZM98,152a145.72,145.72,0,0,1,0-48h60a145.72,145.72,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.79a161.79,161.79,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154.37,88H101.63C107,69.66,116,53.13,128,40.11,140,53.13,149,69.66,154.37,88Zm19.84,16h38.46a88.15,88.15,0,0,1,0,48H174.21a161.79,161.79,0,0,0,0-48Zm32.16-16H170.94a142.39,142.39,0,0,0-20.26-45A88.37,88.37,0,0,1,206.37,88ZM105.32,43A142.39,142.39,0,0,0,85.06,88H49.63A88.37,88.37,0,0,1,105.32,43ZM49.63,168H85.06a142.39,142.39,0,0,0,20.26,45A88.37,88.37,0,0,1,49.63,168Zm101.05,45a142.39,142.39,0,0,0,20.26-45h35.43A88.37,88.37,0,0,1,150.68,213Z"></path>
                  </svg>
                }
                title="Language"
                description="Choose your preferred language for the application interface."
              />
              
              <SettingItem 
                icon={
                  <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
                  </svg>
                }
                title="Notifications"
                description="Adjust notification settings for application updates and alerts."
              />
              
              <SettingItem 
                icon={
                  <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48ZM32,64H224V88H32Zm0,32H224v96H32Zm32,80a8,8,0,0,1,8-8h32a8,8,0,0,1,0,16H72A8,8,0,0,1,64,176Zm96,0a8,8,0,0,1,8-8h32a8,8,0,0,1,0,16H168A8,8,0,0,1,160,176Z"></path>
                  </svg>
                }
                title="Subscription"
                description="Manage your subscription plan and billing details."
              />
            </section>
            
            {/* Account Management Section */}
            <section className="px-6 pt-6 pb-6">
              <h3 className="text-[var(--text-primary)] text-xl font-semibold leading-tight tracking-[-0.015em] pb-3">Account Management</h3>
              
              <SettingItem 
                icon={
                  <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
                  </svg>
                }
                title="Delete Account"
                description="Permanently delete your account and all associated data."
                isDanger={true}
              />
            </section>
          </div>
        </main>
      </div>
    </div>
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
    <div className="flex items-center gap-4 bg-[var(--background-primary)] px-6 py-4 justify-between border-b border-[var(--secondary-color)] last:border-b-0">
      <div className="flex items-center gap-4">
        <div className={`${isDanger ? 'text-red-500 bg-red-100' : 'text-[var(--primary-color)] bg-blue-100'} flex items-center justify-center rounded-lg shrink-0 size-12`}>
          {icon}
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-[var(--text-primary)] text-base font-medium leading-normal line-clamp-1">
            {title}
          </p>
          <p className="text-[var(--text-secondary)] text-sm font-normal leading-normal line-clamp-2">
            {description}
          </p>
        </div>
      </div>
      <button className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 ${
        isDanger 
          ? 'bg-red-500 hover:bg-red-600' 
          : 'bg-[var(--primary-color)] hover:bg-blue-600'
      } text-white text-sm font-medium leading-normal w-fit transition-colors`}>
        <span className="truncate">{isDanger ? 'Delete' : 'Edit'}</span>
      </button>
    </div>
  )
}
