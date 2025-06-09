"use client";
import { useMemo, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const mockReviews = [
  {
    id: 1,
    reviewer: "Lily Johnson",
    email: "lily@pets.com",
    target: "Dr. Whiskers (Vet)",
    type: "Vet",
    rating: 5,
    comment: "Dr. Whiskers was amazing with our anxious dog!",
    date: "2025-06-07",
    visible: true,
  },
  {
    id: 2,
    reviewer: "Max Carter",
    email: "max@catmail.com",
    target: "Dr. Tiffany (Vet)",
    type: "Vet",
    rating: 3,
    comment: "Works okay, but smells weird after a few days.",
    date: "2025-06-05",
    visible: false,
  },
  {
    id: 3,
    reviewer: "Lily Johnson",
    email: "lily@pets.com",
    target: "Dr. Whiskers (Vet)",
    type: "Vet",
    rating: 5,
    comment: "Dr. Whiskers was amazing with our anxious dog!",
    date: "2025-06-07",
    visible: true,
  },
  {
    id: 4,
    reviewer: "Max Carter",
    email: "max@catmail.com",
    target: "Dr. Tiffany (Vet)",
    type: "Vet",
    rating: 3,
    comment: "Works okay, but smells weird after a few days.",
    date: "2025-06-05",
    visible: false,
  },
  {
    id: 5,
    reviewer: "Lily Johnson",
    email: "lily@pets.com",
    target: "Dr. Whiskers (Vet)",
    type: "Vet",
    rating: 5,
    comment: "Dr. Whiskers was amazing with our anxious dog!",
    date: "2025-06-07",
    visible: true,
  },
  {
    id: 6,
    reviewer: "Max Carter",
    email: "max@catmail.com",
    target: "Dr. Tiffany (Vet)",
    type: "Vet",
    rating: 3,
    comment: "Works okay, but smells weird after a few days.",
    date: "2025-06-05",
    visible: false,
  },
];

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState(mockReviews);
  const [filters, setFilters] = useState({
    reviewer: "",
    type: "",
    visibility: "",
  });

  const toggleVisibility = (id: number) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === id ? { ...review, visible: !review.visible } : review
      )
    );
    // Optional: Call API to update visibility
  };

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const reviewerMatch =
        filters.reviewer === "" ||
        review.reviewer
          .toLowerCase()
          .includes(filters.reviewer.toLowerCase()) ||
        review.email.toLowerCase().includes(filters.reviewer.toLowerCase());

      const typeMatch = filters.type === "" || review.type === filters.type;

      const visibilityMatch =
        filters.visibility === ""
          ? true
          : filters.visibility === "shown"
          ? review.visible
          : !review.visible;

      return reviewerMatch && typeMatch && visibilityMatch;
    });
  }, [filters, reviews]);

  return (
    <div className="p-6 space-y-6">
      <Card className="dark:bg-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Filter Reviews</CardTitle>
            {filters.reviewer ||
              (filters.visibility && (
                <Button
                  variant="outline"
                  onClick={() =>
                    setFilters({ reviewer: "", type: "", visibility: "" })
                  }
                >
                  Clear
                </Button>
              ))}
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Search reviewer or email"
            value={filters.reviewer}
            onChange={(e) =>
              setFilters({ ...filters, reviewer: e.target.value })
            }
            className="dark:bg-slate-950"
          />

          <Select
            onValueChange={(value) =>
              setFilters({ ...filters, visibility: value })
            }
            value={filters.visibility}
          >
            <SelectTrigger className="dark:bg-slate-950">
              <SelectValue placeholder="Select Visibility" />
            </SelectTrigger>
            <SelectContent className="dark:bg-slate-950">
              <SelectItem value="shown">Shown</SelectItem>
              <SelectItem value="hidden">Hidden</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      <Card className="dark:bg-slate-800">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Pet Parent Reviews Management
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Approve or hide reviews submitted by pet parents for vets or
            products.
          </p>
        </CardHeader>
        <Separator />
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Reviewer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Reviewed</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Visible</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((review, index) => (
                <TableRow key={review.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{review.reviewer}</TableCell>
                  <TableCell>{review.email}</TableCell>
                  <TableCell>{review.target}</TableCell>

                  <TableCell>
                    <Badge variant="outline">{review.rating} / 5</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {review.comment}
                  </TableCell>
                  <TableCell>{review.date}</TableCell>
                  <TableCell>
                    <Switch
                      checked={review.visible}
                      onCheckedChange={() => toggleVisibility(review.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
