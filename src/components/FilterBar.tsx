type FilterProps = {
    filter: string;
    setFilter: (value: string) => void;
    search: string;
    setSearch: (value: string) => void;
  };
  
  export default function FilterBar({ filter, setFilter, search, setSearch }: FilterProps) {
    return (
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <input
          className="p-2 border rounded mb-2 sm:mb-0 sm:mr-4"
          type="text"
          placeholder="Search todos..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="space-x-2">
          {['All', 'Completed', 'Incomplete'].map(status => (
            <button
              key={status}
              className={`px-3 py-1 rounded ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200'
              }`}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    );
  }
  