import React, { useState } from 'react'
import ConversationFlow from '../components/ConversationFlow'

const FlowCombinations = ({ onBack }) => {
  const skills = ['cards', 'payments', 'qna', 'fees']
  const category1 = ['Incoming', 'Outgoing', 'Refund', 'Unrecognize']
  const category2 = ['twint', 'card', 'account']

  const [selectedCombination, setSelectedCombination] = useState(null)

  // Generate all combinations
  const combinations = []
  skills.forEach(skill => {
    category1.forEach(cat1 => {
      category2.forEach(cat2 => {
        combinations.push({ skill, category1: cat1, category2: cat2 })
      })
    })
  })

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-semibold text-gray-900 text-center mb-8">Flow Combinations</h1>
        
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              All Combinations ({combinations.length} total)
            </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
            {combinations.map((combo, index) => (
              <div
                key={index}
                onClick={() => setSelectedCombination(combo)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedCombination?.skill === combo.skill &&
                  selectedCombination?.category1 === combo.category1 &&
                  selectedCombination?.category2 === combo.category2
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="font-semibold text-sm text-gray-800 mb-1">
                  {combo.category1} - {combo.skill.charAt(0).toUpperCase() + combo.skill.slice(1)}
                </div>
                <div className="text-xs text-gray-600">
                  Category 2: {combo.category2.charAt(0).toUpperCase() + combo.category2.slice(1)}
                </div>
              </div>
            ))}
          </div>

            {selectedCombination && (
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Flow for: {selectedCombination.category1} - {selectedCombination.skill.charAt(0).toUpperCase() + selectedCombination.skill.slice(1)} - {selectedCombination.category2.charAt(0).toUpperCase() + selectedCombination.category2.slice(1)}
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto border border-gray-200">
                  <ConversationFlow 
                    skill={selectedCombination.skill}
                    category1={selectedCombination.category1}
                    category2={selectedCombination.category2}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlowCombinations

