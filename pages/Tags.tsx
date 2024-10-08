import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Menu, Plus, Search, X } from "lucide-react";
import { Sidebar } from "@/components/sidebar";

const initialTags = [
  "work",
  "personal",
  "ideas",
  "todo",
  "important",
  "project",
  "meeting",
  "learning",
  "finance",
  "health",
];

export default function TagsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tags, setTags] = useState<string[]>(initialTags);
  const [newTag, setNewTag] = useState("");

  const addTag = () => {
    if (newTag.trim() !== "" && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
      <aside className="hidden lg:block w-64 bg-slate-950 p-4">
        <Sidebar currentPage="tags" />
      </aside>
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent
          side="left"
          className="w-64 p-4 bg-slate-950 text-slate-100"
        >
          <Sidebar currentPage="tags" />
        </SheetContent>
      </Sheet>
      <main className="flex-grow p-4 lg:p-6 overflow-hidden">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden mr-2 text-slate-400 hover:text-slate-100"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl lg:text-3xl font-bold text-amber-400">
              Tags
            </h1>
          </div>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              className="pl-10 w-full bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400 focus:border-amber-500 focus:ring-amber-500"
              placeholder="Search tags"
            />
          </div>
        </header>
        <Card className="bg-slate-800 border-slate-700 mb-6">
          <CardHeader>
            <CardTitle className="text-amber-400">Add New Tag</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Enter a new tag"
                className="flex-grow bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 focus:border-amber-500 focus:ring-amber-500"
              />
              <Button
                onClick={addTag}
                className="bg-amber-500 hover:bg-amber-600 text-slate-900"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>
        <ScrollArea className="h-[calc(100vh-250px)]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-slate-700 text-amber-400 hover:bg-slate-600 transition-colors duration-200 flex items-center justify-between p-2"
              >
                <span>{tag}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTag(tag)}
                  className="ml-2 hover:bg-slate-500 rounded-full p-1"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
