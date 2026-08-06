import React from 'react'

function InfoCard() {
    return (
        <div className='w-[90%]  sm:w-[85%] lg:w-[75%] mx-auto my-10 py-10 rounded-xl flex flex-col overflow-hidden bg-background light:bg-white gap-4'>

                <p> {"{ What does AO do ? }"} </p>
                <div className='flex flex-row items-start justify-between gap-6 text-left'>
                    <h1 className="text-4xl font-bold leading-11">
                        AO designs and builds modern digital products that help businesses launch faster, scale confidently.
                    </h1>
                    <p className="text-lg font-thin leading-8 text-left w-[150%] lg:w-[100%]"> 
                        {"{ - From high performance websites and SaaS platforms to AI-powered solutions and custom software, we turn ambitious ideas into reliable, production-ready products. }"}
                    </p>
                </div>
            </div>
    )
}

export default InfoCard