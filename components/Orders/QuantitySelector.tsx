import { Minus, Plus } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const QuantitySelector = ({
  increaseFn,
  quantity,
  setQuantity,
  decreaseFn,
}: {
  increaseFn: () => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  decreaseFn: () => void;
}) => {
  const [tempQuantity, setTempQuantity] = useState(quantity);

  useEffect(() => {
    setTempQuantity(quantity);
  }, [quantity]);

  const handleSubmit = () => {
    if (tempQuantity >= 1) {
      setQuantity(tempQuantity);
    } else {
      setQuantity(1);
      setTempQuantity(1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <div className="border-border flex h-8 w-fit border">
      <Button
        onClick={() => tempQuantity > 1 && decreaseFn()}
        variant="outline"
        className="z-[0.5] h-auto rounded-none"
      >
        <Minus />
      </Button>
      <Input
        value={tempQuantity}
        onChange={(e) => setTempQuantity(+e.target.value)}
        onBlur={handleSubmit}
        onKeyDown={handleKeyDown}
        className="z-[1] h-auto max-w-16 rounded-none text-center outline-none"
        type="number"
        min={1}
      />
      <Button
        onClick={() => increaseFn()}
        variant="outline"
        className="z-[0.5] h-auto rounded-none"
      >
        <Plus />
      </Button>
    </div>
  );
};

export default QuantitySelector;
