// import { useState, useRef, useEffect } from 'react'
// import { useSelector } from 'react-redux'

// const PDFViewer = () => {
//   const currentCitation = useSelector(state => state.chat.currentCitation)
//   const { file_link, page_numbers } = currentCitation
//   const [url, setUrl] = useState('')

//   const iframeRef = useRef(null)
//   useEffect(() => {
//     if (iframeRef.current) {
//       setUrl('')
//       setTimeout(() => {
//         setUrl(`${file_link}#page=${page_numbers}`)
//       }, 10) // short delay to force iframe reload
//     }
//   }, [page_numbers, file_link])
//   // onClick={() => jumpToPage(index + 1)}
//   return (
//     <div>
//       <iframe
//         ref={iframeRef}
//         src={url}
//         width='950'
//         height='950'
//         title='PDF Viewer'
//       ></iframe>
//     </div>
//   )
// }

// export default PDFViewer
import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

const PDFViewer = () => {
  const currentCitation = useSelector(state => state.chat.currentCitation)
  const { file_link, page_numbers } = currentCitation
  const [url, setUrl] = useState('')

  const iframeRef = useRef(null)
  useEffect(() => {
    if (iframeRef.current) {
      setUrl('')
      setTimeout(() => {
        setUrl(`${file_link}#page=${page_numbers}`)
      }, 10) // short delay to force iframe reload
    }
  }, [page_numbers, file_link])

  return (
    <div className='pdf-container '>
      <iframe
        ref={iframeRef}
        src={url}
        className='pdf-iframe'
        title='PDF Viewer'
      ></iframe>
    </div>
  )
}

export default PDFViewer
