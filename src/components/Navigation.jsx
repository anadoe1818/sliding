import React from 'react'

const Navigation = ({ currentTab, onTabChange }) => {
  const tabs = [
    { id: 'analytics', label: 'Analytics', icon: '🔄' },
    { id: 'monitoring', label: 'Monitoring', icon: '💬' },
    { id: 'content', label: 'Content', icon: '📋' },
    { id: 'skills', label: 'Skills', icon: '⭐' },
    { id: 'audit', label: 'Audit', icon: '🏢' },
    { id: 'testing', label: 'Testing', icon: '✈️' }
  ]

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 transition-colors ${
                currentTab === tab.id
                  ? 'border-red-500 text-gray-900'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <span className="text-sm">{tab.icon}</span>
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navigation

