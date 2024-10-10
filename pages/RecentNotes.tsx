"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { BookOpen, Lock, Menu, Search } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { LayoutGrid, LayoutList, Filter } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import notesData from "@/components/notes.json";

type Note = {
  id: number;
  title: string;
  content: string;
  date: string;
  tags: string[];
  isPrivate: boolean;
  inNotebook: boolean;
};

export default function RecentNotesPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>(notesData.notes);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const allTags = Array.from(
    new Set(notesData.notes.flatMap((note) => note.tags))
  );

  useEffect(() => {
    const filtered = notesData.notes.filter(
      (note) =>
        (selectedTags.length === 0 ||
          note.tags.some((tag) => selectedTags.includes(tag))) &&
        (note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredNotes(filtered);
  }, [selectedTags, searchTerm]);

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const isFiltered = selectedTags.length > 0 || searchTerm !== "";

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
      <aside className="hidden lg:block w-64 bg-slate-950 p-4">
        <Sidebar currentPage="recent" />
      </aside>
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent
          side="left"
          className="w-64 p-4 bg-slate-950 text-slate-100"
        >
          <Sidebar currentPage="recent" />
        </SheetContent>
      </Sheet>
      <main className="flex-grow p-4 lg:p-6 overflow-hidden">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="flex items-center self-start">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden mr-2 text-slate-400 hover:text-slate-100"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl lg:text-3xl font-bold text-amber-400">
              Recent Notes
            </h1>
          </div>
          <div className="relative w-full max-w-sm flex gap-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              className="pl-10 w-full bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400 focus:border-amber-500 focus:ring-amber-500"
              placeholder="Search notes"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-amber-400"
            >
              <Filter
                className={`h-4 w-4 ${
                  isFiltered ? "text-amber-400" : "text-slate-200"
                }`}
              />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleView}
              className="bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-amber-400 hidden sm:flex"
            >
              {isGridView ? (
                <LayoutList className="h-4 w-4" />
              ) : (
                <LayoutGrid className="h-4 w-4" />
              )}
            </Button>
          </div>
        </header>
        <ScrollArea className="h-[calc(100vh-120px)]">
          <div
            className={`grid gap-4 ${
              isGridView
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {filteredNotes.map((note) => (
              <Card
                key={note.id}
                className="bg-slate-800 border-slate-700 hover:border-amber-500 transition-colors duration-300"
              >
                <CardHeader>
                  <CardTitle className="flex justify-between items-center text-slate-100">
                    <div className="flex gap-2">
                      <span className="">{note.title}</span>
                      <div
                        className={`flex flex-wrap gap-1 ${
                          isGridView ? "hidden" : ""
                        }`}
                      >
                        {note.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-slate-700 text-amber-400 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-sm font-normal text-amber-400">
                      {note.date}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-2 line-clamp-3">
                    {note.content}
                  </p>
                  <div
                    className={`flex flex-wrap gap-1 ${
                      isGridView ? "" : "hidden"
                    }`}
                  >
                    {note.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-slate-700 text-amber-400 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter
                  className={`text-xs text-slate-400 flex justify-between ${
                    isGridView ? "" : "hidden"
                  }`}
                >
                  <span>{note.content.length} characters</span>
                  <div className="flex space-x-2">
                    {note.isPrivate && (
                      <Lock className="h-4 w-4 text-amber-400" />
                    )}
                    {note.inNotebook && (
                      <BookOpen className="h-4 w-4 text-amber-400" />
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </main>
      {isFilterOpen && (
        <div className="w-64 bg-slate-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-amber-400 mb-4">Filter</h2>
          <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search notes"
              className="pl-8 bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 focus:border-amber-500 focus:ring-amber-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            {allTags.map((tag) => (
              <div key={tag} className="flex items-center">
                <Checkbox
                  id={tag}
                  checked={selectedTags.includes(tag)}
                  onCheckedChange={() => toggleTag(tag)}
                  className="border-amber-500 text-amber-500 focus:ring-amber-500"
                />
                <label
                  htmlFor={tag}
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-200"
                >
                  {tag}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
