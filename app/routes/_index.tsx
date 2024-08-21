import type { MetaFunction } from "@remix-run/node"
import { useNavigate } from "@remix-run/react"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { signIn } from "@hono/auth-js/react"

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ]
}

export default function Index() {
  const navigate = useNavigate()

  const [loginId, setLoginId] = useState("")

  const [loginPassword, setLoginPassword] = useState("")

  const mutation = useMutation({
    async mutationFn() {
      const resp = await signIn("credentials", {
        email: loginId,
        password: loginPassword,
        redirect: false,
      })
      console.log("resp", resp)
      if (resp?.status !== 200) {
        throw new Error("ログインに失敗しました")
      }
      return null
    },
  })

  const onSubmit = async () => {
    try {
      const result = await mutation.mutateAsync()
      if (result === null) {
        navigate("/")
        return
      }
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message)
      }
    }
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
      >
        <input
          type={"text"}
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
        />
        <input
          type={"password"}
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button type={"submit"}>{"ログイン"}</button>
      </form>
    </div>
  )
}
