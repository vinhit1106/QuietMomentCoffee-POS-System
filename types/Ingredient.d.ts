interface IngredientType {
  _id: string;
  name: string;
  unit: string;
  conversion: {
    unit: string;
    rate: number;
    currentStock: number;
  };
  currentStockFormat: string;
  minThreshold: number;
  criticalThreshold: number;
  status: "safe" | "low" | "critical";
  isActive: boolean;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export default IngredientType;
