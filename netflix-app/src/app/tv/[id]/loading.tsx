export default function TVLoading() {
  return (
    <div className="min-h-screen bg-netflix-dark">
      <div className="skeleton w-full h-[70vh]" />
      <div className="px-4 md:px-12 -mt-32 relative z-10">
        <div className="flex gap-8">
          <div className="skeleton w-[280px] h-[420px] rounded-lg flex-shrink-0 hidden md:block" />
          <div className="flex-1 space-y-4 pt-8">
            <div className="skeleton h-12 w-96 max-w-full rounded" />
            <div className="skeleton h-4 w-64 rounded" />
            <div className="skeleton h-4 w-full max-w-2xl rounded" />
            <div className="skeleton h-4 w-full max-w-xl rounded" />
            <div className="flex gap-3 mt-4">
              <div className="skeleton h-12 w-32 rounded" />
              <div className="skeleton h-12 w-32 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
