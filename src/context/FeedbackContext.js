import { createContext, useEffect, useState } from 'react'
import FeedbackData from '../data/FeedbackData'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState(FeedbackData)
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch('/feedback?_sort=id&_order=desc')
      const data = await resp.json()

      setFeedback(data)
      setIsLoading(false)
    }

    fetchData()
  }, [])


  const addFeedback = async (newFeedback) => {
    await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFeedback)
    })

    setFeedback([newFeedback, ...feedback])
  }

  const editFeedback = (item) => {

    setFeedbackEdit({
      item,
      edit: true
    })
  }

  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem),
    })

    const data = await response.json()

    // NOTE: no need to spread data and item
    setFeedback(feedback.map((item) => (item.id === id ? data : item)))

    setFeedbackEdit({
      item: {},
      edit: false,
    })
  }

  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await fetch(`/feedback/${id}`, { method: 'DELETE' })
      setFeedback(feedback.filter(item => item.id !== id))
    }
  }

  return <FeedbackContext.Provider value={{
    feedback,
    isLoading,
    addFeedback,
    editFeedback,
    updateFeedback,
    deleteFeedback,
    feedbackEdit
  }}>
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext