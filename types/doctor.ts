export interface Doctor {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  qualification: string;
  experience: number;
  licenseNumber: string;
  profileImage: string;
  status: "active" | "pending" | "suspended";
  rating: number;
  totalPatients: number;
  joinedDate: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
  }[];
  fees: {
    consultation: number;
    followUp: number;
  };
  chamber: {
    name: string;
    address: string;
    phone: string;
  };
}
