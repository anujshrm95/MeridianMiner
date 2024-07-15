import { useEffect, useState, useRef } from 'react'
import { Form, Input } from 'antd'
import uploadIcon from './../../assets/InputBar/uploadIcon.svg'
import sendIcon from './../../assets/InputBar/sendIcon.svg'
import Dragger from 'antd/es/upload/Dragger'
import { InboxOutlined } from '@ant-design/icons'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  createDatabase,
  queryDatabase,
  setChatList
} from '../../redux/slices/chatSlice'

const InputBar = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [files, setFiles] = useState([])
  const [folderExist, setFolderExist] = useState(false)
  const [directoryName, setDirectoryName] = useState(null)
  const [showFiles, setShowFiles] = useState(false)
  const chatList = useSelector(state => state.chat.chatList)
  const inputRef = useRef(null)

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const folder = queryParams.get('folder')
    setDirectoryName(folder)
    if (folder) {
      setFolderExist(true)
      setShowFiles(false)
    } else {
      setFolderExist(false)
      setShowFiles(true)
    }
  }, [location.search])

  useEffect(() => {
    const handleEnterPress = event => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        form.submit()
      }
    }

    if (inputRef.current) {
      inputRef.current.resizableTextArea.textArea.addEventListener(
        'keydown',
        handleEnterPress
      )
    }

    return () => {
      if (inputRef.current) {
        inputRef.current.resizableTextArea.textArea.removeEventListener(
          'keydown',
          handleEnterPress
        )
      }
    }
  }, [inputRef, form])

  const onFinish = values => {
    const { message } = values
    const fileBlobURLs = files.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file)
    }))
    if (message) {
      dispatch(setChatList([...chatList, { user_question: message }]))
      dispatch(
        queryDatabase({
          query_string: message,
          folder_name: directoryName
        })
      )
    } else {
      dispatch(
        createDatabase({
          files: fileBlobURLs,
          folderName: directoryName
        })
      )
      setFolderExist(false)
    }

    // Reset form fields and file list
    form.resetFields()
    setFiles([])
    setShowFiles(false)
  }

  const handleFileChange = info => {
    const fileList = info.fileList.map(file => file.originFileObj)
    setFiles(fileList)
    if (fileList.length > 0) {
      const path = fileList[0].webkitRelativePath
      const dirName = path.substring(0, path.indexOf('/'))
      setDirectoryName(dirName)
    } else {
      setDirectoryName(null)
    }
  }

  return (
    <Form
      form={form}
      name='chat_input'
      onFinish={onFinish}
      className='w-full m-auto bg-white rounded-lg shadow-lg flex  md:max-w-[400px] lg:max-w-[600px] xl:max-w-[800px]'
    >
      <div className='flex p-4 gap-2 w-full flex-col '>
        {showFiles ? (
          <Dragger
            onChange={handleFileChange}
            directory
            name='file'
            className={`md:max-h-[100px] lg:max-h-[200px] flex gap-4 ${
              directoryName ? '' : 'input_box'
            }`}
            beforeUpload={() => {
              return false
            }}
            style={{
              border: '2px dashed #d9d9d9',
              borderRadius: '6px'
            }}
          >
            <p className='ant-upload-drag-icon'>
              <InboxOutlined />
            </p>
            <p className='ant-upload-text'>
              Click or drag file to this area to upload
            </p>
            <p className='ant-upload-hint'>
              Support for a single or bulk upload.
            </p>
          </Dragger>
        ) : (
          <></>
        )}

        <div className='flex justify-between gap-2'>
          {folderExist ? (
            <></>
          ) : (
            <img
              onClick={() => setShowFiles(prev => !prev)}
              src={uploadIcon}
              alt='uploadIcon'
              style={{ cursor: 'pointer' }}
            />
          )}

          {showFiles ? (
            <></>
          ) : (
            <Form.Item
              name='message'
              rules={[{ required: false, message: 'Please enter a message' }]}
              className='w-full m-0'
            >
              <Input.TextArea
                autoSize={{ minRows: 1, maxRows: 10 }}
                placeholder='chat with Your Data here or Try Existing Database...'
                className='rounded-md w-full my-0 border-none p-4'
                ref={inputRef}
              />
            </Form.Item>
          )}

          <button type='submit'>
            <img src={sendIcon} alt='sendIcon' />
          </button>
        </div>
      </div>
    </Form>
  )
}

export default InputBar
