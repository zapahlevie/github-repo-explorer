const SkeletonRepoList = ({ count = 5 }: { count?: number }) => (
  <ul className="flex flex-col gap-3 my-2 ml-4">
    {Array.from({ length: count }).map((_, i) => (
      <li key={i}>
        <div data-testid="skeleton-repo-item" className="h-16 rounded animate-pulse bg-gray-300" />
      </li>
    ))}
  </ul>
);

export default SkeletonRepoList;
