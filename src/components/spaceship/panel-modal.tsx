import { useState } from 'react'

interface PanelModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: (selectedOption: string) => void
  title: string
  options: string[]
  isCompleted: boolean
}

export function PanelModal({ isOpen, onClose, onComplete, title, options, isCompleted }: PanelModalProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  if (!isOpen) return null

  const handleSubmit = () => {
    if (selectedOption) {
      onComplete(selectedOption)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {options.map((option) => (
            <label key={option} className="flex items-center space-x-3">
              <input
                type="radio"
                name="option"
                value={option}
                checked={selectedOption === option}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="form-radio text-blue-500"
              />
              <span className="text-white">{option}</span>
            </label>
          ))}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className={`px-4 py-2 text-sm font-medium rounded-md ${selectedOption
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-500 text-gray-300 cursor-not-allowed'
              }`}
          >
            {isCompleted ? 'Update' : 'Complete'}
          </button>
        </div>
      </div>
    </div>
  )
} 