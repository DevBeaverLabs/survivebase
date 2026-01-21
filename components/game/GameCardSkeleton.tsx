import Skeleton from '../ui/Skeleton';

export default function GameCardSkeleton() {
  return (
    <div className="bg-bg-secondary border border-border rounded-lg overflow-hidden flex flex-col h-full">
      {/* Thumbnail Skeleton */}
      <Skeleton className="aspect-video w-full rounded-none" />

      {/* Content Skeleton */}
      <div className="p-4 flex flex-col flex-grow gap-3">
        <div className="space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-2/3" />
        </div>

        <div className="mt-auto space-y-3">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}
