import { 
  LayoutDashboard, 
  CalendarDays, 
  Package, 
  Users, 
  MessageSquare,
  ChefHat,
  Home
} from 'lucide-react';

interface SidebarProps {
  activeMenu: string;
  onMenuChange: (menu: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: '대시보드', icon: LayoutDashboard, color: 'text-primary' },
  { id: 'menu', label: '식단표', icon: CalendarDays, color: 'text-success' },
  { id: 'ingredients', label: '식자재', icon: Package, color: 'text-warning' },
  { id: 'staff', label: '인사관리', icon: Users, color: 'text-info' },
  { id: 'feedback', label: '피드백', icon: MessageSquare, color: 'text-purple-500' },
];

export function Sidebar({ activeMenu, onMenuChange }: SidebarProps) {
  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border shadow-card">
      {/* Logo and title */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
            <ChefHat className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-sidebar-foreground">아워홈 급식</h1>
            <p className="text-xs text-muted-foreground">운영 관리 시스템</p>
          </div>
        </div>
      </div>
      
      {/* Navigation menu */}
      <nav className="p-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onMenuChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-soft scale-[1.02]'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:scale-[1.01]'
                }`}
              >
                <Icon 
                  size={20} 
                  className={`transition-colors ${
                    isActive ? 'text-primary' : `${item.color} group-hover:text-primary`
                  }`}
                />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border bg-sidebar">
        <div className="bg-gradient-to-r from-primary/10 to-success/10 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Home className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">현장 정보</span>
          </div>
          <div className="text-xs text-muted-foreground">
            <div>서울 본사 구내식당</div>
            <div>운영시간: 11:30-13:30, 17:30-19:30</div>
          </div>
        </div>
      </div>
    </div>
  );
}