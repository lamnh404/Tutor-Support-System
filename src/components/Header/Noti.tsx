import { Link } from 'react-router-dom'

interface NotiProps {
  noti: string
}

export default function Noti({ noti }: NotiProps) {
  return (
    <div className="w-full border-b border-[#ddd] box-border p-[5px] relative m-0 block text-inherit">
      <Link to={'/'}>
        {noti}
      </Link>
    </div>
  )
}
