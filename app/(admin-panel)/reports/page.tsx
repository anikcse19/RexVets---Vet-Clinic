"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { PawPrint, User, Calendar, Heart, Star } from "lucide-react";
import { Bar, BarChart, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts"; // Use recharts or switch based on your setup

// Mock Data
const overviewStats = [
  { label: "Total Pets", value: 312, icon: <PawPrint className="w-5 h-5" /> },
  { label: "Total Doctors", value: 52, icon: <User className="w-5 h-5" /> },
  {
    label: "Appointments (Month)",
    value: 128,
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    label: "Total Donations",
    value: "$1,250",
    icon: <Heart className="w-5 h-5" />,
  },
  { label: "Total Reviews", value: 87, icon: <Star className="w-5 h-5" /> },
];

const donations = [
  { donor: "John Doe", amount: "$25", date: "2025-06-01", status: "Confirmed" },
  { donor: "Jane Smith", amount: "$40", date: "2025-06-03", status: "Pending" },
];

const petTypeData = [
  { name: "Dog", value: 160 },
  { name: "Cat", value: 95 },
  { name: "Rabbit", value: 25 },
  { name: "Bird", value: 15 },
];

const appointmentsPerDoctor = [
  { name: "Dr. Smith", appointments: 35 },
  { name: "Dr. Jenny", appointments: 28 },
  { name: "Dr. Lee", appointments: 21 },
];

export default function ReportsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {overviewStats.map((stat, i) => (
          <Card key={i} className="flex items-center justify-between p-4">
            <div>
              <CardTitle className="text-base font-medium">
                {stat.label}
              </CardTitle>
              <div className="text-2xl font-bold mt-1">{stat.value}</div>
            </div>
            <div className="text-muted-foreground">{stat.icon}</div>
          </Card>
        ))}
      </div>

      {/* Recent Donations */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Donations</CardTitle>
          <CardDescription>Track latest contributions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Donor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donations.map((donation, index) => (
                <TableRow key={index}>
                  <TableCell>{donation.donor}</TableCell>
                  <TableCell>{donation.amount}</TableCell>
                  <TableCell>{donation.date}</TableCell>
                  <TableCell>{donation.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Appointment Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Appointments Per Doctor</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart width={500} height={300} data={appointmentsPerDoctor}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="appointments" fill="#4f46e5" />
          </BarChart>
        </CardContent>
      </Card>

      {/* Pet Distribution Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Pet Type Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <PieChart width={400} height={300}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={petTypeData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#4f46e5"
              label
            />
            <Tooltip />
          </PieChart>
        </CardContent>
      </Card>
    </div>
  );
}
