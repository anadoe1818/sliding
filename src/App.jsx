import React, { useState } from 'react'
import ConversationFlow from './components/ConversationFlow'
import StepMetrics from './components/StepMetrics'
import DetailBoxes from './components/DetailBoxes'
import Filters from './components/Filters'
import FlowCombinations from './pages/FlowCombinations'
import Navigation from './components/Navigation'

function App() {
  const [selectedStep, setSelectedStep] = useState(null)
  const [currentTab, setCurrentTab] = useState('monitoring')
  const [filters, setFilters] = useState({
    dateType: '',
    startDate: '',
    endDate: '',
    week: '',
    month: '',
    skill: '',
    category1: '',
    category2: ''
  })
  const [currentPage, setCurrentPage] = useState('dashboard') // 'dashboard' or 'combinations'

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Generate step metrics for all steps in the conversation flow
  const getFilteredStepMetrics = () => {
    const rootLabel = filters.category1 ? `${filters.category1} Payment` : 'Outgoing Payment'
    
    // Helper to generate metrics for a step
    const createStepMetric = (stepName, entered, left, nextLevel, drop, backToMenu, transfer) => ({
      step: stepName,
      entered,
      left,
      nextLevel,
      leftReasons: {
        drop,
        backToMainMenu: backToMenu,
        transfer
      }
    })

    const metrics = []
    
    // Root step - always show
    metrics.push(createStepMetric(rootLabel, 10000, 6500, 3500, 2500, 2000, 2000))
    
    // Determine which branches to show based on category2 filter
    const showTwint = !filters.category2 || filters.category2.toLowerCase() === 'twint'
    const showCard = !filters.category2 || filters.category2.toLowerCase() === 'card'
    const showAccount = !filters.category2 || filters.category2.toLowerCase() === 'account'
    
    // If no category2 filter, show all branches
    const showAllBranches = !filters.category2
    
    // Twint branch
    if (showTwint || showAllBranches) {
      metrics.push(createStepMetric('Twint', 3000, 0, 3000, 0, 0, 0))
      metrics.push(createStepMetric('Journey Completed', 3000, 1000, 2000, 500, 300, 200))
      metrics.push(createStepMetric('Feedback', 2000, 0, 2000, 0, 0, 0))
    }
    
    // Card branch
    if (showCard || showAllBranches) {
      metrics.push(createStepMetric('Card', 0, 0, 0, 0, 0, 0))
      metrics.push(createStepMetric('Status Check', 0, 0, 0, 0, 0, 0))
      metrics.push(createStepMetric('Journey Completed', 0, 0, 0, 0, 0, 0))
      metrics.push(createStepMetric('Feedback', 0, 0, 0, 0, 0, 0))
    }
    
    // Account/Method Inquiry branch
    if (showAccount || showAllBranches) {
      metrics.push(createStepMetric('Method Inquiry', 3000, 0, 3000, 0, 0, 0))
      metrics.push(createStepMetric('Account', 0, 0, 0, 0, 0, 0))
      metrics.push(createStepMetric('Entity Collection', 3000, 3000, 0, 1000, 1000, 1000))
      
      // Entity Collection sub-branches
      metrics.push(createStepMetric('Entity not Identified', 1000, 500, 500, 200, 200, 100))
      metrics.push(createStepMetric('Repaired', 500, 0, 500, 0, 0, 0))
      
      metrics.push(createStepMetric('No Payment Found', 1000, 500, 500, 200, 200, 100))
      metrics.push(createStepMetric('Repaired', 500, 0, 500, 0, 0, 0))
      
      metrics.push(createStepMetric('Payment Found', 1000, 200, 800, 50, 100, 50))
      metrics.push(createStepMetric('Payment List', 800, 100, 700, 30, 40, 30))
      metrics.push(createStepMetric('Journey Completed', 700, 0, 700, 0, 0, 0))
      
      // Two branches from Journey Completed
      metrics.push(createStepMetric('Feedback', 350, 0, 350, 0, 0, 0))
      metrics.push(createStepMetric('Additional Payment', 350, 100, 250, 30, 40, 30))
      metrics.push(createStepMetric('Journey Completed', 250, 0, 250, 0, 0, 0))
    }
    
    // Apply skill filter if set
    if (filters.skill) {
      return metrics.filter(metric => {
        const stepLower = metric.step.toLowerCase()
        const skillLower = filters.skill.toLowerCase()
        // Show root and steps that match the skill context
        return stepLower.includes(rootLabel.toLowerCase()) || 
               stepLower.includes(skillLower) ||
               stepLower.includes('journey completed') ||
               stepLower.includes('feedback') ||
               stepLower.includes('repaired') ||
               stepLower.includes('entity') ||
               stepLower.includes('payment') ||
               stepLower.includes('method') ||
               stepLower.includes('account') ||
               stepLower.includes('status') ||
               stepLower.includes('twint') ||
               stepLower.includes('card')
      })
    }
    
    return metrics
  }

  if (currentPage === 'combinations') {
    return (
      <div className="min-h-screen bg-white">
        <Navigation currentTab={currentTab} onTabChange={setCurrentTab} />
        <FlowCombinations onBack={() => setCurrentPage('dashboard')} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentTab={currentTab} onTabChange={setCurrentTab} />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-semibold text-gray-900 text-center mb-8">Monitoring</h1>
        
        <div className="space-y-6">

          {/* Filters */}
          <Filters filters={filters} onFilterChange={handleFilterChange} />
          
          {/* Conversation Flow Schema */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Conversation Flow</h2>
            <ConversationFlow 
              skill={filters.skill}
              category1={filters.category1}
              category2={filters.category2}
            />
          </div>

          {/* Step Metrics */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Step Metrics</h2>
            <StepMetrics 
              metrics={getFilteredStepMetrics()} 
              selectedStep={selectedStep}
              onStepSelect={setSelectedStep}
            />
          </div>

          {/* Detail Boxes */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Details</h2>
            <DetailBoxes />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

