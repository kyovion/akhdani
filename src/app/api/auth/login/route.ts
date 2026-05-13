import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

import db from '@/lib/prisma'
import { signJwt } from '@/lib/jwt'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const username = formData.get('username') as string
    const password = formData.get('password') as string

    if (!username || !password) {
      return NextResponse.json(
        {
          error: 'Username dan password wajib diisi',
        },
        {
          status: 400,
        }
      )
    }

    const user = await db.user.findUnique({
      where: {
        username,
      },
    })

    if (!user) {
      return NextResponse.json(
        {
          error: 'User tidak ditemukan',
        },
        {
          status: 401,
        }
      )
    }

    const isValidPassword = await bcrypt.compare(
      password,
      user.password
    )

    if (!isValidPassword) {
      return NextResponse.json(
        {
          error: 'Password salah',
        },
        {
          status: 401,
        }
      )
    }

    const token = signJwt({
      userId: user.id,
      username: user.username,
      role: user.role,
    })

    const response = NextResponse.redirect(
      new URL('/', req.url)
    )

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: 'Internal server error',
      },
      {
        status: 500,
      }
    )
  }
}