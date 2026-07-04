import { Truck } from "lucide-react";

export default function TopBar() {
  return (
    <div className="bg-vergel-olive text-white text-center py-2 px-4">
      <p className="text-xs sm:text-sm font-medium flex items-center justify-center gap-2">
        <Truck size={14} />
        Envíos solo en Corrientes · Comprá desde donde estés
      </p>
    </div>
  );
}