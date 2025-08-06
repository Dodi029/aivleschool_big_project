import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Bell, 
  Settings, 
  Calendar,
  Clock
} from 'lucide-react';

export function Header() {
  const currentTime = new Date().toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit'
  });

  const notifications = [
    { type: 'warning', count: 3 },
    { type: 'info', count: 2 }
  ];

  const totalNotifications = notifications.reduce((sum, n) => sum + n.count, 0);

  return (
    <header className="bg-white border-b border-border shadow-soft px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Current time and date */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{currentTime}</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">오늘의 급식 운영</span>
          </div>
        </div>

        {/* Right side - User info and notifications */}
        <div className="flex items-center gap-3">
          {/* Quick stats */}
          <div className="hidden lg:flex items-center gap-4 mr-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-success">145명</div>
              <div className="text-xs text-muted-foreground">오늘 식수</div>
            </div>
            <div className="w-px h-8 bg-border"></div>
            <div className="text-center">
              <div className="text-lg font-semibold text-primary">92%</div>
              <div className="text-xs text-muted-foreground">참여율</div>
            </div>
          </div>

          {/* Notifications */}
          <Button variant="outline" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            {totalNotifications > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {totalNotifications}
              </Badge>
            )}
          </Button>

          {/* Settings */}
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4" />
          </Button>

          {/* User avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-border">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground">관리</AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <div className="text-sm font-medium">급식 관리자</div>
              <div className="text-xs text-muted-foreground">현장 운영팀</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}