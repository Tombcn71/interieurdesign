import Image from "next/image";


export default () => {
    return (
        <section className="py-14 mb-20 mt-12">
             <div className="max-w-screen-xl mx-auto px-4 text-center mb-12 text-gray-600 md:px-8">
                <div className="max-w-2xl mx-auto mb-10">
                    <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
Interieurdesign met ai is handig voor iedereen                    </h3> </div>
                    <p className="mt-3 text-2xl text-teal-600">
Superhandig en leuk!                  </p>
                </div>
            <div className="max-w-screen-xl mx-auto md:px-8">
                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-2">
                    <div className="flex-1 sm:hidden lg:block">
                    <Image
                  alt="Original photo of a room with roomGPT.io"
                  src="/Diy.jpg"
                  className="w-full object-cover h-96 rounded-2xl"
                  width={400}
                  height={400}
                />                   
                    <div className="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
                        <h3 className="text-teal-600 ">
                           Persoonlijk gebruik
                        </h3>
                        <p className="text-gray-800 text-3xl  sm:text-4xl">
DIY                       </p>
                        <p className="mt-3 text-gray-600">
                       Interieur design met ai is ideaal voor persoonlijk gebruik, omdat het slimme algoritmen gebruikt om gepersonaliseerde en stijlvolle ontwerpen te creëren die van pinterest afkomstig zijn die passen bij je voorkeuren en de sfeer van je huis.                        </p>
                        </div>
                    </div>
                    <div className="flex-1 sm:hidden lg:block">
                    <Image
                  alt="Original photo of a room with roomGPT.io"
                  src="/Pro.jpg"
                  className="w-full object-cover h-96 rounded-2xl"
                  width={400}
                  height={400}
                />                    
                    <div className="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
                        <h3 className="text-teal-600 ">
Professioneel gebruik                        </h3>
                        <p className="text-gray-800 text-3xl  sm:text-4xl">
                           Professioneel 
                        </p>
                        <p className="mt-3 text-gray-600">
                        Interieur design met AI is ideaal voor professioneel gebruik, omdat het efficiënt ontwerpen en plannen kan genereren, waardoor interieurontwerpers en architecten tijd en moeite besparen en tegelijkertijd unieke en inspirerende ruimtes kunnen creëren.                        </p>
                       </div>
                    </div>
                </div>
            </div>
            
        </section>
    )
}