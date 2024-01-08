// This example uses `@web3forms/react` plugin and tailwindcss for css styling
"use client"


import Link from "next/link";

import Image from "next/image";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react";

export default function Contact() {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        control,
        setValue,
        formState: { errors, isSubmitSuccessful, isSubmitting },
    } = useForm({
        mode: "onTouched",
    });
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState(false);

    // Please update the Access Key in the .env
    const apiKey =
        process.env.PUBLIC_ACCESS_KEY || "791ff4c5-47a8-40df-87f4-81e4619d5086"

    const { submit: onSubmit } = useWeb3Forms({
        access_key: apiKey,
        settings: {
            from_name: "Interieurdesign.ai",
            subject: "Nieuw bericht van interieurdesign.ai",
        },
        onSuccess: (msg, data) => {
            setIsSuccess(true);
            setMessage(msg);
            reset();
        },
        onError: (msg, data) => {
            setIsSuccess(false);
            setMessage(msg);
        },
    });

    return (
        <main className="flex overflow-hidden ">
            <div className="grid  sm:grid-cols-2 lg:grid-cols-2 flex-1 hidden lg:block">
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
                <div className="max-w-lg flex-1 mx-auto px-4 text-gray-600">
                    <Link
                        href="/"
                        className="border-r border-gray-300 text-black pr-4 flex space-x-2 hover:text-teal-600 transition"></Link>

                    <div>
                        <h3
                            id="Contact"
                            className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                            Contact{" "}
                        </h3>
                        <p className="mt-3">
                            Heb je een vraag of suggestie? Vul het het formulier hier beneden
                            in. We horen graag van je!{" "}
                        </p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="my-10" >
                        <input
                            type="checkbox"
                            id=""
                            className="hidden"
                            style={{ display: "none" }}
                            {...register("botcheck")}></input>

                        <div className="mb-5">
                            <input
                                type="text"
                                placeholder="Naam"
                                autoComplete="false"
                                className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900   focus:ring-4  ${errors.name
                                    ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                                    : "border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
                                    }`}
                                {...register("name", {
                                    required: "Verplcht veld",
                                    maxLength: 80,
                                })}
                            />
                            {errors.name && (
                                <div className="mt-1 text-red-600">
                                    <small>{errors.name.message}</small>
                                </div>
                            )}
                        </div>

                        <div className="mb-5">
                            <label htmlFor="email_address" className="sr-only">
                                Email Address
                            </label>
                            <input
                                id="email_address"
                                type="email"
                                placeholder="Email"
                                name="email"
                                autoComplete="false"
                                className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900   focus:ring-4  ${errors.email
                                    ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                                    : "border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
                                    }`}
                                {...register("email", {
                                    required: "Verplicht veld",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Please enter a valid email",
                                    },
                                })}
                            />
                            {errors.email && (
                                <div className="mt-1 text-red-600">
                                    <small>{errors.email.message}</small>
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <textarea
                                name="message"
                                placeholder="Bericht"
                                className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white dark:placeholder:text-gray-200 dark:bg-gray-900   rounded-md outline-none  h-36 focus:ring-4  ${errors.message
                                    ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                                    : "border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
                                    }`}
                                {...register("message", {
                                    required: "Verplicht veld",
                                })}
                            />
                            {errors.message && (
                                <div className="mt-1 text-red-600">
                                    {" "}
                                    <small>{errors.message.message}</small>
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 font-semibold text-white transition-colors bg-teal-600 rounded-md hover:bg-teal-400 focus:outline-none focus:ring-offset-2 focus:ring focus:ring-gray-200 px-7 dark:bg-white dark:text-black ">
                            {isSubmitting ? (
                                <svg
                                    className="w-5 h-5 mx-auto text-white dark:text-black animate-spin"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24">
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                "Verstuur bericht"
                            )}
                        </button>
                    </form>
                    {isSubmitSuccessful && isSuccess && (
                        <div className="mt-3 text-sm text-center text-green-500">
                            {message || "Success. Je bericht is succesvol verzonden"}
                        </div>
                    )}
                    {isSubmitSuccessful && !isSuccess && (
                        <div className="mt-3 text-sm text-center text-red-500">
                            {message || "Something went wrong. Please try later."}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}