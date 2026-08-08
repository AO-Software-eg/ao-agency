import React from 'react'

function Contact() {
    return (
        <section className="w-full flex flex-col items-center justify-center gap-10">
            <h1>
                <h1>
                    wanna stay in touch ?
                </h1>
                <div>
                    <h3>
                        Join our newsletter to get the latest news, updates and special offers.
                    </h3>

                    <div>
                        <input type="email" placeholder="Enter your email" className="w-full h-12 rounded-md border border-[#D9D9D9] p-4" />
                        <button className="w-25 h-12 rounded-md bg-primary text-foreground font-bold">Subscribe</button>
                    </div>
                </div>
            </h1>
        </section>
    )
}

export default Contact