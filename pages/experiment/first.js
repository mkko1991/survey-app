import "@/styles/first.css"
import {useRouter} from "next/router";

export default function First() {
    const router = useRouter();

    const handleSubmit = (e) => {
        router.push('/experiment/first_chat');
    };

    return (
        <main className="main">
            <img className="background" src="/global/background.png"/>
            <img className="status" src="/global/status.png"/>
            <img className="center" src="/first/center.png"/>
            <img onClick={handleSubmit} className="button" src="/global/button.png"/>
        </main>
    );
}