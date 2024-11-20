'use client';

import { CookieLogin } from '@/services/AuthLogin';
import React, { useState } from 'react'

export default function LoginPage() {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log("HelloSubmit", userName, password)

    CookieLogin(userName, password, false)
  }
  return (
    <form onSubmit={onSubmitHandler}>
      <input onChange={e => { setUserName(e.target.value) }} type="text" />
      <input onChange={e => { setPassword(e.target.value) }} type="text" />
      <button type='submit'>Login</button>
    </form>
  )
}
