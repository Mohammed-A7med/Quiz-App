import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "../../../../store/store"
import { useEffect, useState } from "react"
import {
  addQuestion,
  deleteQuestion,
  fetchAllQuestions,
  updateQuestion,
  Question,
} from "../../../../store/Slices/QuestionSlice"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import ErrorAlert from "../../../../utils/ErrorAlert"
import Button from "../../../../utils/components/Button"
import LoadingSpinner from "../../../../utils/components/loader"
import * as Yup from "yup"
import { useFormik } from "formik"
import Modal from "react-modal"
import Input from "../../../../utils/components/Input"
import Textarea from "../../../../utils/components/Textarea"
import Select from "../../../../utils/components/Select"

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
}

const initialFormValues = {
  title: "",
  description: "",
  options: {
    A: "",
    B: "",
    C: "",
    D: "",
  },
  answer: "",
  difficulty: "",
  type: "",
}

const validationSchema = Yup.object({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  options: Yup.object({
    A: Yup.string().required("Required"),
    B: Yup.string().required("Required"),
    C: Yup.string().required("Required"),
    D: Yup.string().required("Required"),
  }),
  answer: Yup.string()
    .oneOf(["A", "B", "C", "D"], "Invalid Answer")
    .required("Required"),
  type: Yup.string().required("Required"),
  difficulty: Yup.string().required("Required"),
})

