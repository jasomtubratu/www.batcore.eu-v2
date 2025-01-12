"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface FaqSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function FaqSearch({ value, onChange }: FaqSearchProps) {
  return (
    <div className="relative mb-8">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input
        type="text"
        placeholder="Search questions..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}