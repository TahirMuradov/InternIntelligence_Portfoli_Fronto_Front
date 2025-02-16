import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {


    const token = await getToken({ req: request, secret:process.env.SECRET_KEY });

let pathname:string[]=request.nextUrl.pathname.split("/");

    if ((pathname[2]=="login"||
      pathname[2]=="register"||
      pathname[2]=="forgotpassword"||
      pathname[2]=="emailconfirmed"
    )&&token) {
      return NextResponse.redirect(new URL('/', request.url));
    }

}
 
export const config = {

  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],

};