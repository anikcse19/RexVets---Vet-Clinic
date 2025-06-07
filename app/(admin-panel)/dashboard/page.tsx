"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  Users,
  Calendar,
  DollarSign,
  Activity,
  TrendingUp,
  TrendingDown,
  Clock,
  Star,
  Heart,
  Stethoscope,
} from "lucide-react";

const Dashboard = () => {
  // Sample data for charts
  const monthlyRevenue = [
    { month: "Jan", revenue: 45000, patients: 280 },
    { month: "Feb", revenue: 52000, patients: 320 },
    { month: "Mar", revenue: 48000, patients: 295 },
    { month: "Apr", revenue: 61000, patients: 380 },
    { month: "May", revenue: 55000, patients: 340 },
    { month: "Jun", revenue: 67000, patients: 420 },
  ];

  const appointmentTypes = [
    { name: "General Consultation", value: 35, color: "#3B82F6" },
    { name: "Specialist", value: 25, color: "#10B981" },
    { name: "Emergency", value: 15, color: "#F59E0B" },
    { name: "Follow-up", value: 25, color: "#8B5CF6" },
  ];

  const weeklyAppointments = [
    { day: "Mon", appointments: 45, completed: 42 },
    { day: "Tue", appointments: 52, completed: 48 },
    { day: "Wed", appointments: 38, completed: 35 },
    { day: "Thu", appointments: 61, completed: 58 },
    { day: "Fri", appointments: 55, completed: 52 },
    { day: "Sat", appointments: 28, completed: 26 },
    { day: "Sun", appointments: 15, completed: 14 },
  ];

  const patientFlow = [
    { time: "9AM", patients: 12 },
    { time: "10AM", patients: 19 },
    { time: "11AM", patients: 25 },
    { time: "12PM", patients: 22 },
    { time: "1PM", patients: 15 },
    { time: "2PM", patients: 28 },
    { time: "3PM", patients: 32 },
    { time: "4PM", patients: 24 },
    { time: "5PM", patients: 18 },
  ];

  const stats = [
    {
      title: "Total Patients",
      value: "2,847",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Appointments Today",
      value: "127",
      change: "+8%",
      trend: "up",
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Monthly Revenue",
      value: "$67,420",
      change: "+15%",
      trend: "up",
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Patient Satisfaction",
      value: "4.8/5",
      change: "+2%",
      trend: "up",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "appointment",
      patient: "Sarah Johnson",
      doctor: "Dr. Smith",
      time: "2 minutes ago",
      status: "completed",
    },
    {
      id: 2,
      type: "emergency",
      patient: "Mike Chen",
      doctor: "Dr. Williams",
      time: "15 minutes ago",
      status: "in-progress",
    },
    {
      id: 3,
      type: "consultation",
      patient: "Emma Davis",
      doctor: "Dr. Brown",
      time: "32 minutes ago",
      status: "scheduled",
    },
    {
      id: 4,
      type: "follow-up",
      patient: "James Wilson",
      doctor: "Dr. Taylor",
      time: "1 hour ago",
      status: "completed",
    },
  ];

  return (
    <div className="space-y-6 ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-yellow-100">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-1 dark:text-blue-100">
            Welcome back! Here&aps;s what&aps;s happening at your clinic today.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="px-3 py-1">
            <Activity className="w-4 h-4 mr-1" />
            Live Updates
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <CardContent className="p-6 dark:bg-[#293549]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stat.value}
                    </p>
                    <div className="flex items-center mt-2">
                      {stat.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          stat.trend === "up"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">
                        vs last month
                      </span>
                    </div>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="border-0 shadow-sm dark:bg-[#293549]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Revenue & Patient Trends
            </CardTitle>
            <CardDescription>Monthly performance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  fill="#93C5FD"
                  fillOpacity={0.3}
                />
                <Bar dataKey="patients" fill="#10B981" opacity={0.7} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Appointment Types */}
        <Card className="border-0 shadow-sm dark:bg-[#293549]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-blue-600" />
              Appointment Distribution
            </CardTitle>
            <CardDescription>Types of appointments this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row items-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={appointmentTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {appointmentTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3 lg:ml-4">
                {appointmentTypes.map((type, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: type.color }}
                    />
                    <span className="text-sm text-gray-600">{type.name}</span>
                    <span className="text-sm font-medium">{type.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Appointments */}
        <Card className="lg:col-span-2 border-0 shadow-sm dark:bg-[#293549]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              Weekly Appointments
            </CardTitle>
            <CardDescription>
              Scheduled vs completed appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyAppointments}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar
                  dataKey="appointments"
                  fill="#8B5CF6"
                  radius={[4, 4, 0, 0]}
                />
                <Bar dataKey="completed" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="border-0 shadow-sm dark:bg-[#293549]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-orange-600" />
              Recent Activities
            </CardTitle>
            <CardDescription>Latest clinic activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.status === "completed"
                        ? "bg-green-500"
                        : activity.status === "in-progress"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.patient}
                    </p>
                    <p className="text-xs text-gray-500">
                      with {activity.doctor}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">{activity.time}</p>
                    <Badge
                      variant={
                        activity.status === "completed"
                          ? "default"
                          : activity.status === "in-progress"
                          ? "destructive"
                          : "secondary"
                      }
                      className="text-xs"
                    >
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patient Flow Chart */}
      <Card className="border-0 shadow-sm dark:bg-[#293549]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-600" />
            Daily Patient Flow
          </CardTitle>
          <CardDescription>Patient visits throughout the day</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={patientFlow}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="patients"
                stroke="#EF4444"
                strokeWidth={3}
                dot={{ fill: "#EF4444", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#EF4444", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
