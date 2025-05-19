import Navber from "../components/navber";
import ChatBox from "@/app/(home)/ChatBox";

export default function Home() {
    return (
        <>
            <Navber/>
            <main className={"bg-[#a9a9a957]"}>
                <ChatBox/>
            </main>
        </>
    )

}
