export default function SectionsLoading() {
  return (
    <div className="min-h-screen bg-light dark:bg-dark flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-islamic-gold border-r-transparent"></div>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Loading section...</p>
      </div>
    </div>
  );
}

