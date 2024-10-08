import React, { useEffect } from "react"
import { toast } from "react-toastify"

interface ErrorAlertProps {
  message: string
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  useEffect(() => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }, [message])

  return (
    <div
      className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
      role="alert"
    >
      <div className="flex">
        <div className="py-1">
          <i className="fas fa-exclamation-triangle text-red-500 mr-4"></i>
        </div>
        <div>
          <p className="font-bold">Error</p>
          <p>{message}</p>
        </div>
      </div>
    </div>
  )
}

export default ErrorAlert
