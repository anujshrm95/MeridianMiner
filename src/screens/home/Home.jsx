import { Tabs } from 'antd'
import ChatSpace from '../../components/ChatSpace/ChatSpace'
import InputBar from '../../components/InputBar/InputBar'
import './Home.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  setChatList,
  setCurrentCitationTab,
  setShowCitationTab
} from '../../redux/slices/chatSlice'
import PDFViewer from '../../components/PDFViewer/PDFViewer'
import { CloseCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import ScrollToBottom from 'react-scroll-to-bottom'

const items = [
  {
    key: '1',
    label: 'Citations',
    children: <PDFViewer />
  }
]
const Operations = () => {
  const dispatch = useDispatch()
  const handleCloseCitation = () => {
    dispatch(setCurrentCitationTab(null))
    dispatch(setShowCitationTab(false))
  }
  return (
    <button onClick={handleCloseCitation} className='text-[16px]'>
      <CloseCircleOutlined /> Close
    </button>
  )
}

const CitationTabs = () => (
  <Tabs
    tabBarExtraContent={<Operations />}
    defaultActiveKey='1'
    items={items}
  />
)
const Home = () => {
  const dispatch = useDispatch()
  const showCitatationTabs = useSelector(state => state.chat.showCitatationTabs)
  const handleClearChat = () => {
    dispatch(setChatList([]))
    dispatch(setCurrentCitationTab(null))
    dispatch(setShowCitationTab(false))
  }
  return (
    <>
      <div className='h-screen relative w-full flex'>
        <button
          onClick={handleClearChat}
          className='fixed right-28 top-[86px] z-[100]'
        >
          <DeleteOutlined /> Clear Chat
        </button>
        <div className=' flex w-full h-full space-between '>
          <ScrollToBottom
            className={`max-h-[calc(100vh-200px)] pt-[76px] w-full  `}
          >
            <ChatSpace />
          </ScrollToBottom>
          <div
            className={`h-screen p-8 pt-[76px] ${
              showCitatationTabs ? 'w-full' : 'hidden'
            }`}
          >
            {showCitatationTabs ? <CitationTabs /> : <></>}
          </div>
        </div>

        <div className='w-full p-6 fixed bottom-0 right-0'>
          <InputBar />
        </div>
      </div>
    </>
  )
}

export default Home
