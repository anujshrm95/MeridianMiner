/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import menu from './../../assets/sidebar/menu.svg'
import addNew from './../../assets/sidebar/addNew.svg'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import {
  fetchFolders,
  setChatList,
  setCurrentCitationTab,
  setShowCitationTab
} from '../../redux/slices/chatSlice'
import { useNavigate, useLocation } from 'react-router-dom'

const FolderTab = ({ folderTab, isActive, onClick, className, icon }) => {
  return (
    <span
      onClick={onClick}
      className={`cursor-pointer flex items-center justify-between  ${
        isActive ? 'active_folder_tab' : 'folder_tab'
      }  ${className}`}
    >
      {folderTab}
      {icon ? <img src={addNew} alt='menu icon' /> : <></>}
    </span>
  )
}

const Sidebar = () => {
  const dispatch = useDispatch()
  const [isCollapsed, setIsCollapsed] = useState(true)
  const folderTabs = useSelector(state => state.chat.folders)
  const [activeTab, setActiveTab] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const handleTabClick = folderTab => {
    setActiveTab(folderTab)
    dispatch(setChatList([]))
    dispatch(setCurrentCitationTab(null))
    dispatch(setShowCitationTab(false))
    navigate(`/?folder=${folderTab}`)
  }

  const handleNewChat = () => {
    setActiveTab(null)
    navigate('/')
  }

  useEffect(() => {
    dispatch(fetchFolders())

    const params = new URLSearchParams(location.search)
    const tabName = params.get('folder')
    if (tabName) {
      setActiveTab(tabName)
    }
  }, [dispatch, location])

  return (
    <div
      className={`bg-black z-[10] pt-[76px] pb-[70px]  overflow-hidden max-h-screen h-full text-grayLight p-4 transition-width duration-300 ${
        isCollapsed ? 'w-16' : 'w-[260px]'
      }`}
    >
      <button onClick={toggleSidebar} className='mb-4'>
        <img src={menu} alt='menu icon' />
      </button>
      {/* Sidebar content */}
      {!isCollapsed && (
        <div className='flex flex-col  overflow-y-auto max-h-[calc(100vh-76px)] folder_tabs'>
          <FolderTab
            folderTab={'New Chat'}
            key={uuidv4()}
            className={'new_folder_tab'}
            isActive={'New Chat' === activeTab}
            onClick={handleNewChat}
            icon={true}
          />
          <div className='flex flex-col'>
            {folderTabs.map(folderTab => (
              <FolderTab
                folderTab={folderTab}
                key={uuidv4()}
                isActive={folderTab === activeTab}
                onClick={() => handleTabClick(folderTab)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Sidebar
