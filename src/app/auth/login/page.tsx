'use client';

import { FakeLogin, Login } from '@/Services/AngoraDbService';
import React, { useState } from 'react'

export default function LoginPage() {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log("HelloSubmit", userName, password)

  const login = await FakeLogin(userName, password, false);

  const accessToken = login.accessToken;

  document.cookie = `accessToken=${accessToken}`

  }

  return (
    <form onSubmit={onSubmitHandler}>
      <input onChange={e => {setUserName(e.target.value)}} type="text"/>
      <input onChange={e => {setPassword(e.target.value)}} type="text"/>
      <button type='submit'>Login</button>
    </form>
  )
}
