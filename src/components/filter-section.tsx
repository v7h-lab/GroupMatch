import { motion } from 'motion/react';

interface FilterSectionProps {
  title: string;
  icon: React.ReactNode;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}

export function FilterSection({ title, icon, options, selected, onToggle }: FilterSectionProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-3">
        <div className="bg-red-600 p-1.5 rounded-lg text-white">
          {icon}
        </div>
        <span className="font-semibold text-gray-900">{title}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <motion.button
            key={option}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onToggle(option)}
            className={`px-4 py-2 rounded-full transition-all font-medium ${
              selected.includes(option)
                ? 'bg-red-600 text-white shadow-lg shadow-red-200'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
