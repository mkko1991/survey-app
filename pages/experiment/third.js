import "@/styles/first.css"
import {useRouter} from "next/router";

export default function Third() {
    const router = useRouter();

    const handleSubmit = (e) => {
        router.push('/experiment/third_chat');
    };

    return (
        <main className="main">
            <img className="background" src="/global/background.png"/>
            <img className="status" src="/global/status.png"/>
            <img className="center" src="/third/center.png"/>
            <img onClick={handleSubmit} className="button" src="/global/button.png"/>
        </main>
    );
}