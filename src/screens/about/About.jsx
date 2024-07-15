import { useNavigate } from 'react-router-dom'
const About = () => {
  const navigate = useNavigate()
  return (
    <div>
      about
      <div
        onClick={() => {
          navigate('/')
        }}
      >
        home
      </div>
    </div>
  )
}

export default About
