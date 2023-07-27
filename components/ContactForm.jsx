import Link from "next/link";

import Image from "next/image";


export default function ContactForm() {
    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        formData.append("access_key", "791ff4c5-47a8-40df-87f4-81e4619d5086");

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: json
        });
        const result = await response.json();
        if (result.success) {
            console.log(result);
        }
    }


    return (
        <main className="flex overflow-hidden ">
            <div className="flex-1 hidden lg:block">
                <Image
                    alt="Original photo of a room with roomGPT.io"
                    src="/Diy.jpg"
                    className="w-full h-screen object-cover
"
                    width={400}
                    height={400}
                />
            </div>
            <div className="py-12 flex-1 lg:flex lg:justify-center lg:h-screen lg:overflow-auto">
                <div className="max-w-lg flex-1 mx-auto px-4 text-gray-600"><Link
                    href="/"
                    className="border-r border-gray-300 text-black pr-4 flex space-x-2 hover:text-teal-600 transition"
                >
                    <div>Terug naar de homepagina</div>

                </Link>

                    <div>
                        <h3 id='Contact' className="text-gray-800 mt-16 text-3xl font-semibold sm:text-4xl">
                            Contact                        </h3>
                        <p className="mt-3">
                            Heb je een vraag of suggestie? Vul het het formulier hier beneden in. We horen graag van je!                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-5 mt-12 lg:pb-12">
                        <div><label className="font-medium">
                            Naam

                            <input type="text" name="name" className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                            /></label> </div>
                        <div> <label className="font-medium">
                            Email

                            <input type="email" name="email" className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                            /> </label> </div>


                        <div><label className="font-medium">
                            Bericht
                        </label>
                            <textarea name="message" className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                            ></textarea> <label className="font-medium">
                            </label></div>
                        <button
                            className="w-full px-4 py-2 text-white font-medium bg-teal-600 hover:bg-teal-500 active:bg-teal-400 rounded-lg duration-150"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}