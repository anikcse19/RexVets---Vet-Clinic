"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const adminMenus = [
  "Dashboard",
  "Appointments",
  "Doctors",
  "Parents",
  "Reports",
  "Reviews",
  "Donation",
  "Settings",
];

type Moderator = {
  id: number;
  name: string;
  email: string;
  phone: string;
  accessList: string[];
};

export default function AdminModeratorsPage() {
  const [moderators, setModerators] = useState<Moderator[]>([]);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [form, setForm] = useState<Omit<Moderator, "id">>({
    name: "",
    email: "",
    phone: "",
    accessList: [],
  });
  const [selectedModeratorId, setSelectedModeratorId] = useState<number | null>(
    null
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [moderatorToDelete, setModeratorToDelete] = useState<Moderator | null>(
    null
  );

  const handleAddModerator = () => {
    setModerators((prev) => [...prev, { id: Date.now(), ...form }]);
    setForm({ name: "", email: "", phone: "", accessList: [] });
    setAddDialogOpen(false);
  };

  const handleEditAccessList = () => {
    if (selectedModeratorId !== null) {
      setModerators((prev) =>
        prev.map((mod) =>
          mod.id === selectedModeratorId
            ? { ...mod, accessList: form.accessList }
            : mod
        )
      );
    }
    setEditDialogOpen(false);
    setSelectedModeratorId(null);
    setForm({ name: "", email: "", phone: "", accessList: [] });
  };

  const handleDeleteModerator = () => {
    if (moderatorToDelete) {
      setModerators((prev) =>
        prev.filter((mod) => mod.id !== moderatorToDelete.id)
      );
      setModeratorToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Moderator Management</h2>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Moderator</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Moderator</DialogTitle>
              <DialogDescription>
                Add new moderator with access permissions.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <Input
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <Input
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <Separator />
              <Label className="text-sm">Access List</Label>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                {adminMenus.map((menu) => (
                  <label key={menu} className="flex gap-2 items-center">
                    <Checkbox
                      checked={form.accessList.includes(menu)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setForm({
                            ...form,
                            accessList: [...form.accessList, menu],
                          });
                        } else {
                          setForm({
                            ...form,
                            accessList: form.accessList.filter(
                              (item) => item !== menu
                            ),
                          });
                        }
                      }}
                    />
                    <span className="text-sm">{menu}</span>
                  </label>
                ))}
              </div>
              <Button className="w-full mt-4" onClick={handleAddModerator}>
                Create Moderator
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Moderator Table */}
      <Card>
        <CardHeader>
          <CardTitle>Moderators List</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Access List</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {moderators.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground py-6"
                  >
                    No moderators found.
                  </TableCell>
                </TableRow>
              ) : (
                moderators.map((mod, index) => (
                  <TableRow key={mod.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{mod.name}</TableCell>
                    <TableCell>{mod.email}</TableCell>
                    <TableCell>{mod.phone}</TableCell>
                    <TableCell>
                      <ul className="text-sm list-disc pl-4">
                        {mod.accessList.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Dialog
                        open={editDialogOpen && selectedModeratorId === mod.id}
                        onOpenChange={(open) => {
                          setEditDialogOpen(open);
                          if (!open) {
                            setSelectedModeratorId(null);
                            setForm({
                              name: "",
                              email: "",
                              phone: "",
                              accessList: [],
                            });
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedModeratorId(mod.id);
                              setForm({
                                name: mod.name,
                                email: mod.email,
                                phone: mod.phone,
                                accessList: mod.accessList,
                              });
                              setEditDialogOpen(true);
                            }}
                          >
                            Edit Access
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Update Access List</DialogTitle>
                            <DialogDescription>
                              Modify the access privileges for this moderator.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                              {adminMenus.map((menu) => (
                                <label
                                  key={menu}
                                  className="flex gap-2 items-center"
                                >
                                  <Checkbox
                                    checked={form.accessList.includes(menu)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setForm({
                                          ...form,
                                          accessList: [
                                            ...form.accessList,
                                            menu,
                                          ],
                                        });
                                      } else {
                                        setForm({
                                          ...form,
                                          accessList: form.accessList.filter(
                                            (item) => item !== menu
                                          ),
                                        });
                                      }
                                    }}
                                  />
                                  <span className="text-sm">{menu}</span>
                                </label>
                              ))}
                            </div>
                            <Button
                              className="w-full mt-2"
                              onClick={handleEditAccessList}
                            >
                              Update Access
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Dialog
                        open={
                          deleteDialogOpen && moderatorToDelete?.id === mod.id
                        }
                        onOpenChange={(open) => {
                          if (!open) {
                            setDeleteDialogOpen(false);
                            setModeratorToDelete(null);
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              setModeratorToDelete(mod);
                              setDeleteDialogOpen(true);
                            }}
                          >
                            Delete
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete Moderator</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete moderator{" "}
                              <strong>{mod.name}</strong>? This action cannot be
                              undone.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex justify-end gap-2 mt-4">
                            <Button
                              variant="outline"
                              onClick={() => {
                                setDeleteDialogOpen(false);
                                setModeratorToDelete(null);
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={handleDeleteModerator}
                            >
                              Confirm Delete
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
