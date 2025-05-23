import Image from 'next/image'
import Icon from "@/assets/image/chatbot.png"

const Navber = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm fixed top-0 z-1">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Chat Bot</a>
            </div>
            <div className="flex-none">

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                          <Image src={Icon} alt={"logo"} width={40} height={40} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Navber