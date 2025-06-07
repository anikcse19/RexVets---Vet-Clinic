"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  User,
  PawPrint,
  Heart,
  Shield,
  CreditCard,
  Banknote,
  FileText,
  Stethoscope,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PetParent } from "@/types/pet-parents";

interface PetParentDetailsModalProps {
  petParent: PetParent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PetParentDetailsModal({
  petParent,
  open,
  onOpenChange,
}: PetParentDetailsModalProps) {
  if (!petParent) return null;

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
        return "bg-green-100 text-green-800";
      case "treatment":
        return "bg-yellow-100 text-yellow-800";
      case "critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case "card":
        return <CreditCard className="w-5 h-5" />;
      case "cash":
        return <Banknote className="w-5 h-5" />;
      case "insurance":
        return <Shield className="w-5 h-5" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Pet Parent Details</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <Avatar className="w-32 h-32 mx-auto ring-4 ring-purple-100">
                    <AvatarImage
                      src={petParent.profileImage}
                      alt={`${petParent.firstName} ${petParent.lastName}`}
                    />
                    <AvatarFallback className="text-2xl bg-purple-100 text-purple-700">
                      {petParent.firstName[0]}
                      {petParent.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-bold">
                      {petParent.firstName} {petParent.lastName}
                    </h3>
                    <p className="text-gray-600">
                      Pet Parent ID: #{petParent.id}
                    </p>
                  </div>
                  <Badge className={getStatusColor(petParent.status)}>
                    {petParent.status.charAt(0).toUpperCase() +
                      petParent.status.slice(1)}
                  </Badge>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <PawPrint className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-semibold">
                        {petParent.pets.length} Pets
                      </p>
                      <p className="text-sm text-gray-600">Registered</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-semibold">{petParent.totalVisits}</p>
                      <p className="text-sm text-gray-600">Total Visits</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-semibold">
                        ${petParent.totalSpent.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">Total Spent</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getPaymentIcon(petParent.paymentMethod)}
                    <div>
                      <p className="font-semibold capitalize">
                        {petParent.paymentMethod}
                      </p>
                      <p className="text-sm text-gray-600">Payment Method</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="contact" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="pets">Pets</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>

              <TabsContent value="contact" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span>{petParent.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span>{petParent.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>
                          Registered:{" "}
                          {new Date(
                            petParent.registrationDate
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Address
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{petParent.address.street}</p>
                      <p>
                        {petParent.address.city}, {petParent.address.state}{" "}
                        {petParent.address.zipCode}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      Emergency Contact
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>
                      <strong>Name:</strong> {petParent.emergencyContact.name}
                    </p>
                    <p>
                      <strong>Phone:</strong> {petParent.emergencyContact.phone}
                    </p>
                    <p>
                      <strong>Relationship:</strong>{" "}
                      {petParent.emergencyContact.relationship}
                    </p>
                  </CardContent>
                </Card>

                {petParent.preferredDoctor && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Stethoscope className="w-5 h-5" />
                        Preferred Doctor
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{petParent.preferredDoctor}</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="pets" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {petParent.pets.map((pet) => (
                    <Card key={pet.id} className="border-l-4 border-l-blue-500">
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage
                              src={pet.profileImage}
                              alt={pet.name}
                            />
                            <AvatarFallback>{pet.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold">
                              {pet.name}
                            </h3>
                            <p className="text-gray-600">{pet.breed}</p>
                            <Badge className={getPetStatusColor(pet.status)}>
                              {pet.status}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Species</p>
                            <p className="font-medium">{pet.species}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Age</p>
                            <p className="font-medium">{pet.age} years</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Weight</p>
                            <p className="font-medium">{pet.weight} kg</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Gender</p>
                            <p className="font-medium capitalize">
                              {pet.gender}
                            </p>
                          </div>
                        </div>
                        {pet.microchipId && (
                          <div>
                            <p className="text-gray-600 text-sm">
                              Microchip ID
                            </p>
                            <p className="font-medium text-sm">
                              {pet.microchipId}
                            </p>
                          </div>
                        )}
                        <div>
                          <p className="text-gray-600 text-sm">Last Visit</p>
                          <p className="font-medium text-sm">
                            {new Date(
                              pet.medicalHistory.lastVisit
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Visit History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">
                            {petParent.totalVisits}
                          </p>
                          <p className="text-sm text-gray-600">Total Visits</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">
                            ${petParent.totalSpent.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600">Total Spent</p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg">
                          <p className="text-2xl font-bold text-purple-600">
                            $
                            {(
                              petParent.totalSpent / petParent.totalVisits
                            ).toFixed(0)}
                          </p>
                          <p className="text-sm text-gray-600">Avg per Visit</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Medical Summary by Pet</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {petParent.pets.map((pet) => (
                        <div key={pet.id} className="border rounded-lg p-4">
                          <h4 className="font-semibold mb-3">{pet.name}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="font-medium text-gray-700">
                                Vaccinations
                              </p>
                              <ul className="list-disc list-inside text-gray-600">
                                {pet.medicalHistory.vaccinations.map(
                                  (vac, index) => (
                                    <li key={index}>{vac}</li>
                                  )
                                )}
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-gray-700">
                                Allergies
                              </p>
                              {pet.medicalHistory.allergies.length > 0 ? (
                                <ul className="list-disc list-inside text-gray-600">
                                  {pet.medicalHistory.allergies.map(
                                    (allergy, index) => (
                                      <li key={index}>{allergy}</li>
                                    )
                                  )}
                                </ul>
                              ) : (
                                <p className="text-gray-600">None reported</p>
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-700">
                                Current Medications
                              </p>
                              {pet.medicalHistory.medications.length > 0 ? (
                                <ul className="list-disc list-inside text-gray-600">
                                  {pet.medicalHistory.medications.map(
                                    (med, index) => (
                                      <li key={index}>{med}</li>
                                    )
                                  )}
                                </ul>
                              ) : (
                                <p className="text-gray-600">None</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notes" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Administrative Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{petParent.notes}</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
