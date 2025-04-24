import {useRouter} from "next/router";

export default function First() {
    const router = useRouter();

    const handleSubmit = (e) => {
        router.push('/experiment/first_chat');
    };

    return (
        <main className="first_main">
            <img className="first_background" src="/global/background.png"/>
            <img className="first_status" src="/global/status.png"/>
            <img className="first_center" src="/first/center.png"/>
            <img onClick={handleSubmit} className="first_button" src="/global/button.png"/>
        </main>
    );
}