export default function Contacts() {
    
    return (
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-semibold mb-8">Contact Us</h2>
                <form className="max-w-lg mx-auto">
                <input type="text" placeholder="Your Name" className="w-full p-4 mb-4 border border-gray-300 rounded-lg" />
                <input type="email" placeholder="Your Email" className="w-full p-4 mb-4 border border-gray-300 rounded-lg" />
                <textarea placeholder="Your Message" className="w-full p-4 mb-4 border border-gray-300 rounded-lg"></textarea>
                <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg">Send Message</button>
                </form>
            </div>
    );
}