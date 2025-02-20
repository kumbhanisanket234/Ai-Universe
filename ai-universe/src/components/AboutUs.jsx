"use client"
import Image from "next/image"

export default function AINextLandingPage() {
    return (
        <div className="font-['Poppins',sans-serif] leading-relaxed text-[#E2E8F0] bg-[#0F172A] m-0 p-0">
            <div className="max-w-[1200px] mx-auto px-5 py-10">
                <Header />
                <FeatureGrid />
                <Timeline />
                <Team />
                <Testimonials />
                <CTA />
            </div>
        </div>
    )
}

function Header() {
    return (
        <header className="text-center mb-[60px] relative">
            <Image
                src="/https://via.placeholder.com/120"
                alt="AI Nexus Logo"
                width={120}
                height={120}
                className="mx-auto mb-5"
            />
            <h1 className="text-[3.5rem] text-[#F0F4F8] mb-5 relative inline-block after:content-[''] after:absolute after:bottom-[-10px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-[100px] after:h-1 after:bg-gradient-to-r after:from-[#FF6B6B] after:to-[#4ECDC4]">
                AI Nexus
            </h1>
            <p className="text-[1.2rem] text-[#A0AEC0] max-w-[600px] mx-auto">
                Pioneering the Future of AI Device Registration and Management in the Era of Artificial General Intelligence
            </p>
        </header>
    )
}

function FeatureGrid() {
    const features = [
        {
            icon: "🔗",
            title: "Seamless Integration",
            description:
                "Our cutting-edge platform effortlessly connects and manages your AI devices, creating a unified ecosystem for optimal performance and collaboration. Experience the power of true AI synergy.",
        },
        {
            icon: "🛡️",
            title: "Quantum-Level Security",
            description:
                "Utilizing state-of-the-art quantum encryption, we ensure your AI devices and data remain impenetrable, setting new standards in cybersecurity. Stay ahead of threats with our adaptive defense systems.",
        },
        {
            icon: "📊",
            title: "Intelligent Analytics",
            description:
                "Harness the power of meta-learning algorithms to gain unprecedented insights into your AI network, optimizing efficiency and driving innovation. Transform data into actionable strategies.",
        },
        {
            icon: "🌐",
            title: "Global Compliance Mastery",
            description:
                "Navigate the complex world of international AI regulations with ease. Our adaptive compliance engine keeps you ahead of the curve, always. Expand globally with confidence.",
        },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-[60px]">
            {features.map((feature, index) => (
                <div
                    key={index}
                    className="bg-[#1A202C] rounded-[20px] p-[30px] transition-all duration-300 hover:transform hover:-translate-y-[10px] hover:shadow-[0_20px_30px_rgba(0,0,0,0.2)] relative overflow-hidden group"
                >
                    <div
                        className="text-[3rem] mb-5"
                        style={{
                            backgroundImage: "linear-gradient(135deg, #FF6B6B, #4ECDC4)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        {feature.icon}
                    </div>
                    <h2 className="text-[1.8rem] text-[#F0F4F8] mb-5">{feature.title}</h2>
                    <p className="text-[#A0AEC0] text-[1rem]">{feature.description}</p>
                    <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_70%)] transform rotate-30 transition-transform duration-500 group-hover:rotate-0"></div>
                </div>
            ))}
        </div>
    )
}

