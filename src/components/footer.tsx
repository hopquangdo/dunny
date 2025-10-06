import Link from "next/link"

export default function Footer() {
    return (
        <footer className="border-t border-border bg-background/60 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    {/* Column 1 */}
                    <div>
                        <h3 className="font-semibold text-lg mb-3">Dunny</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Practice English writing with real-time AI feedback. Build confidence and fluency one paragraph at a time.
                        </p>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="hover:text-primary transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/paragraphs" className="hover:text-primary transition-colors">
                                    Practice
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-primary transition-colors">
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h3 className="font-semibold text-lg mb-3">Stay Connected</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-6 border-t border-border text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Dunny. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
