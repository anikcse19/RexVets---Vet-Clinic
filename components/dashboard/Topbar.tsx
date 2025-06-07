"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  Search,
  Menu,
  Settings,
  User,
  LogOut,
  Calendar,
  Sun,
  Moon,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";

interface TopbarProps {
  onMenuClick: () => void;
}

const Topbar = ({ onMenuClick }: TopbarProps) => {
  const [notifications] = useState([
    {
      id: 1,
      title: "New appointment scheduled",
      message: "Dr. Smith has a new appointment at 3:00 PM",
      time: "5 min ago",
      type: "appointment",
      unread: true,
    },
    {
      id: 2,
      title: "Patient review received",
      message: "Sarah Johnson left a 5-star review",
      time: "15 min ago",
      type: "review",
      unread: true,
    },
    {
      id: 3,
      title: "Emergency case",
      message: "Priority patient in waiting room",
      time: "30 min ago",
      type: "emergency",
      unread: false,
    },
  ]);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  console.log("theme", theme, mounted);
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 dark:bg-slate-800 dark:border-blue-900 transition-colors">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-blue-700 dark:text-blue-100"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-blue-200 h-4 w-4" />
            <Input
              placeholder="Search patients, doctors, appointments..."
              className="pl-10 w-80 bg-gray-50 border-gray-200 focus:bg-white dark:bg-slate-900 dark:border-slate-800 dark:text-blue-100"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="sm"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-blue-700 dark:text-blue-100"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          )}
          {/* Quick Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="text-sm border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-100 dark:hover:bg-blue-900"
            >
              <Calendar className="w-4 h-4 mr-1" />
              Schedule
            </Button>
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src="https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg"
                    alt="Dr. Admin"
                  />
                  <AvatarFallback>DA</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Dr. Admin</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    admin@medicare.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
