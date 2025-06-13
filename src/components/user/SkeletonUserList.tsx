const SkeletonUserList = ({ count = 5 }: { count?: number }) => (
  <ul className="flex flex-col gap-3 pb-4">
    {Array.from({ length: count }).map((_, i) => (
      <li key={i}>
        <div data-testid="skeleton-user-item" className="h-10 rounded animate-pulse bg-gray-200" />
      </li>
    ))}
  </ul>
);

export default SkeletonUserList;
