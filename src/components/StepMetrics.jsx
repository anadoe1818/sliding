import React, { useState } from 'react'

const StepMetrics = ({ metrics, selectedStep, onStepSelect }) => {
  const [expandedSteps, setExpandedSteps] = useState({})

  const toggleExpand = (step) => {
    setExpandedSteps(prev => ({
      ...prev,
      [step]: !prev[step]
    }))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {metrics.map((metric, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-2 hover:shadow-md transition-shadow bg-white">
          <div className="mb-2">
            <h3 className="text-xs font-semibold text-gray-800 truncate" title={metric.step}>{metric.step}</h3>
          </div>
          
          <div className="grid grid-cols-3 gap-1.5 mb-2">
            <div className="bg-blue-50 rounded p-1.5">
              <div className="text-[10px] text-gray-600 mb-0.5">Entered</div>
              <div className="text-sm font-bold text-blue-600">{metric.entered.toLocaleString()}</div>
            </div>
            
            <div 
              className="bg-red-50 rounded p-1.5 cursor-pointer hover:bg-red-100 transition-colors"
              onClick={() => toggleExpand(metric.step)}
              title="Click to see details"
            >
              <div className="text-[10px] text-gray-600 mb-0.5">Left</div>
              <div className="text-sm font-bold text-red-600">{metric.left.toLocaleString()}</div>
            </div>
            
            <div className="bg-green-50 rounded p-1.5">
              <div className="text-[10px] text-gray-600 mb-0.5">Next</div>
              <div className="text-sm font-bold text-green-600">{metric.nextLevel.toLocaleString()}</div>
            </div>
          </div>

          {/* Expanded Users Left Details */}
          {expandedSteps[metric.step] && (
            <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-200">
              <h4 className="text-xs font-semibold text-gray-700 mb-1.5">Users Left - Breakdown</h4>
              <div className="grid grid-cols-3 gap-1.5">
                <div className="bg-white rounded p-1.5 border border-gray-200">
                  <div className="text-[10px] text-gray-600 mb-0.5">Drop</div>
                  <div className="text-xs font-semibold text-orange-600">
                    {metric.leftReasons.drop.toLocaleString()}
                  </div>
                </div>
                <div className="bg-white rounded p-1.5 border border-gray-200">
                  <div className="text-[10px] text-gray-600 mb-0.5">Menu</div>
                  <div className="text-xs font-semibold text-purple-600">
                    {metric.leftReasons.backToMainMenu.toLocaleString()}
                  </div>
                </div>
                <div className="bg-white rounded p-1.5 border border-gray-200">
                  <div className="text-[10px] text-gray-600 mb-0.5">Transfer</div>
                  <div className="text-xs font-semibold text-indigo-600">
                    {metric.leftReasons.transfer.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default StepMetrics

