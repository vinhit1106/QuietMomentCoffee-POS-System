import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { SearchIcon, CircleXIcon, Users } from "lucide-react";
import { useState, useRef } from "react";
import { useCategory } from "@/hooks/queries/useCategory";

export default function ProductFilters({
  onSearchChange,
  onCategoryChange,
}: {
  onSearchChange: React.Dispatch<React.SetStateAction<string>>;
  onCategoryChange: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [searchProductValue, setSearchProductValue] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");
  const categoryQuery = useCategory();
  const categories = categoryQuery.data?.data.data || [];
  const inputSearchProductRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = (value: string) => {
    setSearchProductValue(value);
    onSearchChange(value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategoryId(value);
    onCategoryChange(value);
  };

  const handleClearInput = () => {
    setSearchProductValue("");
    onSearchChange("");
    if (inputSearchProductRef.current) {
      inputSearchProductRef.current.focus();
    }
  };

  return (
    <div className="mb-2 flex items-stretch gap-x-2">
      {/* Search */}
      <div className="*:not-first:mt-2">
        <div className="relative">
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            <SearchIcon size={16} />
          </div>
          <Input
            className="peer w-xs ps-9"
            placeholder="Search..."
            type="text"
            value={searchProductValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            ref={inputSearchProductRef}
          />
          {searchProductValue && (
            <button
              className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Clear input"
              onClick={handleClearInput}
            >
              <CircleXIcon size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Category Select */}
      <Select value={selectedCategoryId} onValueChange={handleCategoryChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category._id} value={category._id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Choose Customer */}
      <Button
        variant="outline"
        className="cursor-pointer rounded-md border-amber-200 px-3 text-xs text-amber-900 hover:bg-amber-50"
      >
        <Users />
        {false ? <Badge variant="secondary">Vinh Nguyễn</Badge> : "Khách lẻ"}
      </Button>
    </div>
  );
}
