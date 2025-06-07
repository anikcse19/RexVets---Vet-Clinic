export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  gender: "male" | "female";
  weight: number;
  color: string;
  microchipId?: string;
  profileImage: string;
  medicalHistory: {
    vaccinations: string[];
    allergies: string[];
    medications: string[];
    lastVisit: string;
  };
  status: "healthy" | "treatment" | "critical";
}

export interface PetParent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImage: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  pets: Pet[];
  registrationDate: string;
  totalVisits: number;
  totalSpent: number;
  status: "active" | "inactive" | "blocked";
  preferredDoctor?: string;
  notes: string;
  paymentMethod: "cash" | "card" | "insurance";
}
