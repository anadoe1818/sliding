import React, { useState } from 'react'

const DetailBoxes = () => {
  const [selectedBox, setSelectedBox] = useState(null)

  const detailBoxes = [
    {
      id: 'errors',
      title: 'Errors Details',
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      data: {
        total: 245,
        byType: {
          'Connection Error': 120,
          'Timeout Error': 75,
          'Validation Error': 35,
          'Other': 15
        },
        recent: [
          { time: '10:23 AM', error: 'Connection timeout', step: 'Payments' },
          { time: '10:15 AM', error: 'Invalid input', step: 'Cards' },
          { time: '10:08 AM', error: 'Server error', step: 'Fees' }
        ]
      }
    },
    {
      id: 'transfer',
      title: 'Transfer Details',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      data: {
        total: 3200,
        byStep: {
          'All Conversations': 2000,
          'Payments': 500,
          'Cards': 400,
          'Fees': 300
        },
        averageTime: '2.5 min',
        successRate: '94%'
      }
    },
    {
      id: 'drop',
      title: 'Drop Details',
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      data: {
        total: 5200,
        byStep: {
          'All Conversations': 2500,
          'Payments': 1000,
          'Cards': 600,
          'Fees': 500,
          'QNA': 400,
          'Method Inquira': 200
        },
        averageDropTime: '45 sec',
        topReason: 'User timeout'
      }
    },
    {
      id: 'backToMainMenu',
      title: 'Back to Main Menu Details',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      data: {
        total: 4200,
        byStep: {
          'All Conversations': 2000,
          'Payments': 800,
          'Cards': 500,
          'Fees': 400,
          'QNA': 300,
          'Method Inquira': 200
        },
        averageTime: '1.2 min',
        returnRate: '12%'
      }
    },
    {
      id: 'afterCompletion',
      title: 'After Completion Behaviour',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      data: {
        completed: 700,
        nextActions: {
          'Return to Main Menu': 350,
          'Start New Conversation': 200,
          'Exit': 100,
          'Continue to Next Step': 50
        },
        satisfaction: '87%',
        averageCompletionTime: '5.3 min'
      }
    }
  ]

  const renderBoxContent = (box) => {
    switch (box.id) {
      case 'errors':
        return (
          <div className="space-y-3">
            <div className="text-3xl font-bold">{box.data.total}</div>
            <div className="text-sm text-gray-300">Total Errors</div>
            <div className="mt-4 space-y-2">
              {Object.entries(box.data.byType).map(([type, count]) => (
                <div key={type} className="flex justify-between text-sm">
                  <span>{type}</span>
                  <span className="font-semibold">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )
      case 'transfer':
        return (
          <div className="space-y-3">
            <div className="text-3xl font-bold">{box.data.total.toLocaleString()}</div>
            <div className="text-sm text-gray-300">Total Transfers</div>
            <div className="mt-4 space-y-2">
              <div className="text-sm">
                <div>Success Rate: <span className="font-semibold">{box.data.successRate}</span></div>
                <div>Avg Time: <span className="font-semibold">{box.data.averageTime}</span></div>
              </div>
            </div>
          </div>
        )
      case 'drop':
        return (
          <div className="space-y-3">
            <div className="text-3xl font-bold">{box.data.total.toLocaleString()}</div>
            <div className="text-sm text-gray-300">Total Drops</div>
            <div className="mt-4 space-y-2">
              <div className="text-sm">
                <div>Top Reason: <span className="font-semibold">{box.data.topReason}</span></div>
                <div>Avg Time: <span className="font-semibold">{box.data.averageDropTime}</span></div>
              </div>
            </div>
          </div>
        )
      case 'backToMainMenu':
        return (
          <div className="space-y-3">
            <div className="text-3xl font-bold">{box.data.total.toLocaleString()}</div>
            <div className="text-sm text-gray-300">Back to Menu</div>
            <div className="mt-4 space-y-2">
              <div className="text-sm">
                <div>Return Rate: <span className="font-semibold">{box.data.returnRate}</span></div>
                <div>Avg Time: <span className="font-semibold">{box.data.averageTime}</span></div>
              </div>
            </div>
          </div>
        )
      case 'afterCompletion':
        return (
          <div className="space-y-3">
            <div className="text-3xl font-bold">{box.data.completed.toLocaleString()}</div>
            <div className="text-sm text-gray-300">Completed</div>
            <div className="mt-4 space-y-2">
              <div className="text-sm">
                <div>Satisfaction: <span className="font-semibold">{box.data.satisfaction}</span></div>
                <div>Avg Time: <span className="font-semibold">{box.data.averageCompletionTime}</span></div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const renderExpandedContent = (box) => {
    switch (box.id) {
      case 'errors':
        return (
          <div className="mt-4 space-y-3">
            <h4 className="font-semibold text-gray-700">Recent Errors</h4>
            <div className="space-y-2">
              {box.data.recent.map((item, idx) => (
                <div key={idx} className="bg-gray-50 p-2 rounded text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">{item.error}</span>
                    <span className="text-gray-500">{item.time}</span>
                  </div>
                  <div className="text-gray-600 text-xs mt-1">Step: {item.step}</div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'transfer':
      case 'drop':
      case 'backToMainMenu':
        return (
          <div className="mt-4 space-y-3">
            <h4 className="font-semibold text-gray-700">Breakdown by Step</h4>
            <div className="space-y-2">
              {Object.entries(box.data.byStep).map(([step, count]) => (
                <div key={step} className="flex justify-between bg-gray-50 p-2 rounded text-sm">
                  <span>{step}</span>
                  <span className="font-semibold">{count.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )
      case 'afterCompletion':
        return (
          <div className="mt-4 space-y-3">
            <h4 className="font-semibold text-gray-700">Next Actions</h4>
            <div className="space-y-2">
              {Object.entries(box.data.nextActions).map(([action, count]) => (
                <div key={action} className="flex justify-between bg-gray-50 p-2 rounded text-sm">
                  <span>{action}</span>
                  <span className="font-semibold">{count.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {detailBoxes.map((box) => (
        <div
          key={box.id}
          className={`${box.color} ${box.hoverColor} text-white rounded-lg p-6 shadow-lg cursor-pointer transition-all transform hover:scale-105`}
          onClick={() => setSelectedBox(selectedBox === box.id ? null : box.id)}
        >
          <h3 className="text-lg font-semibold mb-4">{box.title}</h3>
          {renderBoxContent(box)}
          {selectedBox === box.id && (
            <div className="mt-4 pt-4 border-t border-white border-opacity-30">
              {renderExpandedContent(box)}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default DetailBoxes

