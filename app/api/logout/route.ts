'use server'

import { cookies } from 'next/headers'
import { NextApiRequest, NextApiResponse } from 'next'

export async function POST(request: NextApiRequest, res: NextApiResponse) {
  // Mock login API
  cookies().delete('user')
  return new Response('{}', {
    status: 200,
  })
}
