"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Phone,
  Mail,
  MapPin,
  PawPrint,
  DollarSign,
  Calendar,
  Eye,
  Edit,
  MoreHorizontal,
  Heart,
  CreditCard,
  Banknote,
  Shield,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PetParent } from "@/types/pet-parents";

interface PetParentCardProps {
  petParent: PetParent;
  onViewDetails: (petParent: PetParent) => void;
}

export function PetParentCard({
  petParent,
  onViewDetails,
}: PetParentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "blocked":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPetStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-600";
      case "treatment":
        return "text-yellow-600";
      case "critical":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case "card":
        return <CreditCard className="w-4 h-4" />;
      case "cash":
        return <Banknote className="w-4 h-4" />;
      case "insurance":
        return <Shield className="w-4 h-4" />;
      default:
        return <CreditCard className="w-4 h-4" />;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-purple-500">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 ring-2 ring-purple-100">
              <AvatarImage
                src={petParent.profileImage}
                alt={`${petParent.firstName} ${petParent.lastName}`}
              />
              <AvatarFallback className="text-lg bg-purple-100 text-purple-700">
                {petParent.firstName[0]}
                {petParent.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {petParent.firstName} {petParent.lastName}
              </h3>
              <p className="text-sm text-gray-600">
                Pet Parent ID: #{petParent.id}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <PawPrint className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-600">
                  {petParent.pets.length} Pet
                  {petParent.pets.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(petParent.status)}>
              {petParent.status.charAt(0).toUpperCase() +
                petParent.status.slice(1)}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onViewDetails(petParent)}>
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Appointment
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Contact Information */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="w-4 h-4" />
            <span>{petParent.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail className="w-4 h-4" />
            <span>{petParent.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>
              {petParent.address.city}, {petParent.address.state}
            </span>
          </div>
        </div>

        {/* Pets Preview */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Pets</h4>
          <div className="space-y-2">
            {petParent.pets.slice(0, 2).map((pet) => (
              <div
                key={pet.id}
                className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={pet.profileImage} alt={pet.name} />
                  <AvatarFallback className="text-xs">
                    {pet.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{pet.name}</p>
                  <p className="text-xs text-gray-600">
                    {pet.breed} • {pet.age}y
                  </p>
                </div>
                <div
                  className={`w-2 h-2 rounded-full ${
                    pet.status === "healthy"
                      ? "bg-green-500"
                      : pet.status === "treatment"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                />
              </div>
            ))}
            {petParent.pets.length > 2 && (
              <p className="text-xs text-gray-500 text-center">
                +{petParent.pets.length - 2} more pet
                {petParent.pets.length - 2 !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-blue-600">
                {petParent.totalVisits}
              </p>
              <p className="text-xs text-gray-600">Total Visits</p>
            </div>
            <div>
              <p className="text-lg font-bold text-green-600">
                ${petParent.totalSpent.toLocaleString()}
              </p>
              <p className="text-xs text-gray-600">Total Spent</p>
            </div>
            <div className="flex items-center justify-center gap-1">
              {getPaymentIcon(petParent.paymentMethod)}
              <p className="text-xs text-gray-600 capitalize">
                {petParent.paymentMethod}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onViewDetails(petParent)}
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
          <Button
            size="sm"
            className="flex-1 bg-purple-600 hover:bg-purple-700"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
