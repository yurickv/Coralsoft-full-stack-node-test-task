
interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  
  export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
    return (
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`px-4 py-2 rounded ${page === i + 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    );
  }
  