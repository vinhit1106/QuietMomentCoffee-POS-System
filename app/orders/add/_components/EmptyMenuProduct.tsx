import { Frown } from "lucide-react";
import React from "react";

export default function EmptyMenuProduct() {
  return (
    <div className="text-muted-foreground flex flex-col items-center space-y-2">
      <Frown size={48} />
      <h3 className="text-2xl">No products found</h3>
      <p>Try changing your search filters or keywords.</p>
    </div>
  );
}
