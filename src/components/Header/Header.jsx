import comapanyLogo from './../../assets/hero/comapanyLogo.png'
const Header = () => {
  return (
    <div className='bg-black px-4 z-[9999] md:px-8 lg:px-16 items-center flex w-full justify-between py-3 fixed top-0'>
      <div>
        <p className='text-grayLight text-lg sm:text-xl md:text-2xl'>
          GPT + Enterprise data
        </p>
      </div>
      <div>
        <img src={comapanyLogo} className='w-[150px]' />
      </div>
    </div>
  )
}

export default Header