export default function QuestionsList() {
  const dispatch = useDispatch<AppDispatch>()
  const { questions, loading, error } = useSelector(
    (state: AppState) => state.questions
  )

  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add")
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  )

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema,
    onSubmit: (values) => {
      if (modalMode === "add") {
        dispatch(
          addQuestion({
            answer: values.answer,
            description: values.description,
            difficulty: values.difficulty,
            options: values.options,
            title: values.title,
            type: values.type,
          })
        ).then((res) => {
          const payload = res.payload as { message?: string }
          if (payload.message) {
            toast.success(payload.message)
            closeModal()
          } else {
            toast.error("Error Adding A Question")
          }
        })
      } else if (modalMode === "edit" && selectedQuestion) {
        dispatch(
          updateQuestion({
            id: selectedQuestion._id!,
            data: {
              answer: values.answer,
              description: values.description,
              difficulty: values.difficulty,
              options: values.options,
              title: values.title,
              type: values.type,
            },
          })
        ).then((res) => {
          const payload = res.payload as { message?: string }
          if (payload.message) {
            toast.success(payload.message)
            closeModal()
          } else {
            toast.error("Error Updating Question")
          }
        })
      }
    },
  })

  function openModal(mode: "add" | "edit" | "view", question?: Question) {
    setModalMode(mode)
    if (question) {
      setSelectedQuestion(question)
      formik.setValues(question)
    } else {
      setSelectedQuestion(null)
      formik.resetForm()
    }
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
    setSelectedQuestion(null)
    formik.resetForm()
  }

  useEffect(() => {
    dispatch(fetchAllQuestions())
  }, [dispatch])

  if (loading) return <LoadingSpinner />

  if (error) {
    return <ErrorAlert message={error} />
  }

  return (
    <div className="p-4 border-2 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Bank Of Questions</h1>
        <Button
          className="m-3"
          icon={<i className="fa-solid fa-circle-plus"></i>}
          text="Add Question"
          onClick={() => openModal("add")}
        />
      </div>

      <motion.table
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-w-full border-collapse border border-gray-200"
      >
        <thead>
          <tr className="bg-gray-200">
            <motion.th
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1 }}
              className="border bg-black text-white p-2"
            >
              Question Title
            </motion.th>
            <motion.th
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="border bg-black text-white p-2"
            >
              Question Desc
            </motion.th>
            <motion.th
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border bg-black text-white p-2"
            >
              Question Difficulty Level
            </motion.th>
            <motion.th
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="border bg-black text-white p-2 min-w-48"
            >
              Actions
            </motion.th>
          </tr>
        </thead>

        <tbody>
          {questions.map((q) => (
            <motion.tr
              key={q._id}
              className="hover:bg-gray-100 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.td
                initial={{ opacity: 0, y: -60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="border border-gray-300 p-2"
              >
                {q.title}
              </motion.td>
              <motion.td
                initial={{ opacity: 0, y: -60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="border border-gray-300 p-2"
              >
                {q.description}
              </motion.td>
              <motion.td
                initial={{ opacity: 0, y: -60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="border border-gray-300 p-2"
              >
                {q.difficulty}
              </motion.td>
              <motion.td
                initial={{ opacity: 0, y: -60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="border border-gray-300 p-2 text-center"
              >
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => openModal("view", q)}
                >
                  <i className="fas fa-eye"></i>
                </button>
                <button
                  className="text-orange-500 hover:underline mx-2"
                  onClick={() => openModal("edit", q)}
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => {
                    dispatch(deleteQuestion(q?._id!)).then((res) => {
                      const payload = res.payload as { message?: string }
                      if (payload.message) {
                        toast.success(payload.message)
                      }
                    })
                  }}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </motion.td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>

      {/* Dynamic Modal for Add, Edit, and View */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {modalMode === "add"
              ? "Add Question"
              : modalMode === "edit"
              ? "Edit Question"
              : "View Question"}
          </h2>
          <button onClick={closeModal}>
            <i className="fa-regular fa-circle-xmark text-2xl"></i>
          </button>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Input
            type="text"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
            className="mt-4"
            label="Title"
            disabled={modalMode === "view"}
          >
            <>{formik.errors.title ? <div>{formik.errors.title}</div> : null}</>
          </Input>

          <Textarea
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            className="mt-4"
            label="Description"
            disabled={modalMode === "view"}
          >
            <>
              {formik.errors.description ? (
                <div>{formik.errors.description}</div>
              ) : null}
            </>
          </Textarea>

          <div className="flex justify-center items-center gap-3">
            <Input
              type="text"
              name="options.A"
              onChange={formik.handleChange}
              value={formik.values.options.A}
              label="A"
              className="mt-4"
              disabled={modalMode === "view"}
            >
              <>
                {formik.errors.options?.A ? (
                  <div>{formik.errors.options.A}</div>
                ) : null}
              </>
            </Input>
            <Input
              type="text"
              name="options.B"
              onChange={formik.handleChange}
              value={formik.values.options.B}
              label="B"
              className="mt-4"
              disabled={modalMode === "view"}
            >
              <>
                {formik.errors.options?.B ? (
                  <div>{formik.errors.options.B}</div>
                ) : null}
              </>
            </Input>
          </div>
          <div className="flex justify-center items-center gap-3">
            <Input
              type="text"
              name="options.C"
              onChange={formik.handleChange}
              value={formik.values.options.C}
              label="C"
              className="mt-4"
              disabled={modalMode === "view"}
            >
              <>
                {formik.errors.options?.C ? (
                  <div>{formik.errors.options.C}</div>
                ) : null}
              </>
            </Input>
            <Input
              type="text"
              name="options.D"
              onChange={formik.handleChange}
              value={formik.values.options.D}
              label="D"
              className="mt-4"
              disabled={modalMode === "view"}
            >
              <>
                {formik.errors.options?.D ? (
                  <div>{formik.errors.options.D}</div>
                ) : null}
              </>
            </Input>
          </div>
          <Select
            name="difficulty"
            onChange={formik.handleChange}
            value={formik.values.difficulty}
            label="Difficulty"
            className="mt-4"
            width={36}
            options={[
              { value: "easy", label: "Easy" },
              { value: "medium", label: "Medium" },
              { value: "hard", label: "Hard" },
            ]}
            disabled={modalMode === "view"}
          >
            <>
              {formik.errors.difficulty ? (
                <div>{formik.errors.difficulty}</div>
              ) : null}
            </>
          </Select>
          <div className="flex items-center justify-between mt-4 gap-3">
            <Select
              name="answer"
              onChange={formik.handleChange}
              value={formik.values.answer}
              label="Right Answer"
              width={36}
              options={[
                { value: "A", label: "A" },
                { value: "B", label: "B" },
                { value: "C", label: "C" },
                { value: "D", label: "D" },
              ]}
              disabled={modalMode === "view"}
            >
              <>
                {formik.errors.answer ? (
                  <div>{formik.errors.answer}</div>
                ) : null}
              </>
            </Select>
            <Select
              name="type"
              onChange={formik.handleChange}
              value={formik.values.type}
              label="Type"
              width={22}
              options={[
                { value: "FE", label: "FE" },
                { value: "BE", label: "BE" },
                { value: "DO", label: "DO" },
              ]}
              disabled={modalMode === "view"}
            >
              <>{formik.errors.type ? <div>{formik.errors.type}</div> : null}</>
            </Select>
          </div>
          {modalMode !== "view" && (
            <Button
              type="submit"
              text={modalMode === "add" ? "Submit" : "Update"}
              className="mt-4 w-full"
            />
          )}
        </form>
      </Modal>
    </div>
  )
}
