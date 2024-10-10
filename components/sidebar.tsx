"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Clock, Plus, Star, Tag, Home, Inbox } from "lucide-react";
import Link from "next/link";
import notesData from "@/components/notes.json";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

type SidebarProps = {
  currentPage: "recent" | "todo" | "tags" | "Inbox" | "";
};

type Note = {
  id: number;
  title: string;
  content: string;
  date: string;
  tags: string[];
  isPrivate: boolean;
  inNotebook: boolean;
};

export function Sidebar({ currentPage }: SidebarProps) {
  const [notes, setNotes] = useState<Note[]>(notesData.notes);
  const [isNewNoteDialogOpen, setIsNewNoteDialogOpen] = useState(false);
  const [newNote, setNewNote] = useState<Omit<Note, "id" | "date">>({
    title: "",
    content: "",
    tags: [],
    isPrivate: false,
    inNotebook: false,
  });

  const handleCreateNewNote = () => {
    const currentDate = new Date().toISOString().split("T")[0];
    const newNoteWithId: Note = {
      ...newNote,
      id: Date.now(),
      date: currentDate,
      tags: newNote.tags.length > 0 ? newNote.tags : ["uncategorized"],
    };
    setNotes([newNoteWithId, ...notes]);
    setNewNote({
      title: "",
      content: "",
      tags: [],
      isPrivate: false,
      inNotebook: false,
    });
    setIsNewNoteDialogOpen(false);
  };
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10 border-2 border-amber-500">
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback>AV</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-bold text-slate-100">Akshay Vs</h2>
            <p className="text-xs text-amber-400">Premium User</p>
          </div>
        </div>
      </div>
      <nav className="space-y-4 flex-grow">
        <Link href="/">
          <Button
            variant="ghost"
            className={`w-full justify-start ${
              currentPage === ""
                ? "text-amber-400 bg-slate-900"
                : "text-slate-300 hover:text-amber-400 hover:bg-slate-900"
            }`}
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
        </Link>
        <Link href="/RecentNotes">
          <Button
            variant="ghost"
            className={`w-full justify-start ${
              currentPage === "recent"
                ? "text-amber-400 bg-slate-900"
                : "text-slate-300 hover:text-amber-400 hover:bg-slate-900"
            }`}
          >
            <Clock className="mr-2 h-4 w-4" />
            Recent Notes
          </Button>
        </Link>
        <Link href="/TodoList">
          <Button
            variant="ghost"
            className={`w-full justify-start ${
              currentPage === "todo"
                ? "text-amber-400 bg-slate-900"
                : "text-slate-300 hover:text-amber-400 hover:bg-slate-900"
            }`}
          >
            <Star className="mr-2 h-4 w-4" />
            To-Do List
          </Button>
        </Link>
        <Link href="/Tags">
          <Button
            variant="ghost"
            className={`w-full justify-start ${
              currentPage === "tags"
                ? "text-amber-400 bg-slate-900"
                : "text-slate-300 hover:text-amber-400 hover:bg-slate-900"
            }`}
          >
            <Tag className="mr-2 h-4 w-4" />
            Tags
          </Button>
        </Link>
        <Link href="/Inbox">
          <Button
            variant="ghost"
            className={`w-full justify-start ${
              currentPage === "Inbox"
                ? "text-amber-400 bg-slate-900"
                : "text-slate-300 hover:text-amber-400 hover:bg-slate-900"
            }`}
          >
            <Inbox className="mr-2 h-4 w-4" />
            Inbox
          </Button>
        </Link>
      </nav>
      <Button
        className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
        onClick={() => setIsNewNoteDialogOpen(true)}
      >
        <Plus className="mr-2 h-4 w-4" />
        Create New Note
      </Button>
      <Dialog open={isNewNoteDialogOpen} onOpenChange={setIsNewNoteDialogOpen}>
        <DialogContent className="bg-slate-900 text-slate-100 border-slate-700">
          <DialogHeader>
            <DialogTitle>Create New Note</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Note Title"
              value={newNote.title}
              onChange={(e) =>
                setNewNote({ ...newNote, title: e.target.value })
              }
              className="bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400 focus:border-amber-500 focus:ring-amber-500"
            />
            <Textarea
              placeholder="Note Content"
              value={newNote.content}
              onChange={(e) =>
                setNewNote({ ...newNote, content: e.target.value })
              }
              className="bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400 focus:border-amber-500 focus:ring-amber-500"
            />
            <Input
              placeholder="Tags (comma-separated)"
              value={newNote.tags.join(", ")}
              onChange={(e) =>
                setNewNote({
                  ...newNote,
                  tags: e.target.value.split(",").map((tag) => tag.trim()),
                })
              }
              className="bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400 focus:border-amber-500 focus:ring-amber-500"
            />
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isPrivate"
                checked={newNote.isPrivate}
                onCheckedChange={(checked) =>
                  setNewNote({ ...newNote, isPrivate: checked as boolean })
                }
              />
              <label htmlFor="isPrivate">Private Note</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="inNotebook"
                checked={newNote.inNotebook}
                onCheckedChange={(checked) =>
                  setNewNote({ ...newNote, inNotebook: checked as boolean })
                }
              />
              <label htmlFor="inNotebook">Add to Notebook</label>
            </div>
          </div>
          <Button
            onClick={handleCreateNewNote}
            className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
          >
            Create Note
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
