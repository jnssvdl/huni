import { Skeleton } from "@/components/ui/skeleton";

export default function PostSkeleton() {
  return (
    <div className="space-y-2 border-b p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="size-10 rounded-full" />
          <div>
            <Skeleton className="h-4 w-20" />
            <Skeleton className="mt-1 h-3 w-16" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="space-y-1">
        <Skeleton className="h-4 w-full" />
        {/* <Skeleton className="h-4 w-4/5" /> */}
      </div>

      {/* Track item skeleton */}
      <div className="rounded-md border p-2">
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <Skeleton className="size-10 rounded-none" />
            <div className="min-w-0 space-y-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="size-10 rounded-full" />
        </div>
      </div>

      {/* Action buttons skeleton */}
      <div className="flex space-x-4">
        <Skeleton className="h-8 w-14 rounded-full" />
        <Skeleton className="h-8 w-14 rounded-full" />
      </div>
    </div>
  );
}
