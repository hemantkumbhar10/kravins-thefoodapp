import { Link, LinkProps } from 'react-router-dom';

interface Props extends LinkProps {
  linkname: string;
}

const CustomLink = ({ to, linkname, ...rest }: Props) => {
  return (
    <span className="tracking tracking-tight" {...rest} >
      <Link to={to} className='bg-white text-lg font-normal flex items-center rounded-md text-tomato px-3 hover:bg-gray-100 hover:scale-105 transition ease-linear duration-100'>{linkname}</Link>
    </span>

  )
}

export default CustomLink;