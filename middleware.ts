

// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import next from 'next'

export function middleware(req: NextRequest) {

    if (req.nextUrl.pathname.startsWith('/api/entries/')) {
      const id = req.nextUrl.pathname.replace('/api/entries/', '')
      const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");
      if (!checkMongoIDRegExp.test(id)){
        const url = req.nextUrl.clone();
        url.pathname = '/api/bad-request';
        url.search = `?message=${ id } no es un id vàlid de Mongo`
        return NextResponse.rewrite(url)
      }
    }
    // Podem revidar la ruta que en viem per la request
    // console.log({req: req.nextUrl.pathname})
    return NextResponse.next()
}

//Supports both a single string value or an array of matchers
// export const config = {
//   // matcher: '/about/:path*'
//   matcher: ['/api/:path*']
// }
export const config = {
  matcher: [
   // '/api/:path*', 
    '/api/entries/:path/'
  ],
}

// export const config = {
//   matcher: '/api/:path*'
// }







