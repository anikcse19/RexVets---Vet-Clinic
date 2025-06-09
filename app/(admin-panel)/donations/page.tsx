"use client";
import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const mockDonations = [
  {
    id: 1,
    donor: "John Doe",
    email: "john@example.com",
    phone: "+880123456789",
    doctor: "Dr. Smith",
    amount: 20,
    date: "2025-06-08",
    status: "confirmed",
    message: "Hope this helps animals in need.",
    adminNote: "Confirmed manually.",
  },
  {
    id: 2,
    donor: "Jane Roe",
    email: "jane@pets.com",
    phone: "+880987654321",
    doctor: "Dr. Jenny",
    amount: 15,
    date: "2025-06-07",
    status: "pending",
    message: "Bless the pets!",
    adminNote: "Waiting for payment confirmation.",
  },
];

export default function DonationPage() {
  const [filters, setFilters] = useState({
    donor: "",
    doctor: "",
    status: "",
  });
  const [selectedDonation, setSelectedDonation] = useState<any>(null);
  const [donations, setDonations] = useState(mockDonations);

  const filteredDonations = useMemo(() => {
    return donations.filter((donation) => {
      const donorMatch =
        filters.donor === "" ||
        donation.donor.toLowerCase().includes(filters.donor.toLowerCase()) ||
        donation.email.toLowerCase().includes(filters.donor.toLowerCase());
      const doctorMatch =
        filters.doctor === "" || donation.doctor === filters.doctor;

      const statusMatch =
        filters.status === "" || donation.status === filters.status;

      return donorMatch && doctorMatch && statusMatch;
    });
  }, [filters, donations]);

  const updateDonationStatus = (id: number, newStatus: string) => {
    setDonations((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              status: newStatus,
              adminNote: `Status updated to ${newStatus}`,
            }
          : d
      )
    );
    setSelectedDonation(null);
  };

  return (
    <div className="p-6 space-y-6">
      <Card className="dark:bg-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Filter Donations</CardTitle>
            {filters.doctor ||
              filters.donor ||
              (filters.status && (
                <Button
                  variant="outline"
                  onClick={() =>
                    setFilters({ donor: "", doctor: "", status: "" })
                  }
                >
                  Clear
                </Button>
              ))}
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Search donor/email"
            value={filters.donor}
            onChange={(e) => setFilters({ ...filters, donor: e.target.value })}
            className="dark:bg-slate-950"
          />

          <Select
            value={filters.doctor}
            onValueChange={(value) => setFilters({ ...filters, doctor: value })}
          >
            <SelectTrigger className="dark:bg-slate-950">
              <SelectValue placeholder="Select Doctor" />
            </SelectTrigger>
            <SelectContent className="dark:bg-slate-950">
              <SelectItem value="Dr. Smith">Dr. Smith</SelectItem>
              <SelectItem value="Dr. Jenny">Dr. Jenny</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.status}
            onValueChange={(value) => setFilters({ ...filters, status: value })}
          >
            <SelectTrigger className="dark:bg-slate-950">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent className="dark:bg-slate-950">
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="dark:bg-slate-800">
        <CardHeader>
          <CardTitle>Donation Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Donor</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDonations.map((donation, index) => (
                <TableRow key={donation.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{donation.donor}</TableCell>
                  <TableCell>{donation.email}</TableCell>
                  <TableCell>{donation.doctor}</TableCell>
                  <TableCell>${donation.amount}</TableCell>
                  <TableCell>{donation.date}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        donation.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : donation.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {donation.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDonation(donation)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog
        open={!!selectedDonation}
        onOpenChange={() => setSelectedDonation(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Donation Details</DialogTitle>
            <DialogDescription>
              Detailed view of the donation by {selectedDonation?.donor}
            </DialogDescription>
          </DialogHeader>

          {selectedDonation && (
            <div className="space-y-4 text-sm">
              <div>
                <strong>Donor Name:</strong> {selectedDonation.donor}
              </div>
              <div>
                <strong>Email:</strong> {selectedDonation.email}
              </div>
              <div>
                <strong>Phone:</strong> {selectedDonation.phone}
              </div>
              <div>
                <strong>Doctor:</strong> {selectedDonation.doctor}
              </div>
              <div>
                <strong>Amount:</strong> ${selectedDonation.amount}
              </div>
              <div>
                <strong>Date:</strong> {selectedDonation.date}
              </div>
              <div>
                <strong>Status:</strong>
                <Select
                  defaultValue={selectedDonation.status}
                  onValueChange={(value) =>
                    setSelectedDonation({ ...selectedDonation, status: value })
                  }
                >
                  <SelectTrigger className="mt-1 w-40">
                    <SelectValue placeholder="Change Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <strong>Message:</strong> {selectedDonation.message}
              </div>
              <div>
                <strong>Admin Note:</strong> {selectedDonation.adminNote}
              </div>

              <Button
                className="mt-4"
                onClick={() =>
                  updateDonationStatus(
                    selectedDonation.id,
                    selectedDonation.status
                  )
                }
              >
                Save Status
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
