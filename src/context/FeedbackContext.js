import { createContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
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
      const resp = await fetch('http://localhost:5000/feedback?_sort=id&_order=desc')
      const data = await resp.json()

      setFeedback(data)
      setIsLoading(false)
    }

    fetchData()
  }, [])


  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  const updateFeedback = (id, updItem) => {
    setFeedback(feedback.map(item => (item.id === id ? updItem : item)))
  }

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
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