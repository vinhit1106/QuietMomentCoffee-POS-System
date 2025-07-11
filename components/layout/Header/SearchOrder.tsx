"use client";
import React, { useRef, useState } from "react";
import { Input } from "../../ui/input";
import { CircleXIcon, SearchIcon } from "lucide-react";

export default function SearchOrder() {
  const [searchOrderValue, setSearchOrderValue] = useState("");
  const inputSearchOrderRef = useRef<HTMLInputElement>(null);
  const handleClearInput = () => {
    setSearchOrderValue("");
    if (inputSearchOrderRef.current) {
      inputSearchOrderRef.current.focus();
    }
  };
  return (
    <div className="relative mx-auto w-full max-w-xs">
      <Input
        className="peer h-10 ps-8 pe-10"
        placeholder="Tìm kiếm mã đơn hàng..."
        value={searchOrderValue}
        onChange={(e) => setSearchOrderValue(e.target.value)}
        ref={inputSearchOrderRef}
      />
      <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
        <SearchIcon size={16} />
      </div>
      {searchOrderValue && (
        <button
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Clear input"
          onClick={handleClearInput}
        >
          <CircleXIcon size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
