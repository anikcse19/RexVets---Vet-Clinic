"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  LayoutDashboard,
  Calendar,
  Users,
  UserCheck,
  CreditCard,
  FileText,
  Star,
  Settings,
  ChevronDown,
  ChevronRight,
  Stethoscope,
  UserPlus,
  ClipboardList,
  TrendingUp,
  MessageSquare,
  X,
  Building2,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>(["doctors"]);

  const toggleExpanded = (item: string) => {
    setExpandedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      title: "Appointments",
      icon: Calendar,
      href: "/dashboard/appointments",
      children: [
        { title: "All Appointments", href: "/appoinments/list" },
        { title: "Schedule", href: "/dashboard/appointments/schedule" },
        { title: "Pending", href: "/dashboard/appointments/pending" },
      ],
    },
    {
      title: "Doctors",
      icon: Stethoscope,
      href: "/dashboard/doctors",
      children: [
        { title: "All Doctors", href: "/doctors/list" },
        { title: "Specialties", href: "/dashboard/doctors/specialties" },
        { title: "Add Doctor", href: "/dashboard/doctors/add" },
        {
          title: "Management",
          children: [
            { title: "Schedules", href: "/dashboard/doctors/schedules" },
            { title: "Performance", href: "/dashboard/doctors/performance" },
          ],
        },
      ],
    },
    {
      title: "Parents",
      icon: Users,
      href: "/dashboard/patients",
      children: [
        { title: "All Parents", href: "/pet-parents/list" },
        { title: "Medical Records", href: "/dashboard/patients/records" },
        { title: "Add Parents", href: "/dashboard/patients/add" },
      ],
    },
    // {
    //   title: "Staff",
    //   icon: UserCheck,
    //   href: "/dashboard/staff",
    //   children: [
    //     { title: "All Staff", href: "/dashboard/staff/all" },
    //     { title: "Nurses", href: "/dashboard/staff/nurses" },
    //     { title: "Support Staff", href: "/dashboard/staff/support" },
    //   ],
    // },
    {
      title: "Donations",
      icon: CreditCard,
      href: "/donations",
      // children: [
      //   { title: "All Transactions", href: "/dashboard/transactions/all" },
      //   { title: "Payments", href: "/dashboard/transactions/payments" },
      //   { title: "Insurance", href: "/dashboard/transactions/insurance" },
      // ],
    },
    // {
    //   title: "Reports",
    //   icon: FileText,
    //   href: "/reports",
    //   // children: [
    //   //   { title: "Financial Reports", href: "/dashboard/reports/financial" },
    //   //   { title: "Patient Reports", href: "/dashboard/reports/patients" },
    //   //   { title: "Analytics", href: "/dashboard/reports/analytics" },
    //   // ],
    // },
    {
      title: "Reviews",
      icon: Star,
      href: "/reviews",
      // children: [
      //   { title: "Patient Reviews", href: "/dashboard/reviews/patients" },
      //   { title: "Doctor Reviews", href: "/dashboard/reviews/doctors" },
      //   { title: "Feedback", href: "/dashboard/reviews/feedback" },
      // ],
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      children: [
        { title: "Moderator", href: "/settings/moderator" },
        // { title: "General", href: "/dashboard/settings/general" },
        // { title: "Notifications", href: "/dashboard/settings/notifications" },
        // { title: "Security", href: "/dashboard/settings/security" },
      ],
    },
  ];

  const renderMenuItem = (item: any, level = 0) => {
    const isActive = pathname === item.href;
    const isExpanded = expandedItems.includes(item.title.toLowerCase());
    const hasChildren = item.children && item.children.length > 0;
    const Icon = item.icon;

    if (hasChildren) {
      return (
        <Collapsible
          key={item.title}
          open={isExpanded}
          onOpenChange={() => toggleExpanded(item.title.toLowerCase())}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-left font-normal hover:bg-blue-50 hover:text-blue-700 transition-colors",
                level === 0 ? "px-3 py-2 mb-1" : "px-6 py-1.5 text-sm",
                level === 1 ? "ml-4" : "",
                isActive && "bg-blue-100 text-blue-700 font-medium"
              )}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  {Icon && level === 0 && <Icon className="h-4 w-4 mr-3" />}
                  <span>{item.title}</span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1">
            {item.children.map((child: any) =>
              renderMenuItem(child, level + 1)
            )}
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <Link key={item.href} href={item.href} onClick={onClose}>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-left font-normal hover:bg-blue-50 hover:text-blue-700 transition-colors",
            level === 0 ? "px-3 py-2 mb-1" : "px-6 py-1.5 text-sm",
            level === 1 ? "ml-4" : "",
            level === 2 ? "ml-8" : "",
            isActive && "bg-blue-100 text-blue-700 font-medium"
          )}
        >
          {Icon && level === 0 && <Icon className="h-4 w-4 mr-3" />}
          <span>{item.title}</span>
        </Button>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full w-64 bg-blue-900 dark:bg-slate-800 text-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out flex flex-col justify-between",
          "lg:translate-x-0 lg:static lg:inset-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-blue-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-blue-200">REXVETS</h2>
              <p className="text-xs text-blue-500">Petcare Dashboard</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {menuItems.map((item) => renderMenuItem(item))}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-blue-200 bg-blue-900/80 dark:bg-slate-800">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-700  hover:bg-blue-800 text-white font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
          <p className="text-xs text-blue-100 text-center mt-3">
            © {new Date().getFullYear()} RexVets. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
