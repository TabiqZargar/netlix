import React from "react";

export function SkeletonCard({ size = "medium" }: { size?: "small" | "medium" | "large" }) {
  const sizeClasses = {
    small: "w-[130px] md:w-[160px] h-[195px] md:h-[240px]",
    medium: "w-[180px] md:w-[220px] h-[270px] md:h-[330px]",
    large: "w-[200px] md:w-[260px] h-[300px] md:h-[390px]",
  };

  return (
    <div className={`${sizeClasses[size]} rounded-md skeleton flex-shrink-0`} />
  );
}

export function ContentRowSkeleton({ size = "medium" }: { size?: "small" | "medium" | "large" }) {
  return (
    <div className="mb-6 md:mb-8 px-4 md:px-12">
      <div className="skeleton h-5 md:h-6 w-40 mb-3 rounded" />
      <div className="flex gap-1.5 md:gap-2 overflow-hidden">
        {Array.from({ length: 7 }).map((_, i) => (
          <SkeletonCard key={i} size={size} />
        ))}
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative w-full h-[80vh] min-h-[500px]">
      <div className="skeleton absolute inset-0" />
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 space-y-4">
        <div className="skeleton h-10 md:h-14 w-96 max-w-full rounded" />
        <div className="skeleton h-4 w-full max-w-xl rounded" />
        <div className="skeleton h-4 w-full max-w-lg rounded" />
        <div className="flex gap-3 mt-4">
          <div className="skeleton h-12 w-32 rounded" />
          <div className="skeleton h-12 w-32 rounded" />
        </div>
      </div>
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="min-h-screen bg-netflix-dark">
      <div className="skeleton w-full h-[60vh]" />
      <div className="px-4 md:px-12 -mt-32 relative z-10">
        <div className="flex gap-8">
          <div className="skeleton w-[200px] md:w-[300px] h-[300px] md:h-[450px] rounded-lg flex-shrink-0 hidden md:block" />
          <div className="flex-1 space-y-4 pt-8">
            <div className="skeleton h-10 w-96 max-w-full rounded" />
            <div className="skeleton h-4 w-64 rounded" />
            <div className="skeleton h-4 w-full max-w-2xl rounded" />
            <div className="skeleton h-4 w-full max-w-xl rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
