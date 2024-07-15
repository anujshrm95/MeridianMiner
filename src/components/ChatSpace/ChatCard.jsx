/* eslint-disable react/prop-types */
const ChatCard = ({ prompt }) => {
  return (
    <div className='cursor-pointer w-full xl:w-[250px] bg-gray-100 hover:bg-gray-200 duration-300 p-4 rounded-lg text-black font-medium'>
      {prompt}
    </div>
  )
}

export default ChatCard
