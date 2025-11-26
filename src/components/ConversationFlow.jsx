import React from 'react'

const ConversationFlow = ({ skill, category1, category2 }) => {
  // Filter the flow based on props
  const shouldShowBranch = (branchType) => {
    // Filter logic based on category2
    if (category2) {
      if (category2.toLowerCase() === 'twint' && branchType !== 'twint') return false
      if (category2.toLowerCase() === 'card' && branchType !== 'card') return false
      if (category2.toLowerCase() === 'account' && branchType !== 'account') return false
    }
    return true
  }

  const getRootLabel = () => {
    if (category1) {
      return `${category1} Payment`
    }
    return 'Outgoing Payment'
  }
  // Helper component for Feedback box with bar chart
  const FeedbackBox = ({ completed, total, greenPercent, label }) => {
    const greyPercent = 100 - greenPercent
    return (
      <div className="bg-stone-100 border border-gray-300 rounded px-3 py-2 shadow-sm min-w-[140px] text-center">
        <div className="font-semibold text-xs text-gray-800">{label}</div>
        <div className="text-xs text-gray-600 mt-0.5">Completed: {completed}</div>
        <div className="mt-2 flex h-4 rounded overflow-hidden">
          <div 
            className="bg-green-500" 
            style={{ width: `${greenPercent}%` }}
          ></div>
          <div 
            className="bg-gray-300" 
            style={{ width: `${greyPercent}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-600 mt-1">{greenPercent}%</div>
      </div>
    )
  }

  // Box component
  const Box = ({ label, users, color = 'stone', className = '' }) => {
    const bgColor = color === 'orange' ? 'bg-orange-200 border-orange-300' : 
                    color === 'green' ? 'bg-green-500 text-white' : 
                    'bg-stone-100 border-gray-300 text-gray-800'
    const textColor = color === 'green' ? 'text-white' : 'text-gray-800'
    
    return (
      <div className={`${bgColor} border rounded px-3 py-2 shadow-sm min-w-[120px] text-center ${className}`}>
        <div className={`font-semibold text-xs ${textColor}`}>{label}</div>
        {users !== undefined && (
          <div className={`text-xs mt-0.5 ${color === 'green' ? 'text-white' : 'text-gray-600'}`}>
            Users: {users}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="w-full overflow-auto py-8">
      <div className="min-w-max px-8">
        <div className="flex items-center">
          {/* Root: Payment */}
          <Box label={getRootLabel()} users={3} />
          
          {/* Horizontal line from root */}
          <div className="w-8 h-0.5 bg-gray-400 mx-2"></div>
          
          {/* Three branches arranged vertically, extending horizontally */}
          <div className="relative flex flex-col items-start gap-12">
            {/* Vertical connector line for siblings */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-400"></div>
            
            {/* Branch 1: Twint */}
            {shouldShowBranch('twint') && (
              <div className="flex items-center relative z-10">
                <div className="h-0.5 w-4 bg-gray-400"></div>
                <Box label="Twint: 3" />
                <div className="w-8 h-0.5 bg-gray-400 mx-2"></div>
                <Box label="Journey Completed" users={3} color="green" />
                <div className="w-8 h-0.5 bg-gray-400 mx-2"></div>
                <FeedbackBox completed={2} total={3} greenPercent={67} label="Feedback" />
              </div>
            )}

            {/* Branch 2: Card */}
            {shouldShowBranch('card') && (
              <div className="flex items-center relative z-10">
                <div className="h-0.5 w-4 bg-gray-400"></div>
                <Box label="Card: 0" color="orange" />
                <div className="w-8 h-0.5 bg-gray-400 mx-2"></div>
                <Box label="Status Check" users={0} />
                <div className="w-8 h-0.5 bg-gray-400 mx-2"></div>
                <Box label="Journey Completed" users={0} color="green" />
                <div className="w-8 h-0.5 bg-gray-400 mx-2"></div>
                <FeedbackBox completed={0} total={0} greenPercent={0} label="Feedback" />
              </div>
            )}

            {/* Branch 3: Method Inquiry (Account) */}
            {shouldShowBranch('account') && (
              <div className="flex items-center relative z-10">
                <div className="h-0.5 w-4 bg-gray-400"></div>
                <div className="flex flex-col items-center">
                  <Box label="Method Inquiry" users={3} />
                  <div className="bg-orange-200 border border-orange-300 rounded px-3 py-2 shadow-sm min-w-[100px] text-center mt-2">
                    <div className="font-semibold text-xs text-gray-800">Account: 0</div>
                  </div>
                </div>
                <div className="w-8 h-0.5 bg-gray-400 mx-2"></div>
                <div className="flex flex-col items-center">
                  <Box label="Entity Collection" users={0} />
                  <div className="text-xs text-gray-600 my-2">Entities already mentioned:</div>
                </div>
                <div className="w-8 h-0.5 bg-gray-400 mx-2"></div>
                
                {/* Three sub-branches from Entity Collection - arranged vertically */}
                <div className="relative flex flex-col items-start gap-8">
                  {/* Vertical connector line */}
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-400"></div>
                  
                  {/* Entity not Identified */}
                  <div className="flex items-center relative z-10">
                    <div className="h-0.5 w-4 bg-gray-400"></div>
                    <Box label="Entity not Identified" users={0} />
                    <div className="w-8 h-0.5 bg-gray-400 mx-2"></div>
                    <div className="bg-orange-200 border border-orange-300 rounded px-2 py-1 shadow-sm min-w-[70px] text-center">
                      <div className="font-semibold text-xs text-gray-800">Repaired:</div>
                    </div>
                  </div>

                  {/* No Payment Found */}
                  <div className="flex items-center relative z-10">
                    <div className="h-0.5 w-4 bg-gray-400"></div>
                    <Box label="No Payment Found" users={0} />
                    <div className="w-8 h-0.5 bg-gray-400 mx-2"></div>
                    <div className="bg-orange-200 border border-orange-300 rounded px-2 py-1 shadow-sm min-w-[70px] text-center">
                      <div className="font-semibold text-xs text-gray-800">Repaired:</div>
                    </div>
                  </div>

                  {/* Payment Found */}
                  <div className="flex items-center relative z-10">
                    <div className="h-0.5 w-4 bg-gray-400"></div>
                    <div className="bg-stone-100 border border-gray-300 rounded px-3 py-2 shadow-sm min-w-[140px] text-center">
                      <div className="font-semibold text-xs text-gray-800">Payment Found</div>
                      <div className="text-xs mt-0.5 text-gray-600">Users:</div>
                    </div>
                    <div className="w-8 h-0.5 bg-gray-400 mx-2"></div>
                    <Box label="Payment List" users={0} />
                    <div className="w-8 h-0.5 bg-gray-400 mx-2"></div>
                    <Box label="Journey Completed" users={0} color="green" />
                    <div className="w-8 h-0.5 bg-gray-400 mx-2"></div>
                    
                    {/* Two branches from Journey Completed - arranged vertically */}
                    <div className="relative flex flex-col items-start gap-8">
                      {/* Vertical connector line */}
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-400"></div>
                      
                      {/* Feedback branch */}
                      <div className="flex items-center relative z-10">
                        <div className="h-0.5 w-4 bg-gray-400"></div>
                        <FeedbackBox completed={0} total={0} greenPercent={0} label="Feedback" />
                      </div>
                      
                      {/* Additional Payment branch */}
                      <div className="flex items-center relative z-10">
                        <div className="h-0.5 w-4 bg-gray-400"></div>
                        <Box label="Additional Payment" users={0} />
                        <div className="w-8 h-0.5 bg-gray-400 mx-2"></div>
                        <Box label="Journey Completed" users={0} color="green" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConversationFlow
