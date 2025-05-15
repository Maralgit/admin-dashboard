import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductSkeleton() {
  // array of 5 items
  const skeletonItems = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {skeletonItems.map((index) => (
        <div key={index}>
          <Skeleton className="h-36 w-full rounded-md" />
          <Skeleton className="h-3 w-full rounded-md" />
        </div>
      ))}
    </div>
  );
}
