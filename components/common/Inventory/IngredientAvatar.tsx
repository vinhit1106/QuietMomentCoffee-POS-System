import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Box } from "lucide-react";
import React from "react";

export default function IngredientAvatar() {
  return (
    <Avatar>
      <AvatarFallback className="text-muted-foreground">
        <Box />
      </AvatarFallback>
    </Avatar>
  );
}
