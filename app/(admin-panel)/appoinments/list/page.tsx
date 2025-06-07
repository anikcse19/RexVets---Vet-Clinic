"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Search,
  Filter,
  Calendar as CalendarIcon,
  Clock,
  MoreHorizontal,
  Plus,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  User,
  Stethoscope,
} from "lucide-react";
import { format } from "date-fns";

interface Appointment {
  id: string;
  patientName: string;
  patientAvatar?: string;
  doctorName: string;
  doctorSpecialty: string;
  appointmentType: string;
  date: string;
  time: string;
  duration: number;
  status:
    | "scheduled"
    | "confirmed"
    | "in-progress"
    | "completed"
    | "cancelled"
    | "no-show";
  priority: "low" | "medium" | "high" | "urgent";
  contactNumber: string;
  email: string;
  reason: string;
  notes?: string;
}

const AppointmentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [doctorFilter, setDoctorFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sample appointments data
  const appointments: Appointment[] = [
    {
      id: "APT-001",
      patientName: "Sarah Johnson",
      patientAvatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      doctorName: "Dr. Michael Smith",
      doctorSpecialty: "Cardiology",
      appointmentType: "Consultation",
      date: "2024-01-15",
      time: "09:00",
      duration: 30,
      status: "confirmed",
      priority: "medium",
      contactNumber: "+1 (555) 123-4567",
      email: "sarah.johnson@email.com",
      reason: "Chest pain evaluation",
      notes: "Patient reports intermittent chest pain",
    },
    {
      id: "APT-002",
      patientName: "James Wilson",
      doctorName: "Dr. Emily Brown",
      doctorSpecialty: "Dermatology",
      appointmentType: "Follow-up",
      date: "2024-01-15",
      time: "10:30",
      duration: 20,
      status: "in-progress",
      priority: "low",
      contactNumber: "+1 (555) 234-5678",
      email: "james.wilson@email.com",
      reason: "Skin condition follow-up",
    },
    {
      id: "APT-003",
      patientName: "Emma Davis",
      patientAvatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
      doctorName: "Dr. Robert Taylor",
      doctorSpecialty: "Orthopedics",
      appointmentType: "Emergency",
      date: "2024-01-15",
      time: "11:00",
      duration: 45,
      status: "scheduled",
      priority: "urgent",
      contactNumber: "+1 (555) 345-6789",
      email: "emma.davis@email.com",
      reason: "Knee injury from sports",
      notes: "Urgent - sports injury",
    },
    {
      id: "APT-004",
      patientName: "Michael Chen",
      doctorName: "Dr. Lisa Anderson",
      doctorSpecialty: "Internal Medicine",
      appointmentType: "Consultation",
      date: "2024-01-15",
      time: "14:00",
      duration: 30,
      status: "completed",
      priority: "medium",
      contactNumber: "+1 (555) 456-7890",
      email: "michael.chen@email.com",
      reason: "Annual health checkup",
    },
    {
      id: "APT-005",
      patientName: "Anna Rodriguez",
      patientAvatar:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
      doctorName: "Dr. David Williams",
      doctorSpecialty: "Pediatrics",
      appointmentType: "Vaccination",
      date: "2024-01-16",
      time: "09:30",
      duration: 15,
      status: "scheduled",
      priority: "low",
      contactNumber: "+1 (555) 567-8901",
      email: "anna.rodriguez@email.com",
      reason: "Child vaccination",
    },
    {
      id: "APT-006",
      patientName: "Robert Thompson",
      doctorName: "Dr. Sarah Martinez",
      doctorSpecialty: "Neurology",
      appointmentType: "Consultation",
      date: "2024-01-16",
      time: "11:15",
      duration: 60,
      status: "cancelled",
      priority: "high",
      contactNumber: "+1 (555) 678-9012",
      email: "robert.thompson@email.com",
      reason: "Headache evaluation",
      notes: "Patient cancelled due to emergency",
    },
  ];

  // Filter appointments based on search and filters
  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const matchesSearch =
        appointment.patientName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        appointment.doctorName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        appointment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.reason.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || appointment.status === statusFilter;
      const matchesType =
        typeFilter === "all" || appointment.appointmentType === typeFilter;
      const matchesDoctor =
        doctorFilter === "all" || appointment.doctorName === doctorFilter;
      const matchesPriority =
        priorityFilter === "all" || appointment.priority === priorityFilter;
      const matchesDate =
        !dateFilter || appointment.date === format(dateFilter, "yyyy-MM-dd");

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesDoctor &&
        matchesPriority &&
        matchesDate
      );
    });
  }, [
    searchTerm,
    statusFilter,
    typeFilter,
    doctorFilter,
    priorityFilter,
    dateFilter,
    appointments,
  ]);

  const getStatusBadge = (status: string) => {
    const variants = {
      scheduled: "default",
      confirmed: "secondary",
      "in-progress": "destructive",
      completed: "default",
      cancelled: "outline",
      "no-show": "destructive",
    } as const;

    const colors = {
      scheduled: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      confirmed: "bg-green-100 text-green-800 hover:bg-green-200",
      "in-progress": "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      completed: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
      cancelled: "bg-red-100 text-red-800 hover:bg-red-200",
      "no-show": "bg-gray-100 text-gray-800 hover:bg-gray-200",
    };

    return (
      <Badge className={colors[status as keyof typeof colors]}>
        {status.replace("-", " ")}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      low: "bg-gray-100 text-gray-600",
      medium: "bg-blue-100 text-blue-600",
      high: "bg-orange-100 text-orange-600",
      urgent: "bg-red-100 text-red-600",
    };

    return (
      <Badge
        variant="outline"
        className={colors[priority as keyof typeof colors]}
      >
        {priority}
      </Badge>
    );
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setTypeFilter("all");
    setDoctorFilter("all");
    setPriorityFilter("all");
    setDateFilter(undefined);
  };

  const uniqueDoctors = Array.from(
    new Set(appointments.map((apt) => apt.doctorName))
  );
  const uniqueTypes = Array.from(
    new Set(appointments.map((apt) => apt.appointmentType))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600 mt-1">
            Manage and track all patient appointments
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Appointment
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Today</p>
                <p className="text-2xl font-bold">
                  {
                    appointments.filter((apt) => apt.date === "2024-01-15")
                      .length
                  }
                </p>
              </div>
              <CalendarIcon className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-green-600">
                  {
                    appointments.filter((apt) => apt.status === "confirmed")
                      .length
                  }
                </p>
              </div>
              <User className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {
                    appointments.filter((apt) => apt.status === "in-progress")
                      .length
                  }
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {
                    appointments.filter((apt) => apt.status === "completed")
                      .length
                  }
                </p>
              </div>
              <Stethoscope className="w-8 h-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters & Search
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search patients, doctors, or appointment ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="no-show">No Show</SelectItem>
              </SelectContent>
            </Select>

            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {uniqueTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Doctor Filter */}
            <Select value={doctorFilter} onValueChange={setDoctorFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Doctor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Doctors</SelectItem>
                {uniqueDoctors.map((doctor) => (
                  <SelectItem key={doctor} value={doctor}>
                    {doctor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Priority Filter */}
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>

            {/* Date Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFilter
                    ? format(dateFilter, "MMM dd, yyyy")
                    : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateFilter}
                  onSelect={setDateFilter}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Appointments Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Appointments List</CardTitle>
              <CardDescription>
                Showing {filteredAppointments.length} of {appointments.length}{" "}
                appointments
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={appointment.patientAvatar}
                            alt={appointment.patientName}
                          />
                          <AvatarFallback>
                            {appointment.patientName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">
                            {appointment.patientName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {appointment.id}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">
                          {appointment.doctorName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {appointment.doctorSpecialty}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">
                          {format(new Date(appointment.date), "MMM dd, yyyy")}
                        </p>
                        <p className="text-sm text-gray-500">
                          {appointment.time} ({appointment.duration}min)
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {appointment.appointmentType}
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                    <TableCell>
                      {getPriorityBadge(appointment.priority)}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-3 h-3 mr-1" />
                          {appointment.contactNumber}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="w-3 h-3 mr-1" />
                          {appointment.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="text-sm text-gray-900 truncate">
                          {appointment.reason}
                        </p>
                        {appointment.notes && (
                          <p className="text-xs text-gray-500 truncate">
                            {appointment.notes}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Appointment
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Cancel Appointment
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredAppointments.length === 0 && (
            <div className="text-center py-12">
              <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No appointments found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentsPage;
