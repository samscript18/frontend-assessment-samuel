'use client';

export function MovieSkeleton() {
  return (
    <div className="rounded-lg overflow-hidden bg-slate-800 animate-pulse">
      
      <div className="aspect-video bg-slate-700" />
      
      
      <div className="p-4 space-y-2">
        <div className="h-5 bg-slate-700 rounded w-3/4" />
        <div className="h-4 bg-slate-700 rounded w-1/2" />
      </div>
    </div>
  );
}

export function MovieGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <MovieSkeleton key={i} />
      ))}
    </div>
  );
}

export function DetailPageSkeleton() {
  return (
    <div className="animate-pulse">
      
      <div className="h-96 bg-slate-800 mb-8" />
      
      
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="h-8 bg-slate-800 rounded w-3/4" />
        <div className="h-4 bg-slate-800 rounded w-1/2" />
        <div className="space-y-2">
          <div className="h-4 bg-slate-800 rounded" />
          <div className="h-4 bg-slate-800 rounded" />
          <div className="h-4 bg-slate-800 rounded w-5/6" />
        </div>
      </div>
    </div>
  );
}
