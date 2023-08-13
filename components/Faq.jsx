"use client"

import { useRef, useState } from "react"

const FaqsCard = (props) => {

    const answerElRef = useRef()
    const [state, setState] = useState(false)
    const [answerH, setAnswerH] = useState('0px')
    const { faqsList, idx } = props

    const handleOpenAnswer = () => {
        const answerElH = answerElRef.current.childNodes[0].offsetHeight
        setState(!state)
        setAnswerH(`${answerElH + 20}px`)
    }

    return (
        <div
            className="space-y-3 mt-5 overflow-hidden border-b"
            key={idx}
            onClick={handleOpenAnswer}
        >
            <h4 className="cursor-pointer pb-5 flex items-center justify-between text-lg text-gray-700 font-medium">
                {faqsList.q}
                {
                    state ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    )
                }
            </h4>
            <div
                ref={answerElRef} className="duration-300"
                style={state ? { height: answerH } : { height: '0px' }}
            >
                <div>
                    <p className="text-gray-500">
                        {faqsList.a}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default () => {

    const faqsList = [
        {
            q: "Wat is interieurdesign.ai?",
            a: "Interieurdesign.ai is een applicatie waarmee je kan zien hoe een andere stijl  interieur in jouw huis er uitziet."
        },
        {
            q: "Hoe werkt interieurdesign.ai?",
            a: "Je neemt een foto van bijvoorbeeld je woonkamer, daarna selecteer je de kamer(in dit geval woonkamer) waarop je een andere stijl wil proberen, daarna selecteer je een stijl bijvoorbeeld mininmalistisch je upload de foto van je originele woonkamer en wacht 10 seconden, hierna zie je het resultaat."
        },
        {
            q: "Wat kost het?",
            a: "Je krijgt 1 design gratis, daarna kun je al instappen vanaf 9€ waarvoor je 30 designs krijgt er zijn ook bundels van 19€ waarvoor je 100 credits krijgt en 29€ waarvoor je 200 credits krijgt wanneer je dus iets meer betaald krijg je meer voordeel ."
        },
        {
            q: "Zit ik ergens aan vast wanneer ik credits koop? ",
            a: "Nee je zit nergens aan vast je betaald  1 keer voor je credits en als deze op zijn beslis ji alleen wanneer je weer nieuwe wilt kopen."
        },
        {
            q: "Waar komen de foto's vandaan?",
            a: "De foto' zijn afkomstig van het internet wij hebben de a.i. zo ingesteld dat hij de mooiste foto's van hoofdzakelijk pinterest gebruikt, zodoende ben je verzekerd van de laatste trends en de mooiste foto's."
        },
        {
            q: "Mag ik de credits ook voor het huis van vrienden of familie gebruiken?",
            a: "Ja hoor je bent vrij om waar dan ook jouw credits te gebruiken."
        },
        {
            q: "Ben ik eigenaar van de resultaten?",
            a: "Jazeker direct nadat het resultaat zichtbaar is kun je deze direct downloaden om bijvoorbeeld te delen met vrienden of familie, later kun je ze ook in je persoonlijke dashboard bekijken en downloaden."
        },
        {
            q: "Mag ik de foto's ook voor commercieel gebruik gebruiken",
            a: "Ja dat mag daar jij de eigenaar van deze foto's bent ."
        },
        {
            q: "Gebruiken jullie of anderen foto's van mijn interieur?",
            a: "Nee jouw data in dit geval de foto's van jouw huis worden nooit met anderen personen of partijen gedeeld jij bepaald zelf met wie jij je data deeld."
        },
        {
            q: "Waarom zijn de keuzes voor welke kamer ik wil invoeren en de interieurstijlen in het engels?",
            a: "Omdat er veel meer engels dan nederlands word gesproken in de wereld is er ook meer content over interieur aanwezig op het internet in het engels, daarom geven wij de a.i. opdracht te zoeken in het engels om op deze manier de beste resultaten te kunnen leveren."
        },

    ]

    return (
        <section id='Faq' className="leading-relaxed  max-w-screen-xl mt-12 mx-auto px-4 mb-20 md:px-8">
            <div className="space-y-3 text-center">
                <h1 className="text-4xl text-gray-800 ">
                    Veel gestelde vragen                </h1>
                <p className="text-gray-600 max-w-lg mx-auto text-lg">
                    We hebben geprobeerd zoveel mogelijke vragen te beantwoorden, staat jouw vraag er niet bij? Neem dan contact met ons op. We horen het graag!                </p>
            </div>
            <div className="mt-14 max-w-2xl mx-auto">
                {
                    faqsList.map((item, idx) => (
                        <FaqsCard
                            idx={idx}
                            faqsList={item}
                        />
                    ))
                }
            </div>
        </section>
    )
}