function Timeline() {
    const events = [
        { year: "2025", description: "AI Nexus founded with a vision to revolutionize AI device management" },
        { year: "2026", description: "Launch of our groundbreaking quantum-encrypted registration system" },
        {
            year: "2027",
            description: "Expansion into global markets, opening offices in Silicon Valley, Tokyo, and London",
        },
        { year: "2028", description: "Introduction of AI-powered compliance engine, revolutionizing regulatory adherence" },
        { year: "2029", description: "Partnership with leading AI research institutions to advance AGI safety protocols" },
    ]

    return (
        <div className="mt-[100px] text-center">
            <h2 className="text-[2.5rem] text-[#F0F4F8] mb-[30px]">Our Journey</h2>
            <div className="relative max-w-[800px] mx-auto">
                <div className="absolute w-[6px] bg-gradient-to-b from-[#FF6B6B] to-[#4ECDC4] top-0 bottom-0 left-1/2 -ml-[3px]"></div>
                {events.map((event, index) => (
                    <div
                        key={index}
                        className={`p-[10px_40px] relative bg-transparent w-1/2 ${index % 2 === 0 ? "left-0" : "left-1/2"}`}
                    >
                        <div className="p-[20px_30px] bg-[#1A202C] relative rounded-[6px]">
                            <h2 className="text-[1.8rem] text-[#F0F4F8] mb-[20px]">{event.year}</h2>
                            <p className="text-[#A0AEC0]">{event.description}</p>
                        </div>
                        <div
                            className={`absolute w-[25px] h-[25px] right-[-17px] bg-[#1A202C] border-4 border-[#FF6B6B] top-[15px] rounded-full z-10 ${index % 2 !== 0 ? "left-[-16px]" : ""}`}
                        ></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function Team() {
    const team = [
        {
            name: "Dr. Aisha Patel",
            role: "Founder & CEO",
            image:
                "/https://img.freepik.com/free-photo/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.jpg?uid=R182383671&ga=GA1.1.507510115.1735043277&semt=ais_hybrid",
        },
        {
            name: "Dr. Jamal Chen",
            role: "Chief AI Architect",
            image:
                "/https://img.freepik.com/free-photo/lifestyle-beauty-fashion-people-emotions-concept-young-asian-female-office-manager-ceo-with-pleased-expression-standing-white-background-smiling-with-arms-crossed-chest_1258-59329.jpg?uid=R182383671&ga=GA1.1.507510115.1735043277&semt=ais_hybrid",
        },
        {
            name: "Sarah O'Connor",
            role: "Head of Global Compliance",
            image:
                "/https://img.freepik.com/free-photo/surprised-smiling-curly-girl-white-wall_176420-178.jpg?uid=R182383671&ga=GA1.1.507510115.1735043277&semt=ais_hybrid",
        },
        {
            name: "Dr. Yuki Tanaka",
            role: "Quantum Security Lead",
            image:
                "/https://img.freepik.com/premium-photo/handsome-isolated-wall-with-fingers-crossing_1368-36995.jpg?uid=R182383671&ga=GA1.1.507510115.1735043277&semt=ais_hybrid",
        },
    ]

    return (
        <div className="mt-[100px] text-center">
            <h2 className="text-[2.5rem] text-[#F0F4F8] mb-[30px]">Meet Our Visionaries</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[30px] mt-10">
                {team.map((member, index) => (
                    <div key={index} className="text-center">
                        <Image
                            src={member.image || "/placeholder.svg"}
                            alt={member.name}
                            width={150}
                            height={150}
                            className="w-[150px] h-[150px] rounded-full object-cover mx-auto mb-[15px]"
                        />
                        <h3 className="text-[#F0F4F8]">{member.name}</h3>
                        <p className="text-[#A0AEC0]">{member.role}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

function Testimonials() {
    return (
        <div className="mt-[100px] text-center">
            <h2 className="text-[2.5rem] text-[#F0F4F8] mb-[30px]">What Our Partners Say</h2>
            <div className="bg-[#1A202C] rounded-[20px] p-[30px] mt-10 text-left">
                <p className="text-[#E2E8F0]">
                    "AI Nexus has transformed the way we manage our AI infrastructure. Their platform's intuitive design and
                    powerful features have significantly improved our operational efficiency and compliance adherence."
                </p>
                <div className="flex items-center mt-5">
                    <Image
                        src="/https://via.placeholder.com/60"
                        alt="John Doe"
                        width={60}
                        height={60}
                        className="rounded-full mr-[15px]"
                    />
                    <div>
                        <h3 className="text-[#F0F4F8]">John Doe</h3>
                        <p className="text-[#A0AEC0]">CTO, TechGiant Corp</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function CTA() {
    return (
        <div className="text-center mt-20 py-[60px] px-0 bg-[linear-gradient(135deg,rgba(255,107,107,0.1),rgba(78,205,196,0.1))] rounded-[20px]">
            <h2 className="text-[2.5rem] text-[#F0F4F8] mb-5">Shape the Future of AI</h2>
            <p className="text-[#A0AEC0] text-[1.1rem] max-w-[600px] mx-auto mb-[30px]">
                Join the vanguard of the AI revolution. With AI Nexus, you're not just registering devices; you're pioneering
                the next era of intelligent technology. Be part of the movement that's defining the future of artificial general
                intelligence.
            </p>
            <a
                href="#"
                className="inline-block bg-[linear-gradient(90deg,#FF6B6B,#4ECDC4)] text-[#F0F4F8] py-[15px] px-[30px] rounded-[50px] no-underline font-semibold text-[1.1rem] transition-all duration-300 hover:transform hover:-translate-y-[3px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
            >
                Embark on Your AI Journey
            </a>
        </div>
    )
}

