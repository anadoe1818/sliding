import React from 'react'

const Filters = ({ filters, onFilterChange }) => {
  const skills = ['cards', 'payments', 'qna', 'fees']
  const category1 = ['Incoming', 'Outgoing', 'Refund', 'Unrecognize']
  const category2 = ['twint', 'card', 'account']
  const dateType = filters.dateType || ''

  const handleDateTypeChange = (value) => {
    onFilterChange('dateType', value)
    // Clear other date filters when switching type
    if (value !== 'dateRange') {
      onFilterChange('startDate', '')
      onFilterChange('endDate', '')
    }
    if (value !== 'week') {
      onFilterChange('week', '')
    }
    if (value !== 'month') {
      onFilterChange('month', '')
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Date Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date Type</label>
          <select
            value={dateType}
            onChange={(e) => handleDateTypeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">None</option>
            <option value="dateRange">Date Range</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </div>

        {/* Date Range Filter - only show if dateType is dateRange */}
        {dateType === 'dateRange' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Between</label>
            <div className="space-y-2">
              <input
                type="date"
                value={filters.startDate || ''}
                onChange={(e) => onFilterChange('startDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                value={filters.endDate || ''}
                onChange={(e) => onFilterChange('endDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* Week Filter - only show if dateType is week */}
        {dateType === 'week' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Week</label>
            <input
              type="week"
              value={filters.week || ''}
              onChange={(e) => onFilterChange('week', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Month Filter - only show if dateType is month */}
        {dateType === 'month' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Month</label>
            <input
              type="month"
              value={filters.month || ''}
              onChange={(e) => onFilterChange('month', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Skill Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Skill</label>
          <select
            value={filters.skill || ''}
            onChange={(e) => onFilterChange('skill', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Skills</option>
            {skills.map(skill => (
              <option key={skill} value={skill}>{skill.charAt(0).toUpperCase() + skill.slice(1)}</option>
            ))}
          </select>
        </div>

        {/* Category1 Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category 1</label>
          <select
            value={filters.category1 || ''}
            onChange={(e) => onFilterChange('category1', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {category1.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Category2 Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category 2</label>
          <select
            value={filters.category2 || ''}
            onChange={(e) => onFilterChange('category2', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {category2.map(cat => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default Filters

