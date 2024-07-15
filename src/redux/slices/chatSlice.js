import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import toast from 'react-hot-toast'

const initialState = {
  folders: [],
  message: '',
  botAnswer: '',
  showCitatationTabs: false,
  currentCitation: null,
  chatList: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
}

// Define async thunks
export const fetchFolders = createAsyncThunk('api/fetchFolders', async () => {
  console.log(`${import.meta.env.VITE_BACK_END_SERVER}/list-folders`)
  const response = await axios.post(
    `${import.meta.env.VITE_BACK_END_SERVER}/list-folders`
  )
  return response.data.folders
})

export const createDatabase = createAsyncThunk(
  'api/createDatabase',
  async ({ files, folderName }) => {
    const formData = new FormData()
    formData.append('folder_name', folderName)

    // Fetch Blob for each file URL and append to FormData
    for (const file of files) {
      const response = await fetch(file.url)
      const blob = await response.blob()
      formData.append('files', blob, file.name)
    }

    const response = await axios.post(
      `${import.meta.env.VITE_BACK_END_SERVER}/create-database`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    return response.data.message
  }
)

export const queryDatabase = createAsyncThunk(
  'api/queryDatabase',
  async payload => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACK_END_SERVER}/query`,
      payload
    )
    return { answer: response.data }
  }
)

// Create the slice
const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setShowCitationTab: (state, action) => {
      state.showCitatationTabs = action.payload
    },
    setCurrentCitationTab: (state, action) => {
      state.currentCitation = action.payload
    },
    setChatList: (state, action) => {
      state.chatList = action.payload
    }
  },
  extraReducers: builder => {
    builder
      // fetchFolders
      .addCase(fetchFolders.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchFolders.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.folders = action.payload
      })
      .addCase(fetchFolders.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      // createDatabase
      .addCase(createDatabase.pending, state => {
        state.status = 'loading'
      })
      .addCase(createDatabase.fulfilled, (state, action) => {
        console.log(action.payload)
        toast.success(action.payload)
        state.status = 'succeeded'
        state.message = action.payload
      })
      .addCase(createDatabase.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      // queryDatabase
      .addCase(queryDatabase.pending, state => {
        state.status = 'loading'
      })
      .addCase(queryDatabase.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.chatList.push(action.payload)
      })
      .addCase(queryDatabase.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

// Export the reducer to configure the store
export const { setShowCitationTab, setCurrentCitationTab, setChatList } =
  apiSlice.actions
export default apiSlice.reducer
