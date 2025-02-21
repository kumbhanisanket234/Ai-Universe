import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;
    const token=request.cookies.get("token")?.value;
    
    if ((pathname.startsWith('/register-ai') || pathname.startsWith('/contact-us') || pathname.startsWith('/premium')) && !token) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/register-ai/:path*','/profile/:path*','/contact-us/:path*','/premium/:path*'],
};
