import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {


    const token = await getToken({ req: request, secret:process.env.SECRET_KEY });

let pathname:string[]=request.nextUrl.pathname.split("/");

    if ((
      pathname[1]=="auth"
        )&&token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    if((
      pathname[1]=="dashboard"
      )&&!token){
      return NextResponse.redirect(new URL('/auth/login', request.url));

    }

}
 
export const config = {

  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],

};