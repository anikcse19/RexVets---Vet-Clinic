"use client";

import { Doctor } from "@/types/doctor";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Star,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Users,
  DollarSign,
  Building,
  Award,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DoctorDetailsModalProps {
  doctor: Doctor | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DoctorDetailsModal({
  doctor,
  open,
  onOpenChange,
}: DoctorDetailsModalProps) {
  if (!doctor) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "suspended":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Doctor Details</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 dark:bg-slate-800">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <Avatar className="w-32 h-32 mx-auto">
                    <AvatarImage src={doctor.profileImage} alt={doctor.name} />
                    <AvatarFallback className="text-2xl">
                      {doctor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-bold">{doctor.name}</h3>
                    <p className="text-gray-600">{doctor.qualification}</p>
                    <p className="text-blue-600 font-medium">
                      {doctor.specialization}
                    </p>
                  </div>
                  <Badge className={getStatusColor(doctor.status)}>
                    {doctor.status.charAt(0).toUpperCase() +
                      doctor.status.slice(1)}
                  </Badge>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <div>
                      <p className="font-semibold">{doctor.rating}/5.0</p>
                      <p className="text-sm text-gray-600">
                        {doctor.totalPatients} patients
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-semibold">{doctor.experience} Years</p>
                      <p className="text-sm text-gray-600">Experience</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-semibold">{doctor.licenseNumber}</p>
                      <p className="text-sm text-gray-600">License Number</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>{doctor.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>{doctor.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>
                    {doctor.address.street}, {doctor.address.city},{" "}
                    {doctor.address.state} {doctor.address.zipCode}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Chamber Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Chamber Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-semibold">{doctor.chamber.name}</p>
                  <p className="text-gray-600">{doctor.chamber.address}</p>
                  <p className="text-gray-600">{doctor.chamber.phone}</p>
                </div>
              </CardContent>
            </Card>

            {/* Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Weekly Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  {doctor.schedule.map((schedule) => (
                    <div
                      key={schedule.day}
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <span className="font-medium">{schedule.day}</span>
                      {schedule.isAvailable ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <Clock className="w-4 h-4" />
                          <span>
                            {schedule.startTime} - {schedule.endTime}
                          </span>
                        </div>
                      ) : (
                        <span className="text-red-600">Unavailable</span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Fees */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Consultation Fees
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      Initial Consultation
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      ${doctor.fees.consultation}
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Follow-up Visit</p>
                    <p className="text-2xl font-bold text-green-600">
                      ${doctor.fees.followUp}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
