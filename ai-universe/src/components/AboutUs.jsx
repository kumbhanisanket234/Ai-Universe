// components/About.js
import React from 'react';

const AboutUs = () => {
    return (
        <div className="max-w-[1400px] mx-auto px-6 py-10">
            <header className="text-center mb-16 relative">
                <img
                    src="https://via.placeholder.com/120"
                    alt="AI Nexus Logo"
                    className="w-30 h-30 mb-6 mx-auto"
                />
                <h1 className="text-white text-4xl sm:text-5xl font-bold mb-4 relative inline-block">
                    AI Nexus
                    <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-400 to-teal-400"></div>
                </h1>
                <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto">
                    Pioneering the Future of AI Device Registration and Management in the Era of Artificial General Intelligence
                </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
                <div className="bg-gray-800 p-8 rounded-2xl transform transition-transform duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden">
                    <div className="text-4xl mb-6 bg-gradient-to-br from-pink-400 to-teal-400 bg-clip-text text-transparent">🔗</div>
                    <h2 className="text-2xl text-white mb-4">Seamless Integration</h2>
                    <p className="text-gray-400">Our cutting-edge platform effortlessly connects and manages your AI devices, creating a unified ecosystem for optimal performance and collaboration. Experience the power of true AI synergy.</p>
                </div>
                <div className="bg-gray-800 p-8 rounded-2xl transform transition-transform duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden">
                    <div className="text-4xl mb-6 bg-gradient-to-br from-pink-400 to-teal-400 bg-clip-text text-transparent">🛡️</div>
                    <h2 className="text-2xl text-white mb-4">Quantum-Level Security</h2>
                    <p className="text-gray-400">Utilizing state-of-the-art quantum encryption, we ensure your AI devices and data remain impenetrable, setting new standards in cybersecurity. Stay ahead of threats with our adaptive defense systems.</p>
                </div>
                <div className="bg-gray-800 p-8 rounded-2xl transform transition-transform duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden">
                    <div className="text-4xl mb-6 bg-gradient-to-br from-pink-400 to-teal-400 bg-clip-text text-transparent">📊</div>
                    <h2 className="text-2xl text-white mb-4">Intelligent Analytics</h2>
                    <p className="text-gray-400">Harness the power of meta-learning algorithms to gain unprecedented insights into your AI network, optimizing efficiency and driving innovation. Transform data into actionable strategies.</p>
                </div>
                <div className="bg-gray-800 p-8 rounded-2xl transform transition-transform duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden">
                    <div className="text-4xl mb-6 bg-gradient-to-br from-pink-400 to-teal-400 bg-clip-text text-transparent">🌐</div>
                    <h2 className="text-2xl text-white mb-4">Global Compliance Mastery</h2>
                    <p className="text-gray-400">Navigate the complex world of international AI regulations with ease. Our adaptive compliance engine keeps you ahead of the curve, always. Expand globally with confidence.</p>
                </div>
            </div>

            <section className="my-20 text-center">
                <h2 className="text-3xl text-white mb-10">Our Journey</h2>
                <div className="relative max-w-4xl mx-auto">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1.5 bg-gradient-to-b from-pink-400 to-teal-400 h-full"></div>
                    <div>
                        <div className="">
                            <div className='flex flex-wrap w-full gap-4 justify-around mb-3'>

                                <div className="max-w-[333px] w-full sm:w-1/2">
                                    <div className="bg-gray-800 p-6 rounded-lg">
                                        <h3 className="text-2xl text-white">2026</h3>
                                        <p className="text-gray-400">Launch of our groundbreaking quantum-encrypted registration system</p>
                                    </div>
                                </div>
                                <div>

                                </div>
                            </div>
                            <div className='flex flex-wrap w-full gap-4 justify-around mb-3'>
                                <div>

                                </div>
                                <div className="max-w-[333px] w-full sm:w-1/2">
                                    <div className="bg-gray-800 p-6 rounded-lg">
                                        <h3 className="text-2xl text-white">2026</h3>
                                        <p className="text-gray-400">Launch of our groundbreaking quantum-encrypted registration system</p>
                                    </div>
                                </div>

                            </div>
                            <div className='flex flex-wrap w-full gap-4 justify-around mb-3'>

                                <div className="max-w-[333px] w-full sm:w-1/2">
                                    <div className="bg-gray-800 p-6 rounded-lg">
                                        <h3 className="text-2xl text-white">2026</h3>
                                        <p className="text-gray-400">Launch of our groundbreaking quantum-encrypted registration system</p>
                                    </div>
                                </div>
                                <div>

                                </div>
                            </div>
                            <div className='flex flex-wrap w-full gap-4 justify-around mb-3'>
                                <div>

                                </div>
                                <div className="max-w-[333px] w-full sm:w-1/2">
                                    <div className="bg-gray-800 p-6 rounded-lg">
                                        <h3 className="text-2xl text-white">2026</h3>
                                        <p className="text-gray-400">Launch of our groundbreaking quantum-encrypted registration system</p>
                                    </div>
                                </div>

                            </div>
                            <div className='flex flex-wrap w-full gap-4 justify-around mb-3'>

                                <div className="max-w-[333px] w-full sm:w-1/2">
                                    <div className="bg-gray-800 p-6 rounded-lg">
                                        <h3 className="text-2xl text-white">2026</h3>
                                        <p className="text-gray-400">Launch of our groundbreaking quantum-encrypted registration system</p>
                                    </div>
                                </div>
                                <div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="my-20 text-center">
                <h2 className="text-3xl text-white mb-10">Meet Our Visionaries</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                    <div className="text-center">
                        <img className="w-36 h-36 rounded-full mx-auto mb-4" src="https://img.freepik.com/free-photo/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.jpg?uid=R182383671&ga=GA1.1.507510115.1735043277&semt=ais_hybrid" alt="Dr. Aisha Patel" />
                        <h3 className="text-xl text-white">Dr. Aisha Patel</h3>
                        <p className="text-gray-400">Founder & CEO</p>
                    </div>
                    <div className="text-center">
                        <img className="w-36 h-36 rounded-full mx-auto mb-4" src="https://img.freepik.com/free-photo/lifestyle-beauty-fashion-people-emotions-concept-young-asian-female-office-manager-ceo-with-pleased-expression-standing-white-background-smiling-with-arms-crossed-chest_1258-59329.jpg?uid=R182383671&ga=GA1.1.507510115.1735043277&semt=ais_hybrid" alt="Dr. Jamal Chen" />
                        <h3 className="text-xl text-white">Dr. Jamal Chen</h3>
                        <p className="text-gray-400">Chief AI Architect</p>
                    </div>
                    <div className="text-center">
                        <img className="w-36 h-36 rounded-full mx-auto mb-4" src="https://img.freepik.com/free-photo/surprised-smiling-curly-girl-white-wall_176420-178.jpg?uid=R182383671&ga=GA1.1.507510115.1735043277&semt=ais_hybrid" alt="Sarah O'Connor" />
                        <h3 className="text-xl text-white">Sarah O'Connor</h3>
                        <p className="text-gray-400">Head of Global Compliance</p>
                    </div>
                    <div className="text-center">
                        <img className="w-36 h-36 rounded-full mx-auto mb-4" src="https://img.freepik.com/premium-photo/handsome-isolated-wall-with-fingers-crossing_1368-36995.jpg?uid=R182383671&ga=GA1.1.507510115.1735043277&semt=ais_hybrid" alt="Dr. Yuki Tanaka" />
                        <h3 className="text-xl text-white">Dr. Yuki Tanaka</h3>
                        <p className="text-gray-400">Quantum Security Lead</p>
                    </div>
                </div>
            </section>

            <section className="my-20 text-center">
                <h2 className="text-3xl text-white mb-6">What Our Partners Say</h2>
                <div className="bg-gray-800 p-10 rounded-2xl text-left mx-auto max-w-3xl">
                    <p className="text-gray-400">
                        "AI Nexus has transformed the way we manage our AI infrastructure. Their platform's intuitive design and powerful features have significantly improved our operational efficiency and compliance adherence."
                    </p>
                    <div className="flex items-center mt-6">
                        <img src="https://via.placeholder.com/60" alt="John Doe" className="w-15 h-15 rounded-full mr-4" />
                        <div>
                            <h3 className="text-xl text-white">John Doe</h3>
                            <p className="text-gray-400">CTO, TechGiant Corp</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="my-20 text-center bg-gradient-to-br from-pink-400 to-teal-400 p-12 rounded-2xl">
                <h2 className="text-3xl text-white mb-6">Shape the Future of AI</h2>
                <p className="text-gray-100 text-lg max-w-2xl mx-auto mb-6">
                    Join the vanguard of the AI revolution. With AI Nexus, you're not just registering devices; you're pioneering the next era of intelligent technology. Be part of the movement that's defining the future of artificial general intelligence.
                </p>
                <a href="#" className="inline-block bg-gradient-to-r from-pink-400 to-teal-400 text-white py-3 px-8 rounded-full text-lg font-semibold transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                    Embark on Your AI Journey
                </a>
            </section>
        </div>
    );
};

export default AboutUs;
