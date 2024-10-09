import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  isRejectedWithValue,
} from "@reduxjs/toolkit"

import { QUESTION_URLs } from "../../constans/END_POINTS"
import axios from "../../utils/axiosInstance"

export interface Question {
  _id?: string
  title: string
  description: string
  options: QuestionOption
  answer: string
  difficulty: string
  points?: number
  type: string
}
interface QuestionsState {
  questions: Question[]
  question: Question | null
  loading: boolean
  error: string | null
  errorObject: any | null
}

interface QuestionOption {
  A: string
  B: string
  C: string
  D: string
}

const initialState: QuestionsState = {
  questions: [],
  question: null,
  loading: false,
  error: null,
  errorObject: null,
}

export const fetchAllQuestions = createAsyncThunk<Question[]>(
  "questions/fetchAll",
  async () => {
    const response = await axios.get<Question[]>(
      QUESTION_URLs.fetchAllQuestions
    )
    return response.data
  }
)

export const fetchQuestion = createAsyncThunk<Question, string>(
  "questions/fetchOne",
  async (id: string) => {
    const response = await axios.get<Question>(QUESTION_URLs.fetchQuestion(id))
    return response.data
  }
)
export const addQuestion = createAsyncThunk<Question, Question>(
  "questions/add",
  async (question: Question) => {
    const response = await axios.post<Question>(
      QUESTION_URLs.addQuestion,
      question
    )
    return response.data
  }
)

export const deleteQuestion = createAsyncThunk<string, string>(
  "questions/delete",
  async (id: string) => {
    try {
      const response = await axios.delete(QUESTION_URLs.deleteQuestion(id))
      return response.data
    } catch (error: any) {
      console.log(error)
      return isRejectedWithValue({
        message: error.response?.data?.message || "Error updating question",
        status: error.response?.status || 500,
      })
    }
  }
)
export const updateQuestion = createAsyncThunk<
  Question,
  {
    id: string
    data: Pick<
      Question,
      "answer" | "description" | "difficulty" | "options" | "title" | "type"
    >
  }
>("questions/update", async ({ id, data }) => {
  try {
    const response = await axios.put(QUESTION_URLs.updateQuestion(id), data)
    return response.data
  } catch (error: any) {
    console.log(error)
    return isRejectedWithValue({
      message: error.response?.data?.message || "Error updating question",
      status: error.response?.status || 500,
    })
  }
})

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllQuestions.pending, (state) => {
        state.loading = true
      })
      .addCase(
        fetchAllQuestions.fulfilled,
        (state, action: PayloadAction<Question[]>) => {
          state.loading = false
          state.questions = action.payload
        }
      )
      .addCase(fetchAllQuestions.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch questions"
        state.errorObject = action.error
      })
      .addCase(fetchQuestion.pending, (state) => {
        state.loading = true
      })
      .addCase(
        fetchQuestion.fulfilled,
        (state, action: PayloadAction<Question>) => {
          state.loading = false
          state.question = action.payload
        }
      )
      .addCase(fetchQuestion.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch the question"
        state.errorObject = action.error
      })
      .addCase(updateQuestion.pending, (state) => {
        state.loading = true
      })
      .addCase(
        updateQuestion.fulfilled,
        (state, action: PayloadAction<Question>) => {
          state.loading = false
          const index = state.questions.findIndex(
            (q) => q._id === action.payload._id
          )
          if (index !== -1) {
            state.questions[index] = action.payload
          }
        }
      )
      .addCase(updateQuestion.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to update the question"
        state.errorObject = action.error
      })
  },
})

export const { clearError } = questionSlice.actions
export default questionSlice.reducer
