import PrimaryButton from "./components/PrimaryButton.jsx";

function NotFound() {
    return (
        <div className="min-h-[calc(70vh)] flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-5">
                <h1 className="text-3xl">Error 404</h1>
                <p className="text-lg">Oops! The page you're looking for doesn't exist.</p>
                <PrimaryButton text={
                    <div className="flex items-center justify-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.25 34.8334V19.0001H23.75V34.8334M4.75 14.2501L19 3.16675L33.25 14.2501V31.6667C33.25 32.5066 32.9164 33.3121 32.3225 33.9059C31.7286 34.4998 30.9232 34.8334 30.0833 34.8334H7.91667C7.07681 34.8334 6.27136 34.4998 5.6775 33.9059C5.08363 33.3121 4.75 32.5066 4.75 31.6667V14.2501Z" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Home
                    </div>
                } to={'/'} />
            </div>
        </div>
    )
}

export default NotFound