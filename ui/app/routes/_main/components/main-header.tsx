import { signOut } from "@hono/auth-js/react"
import { Button } from "~/components/ui/button"

export default function MainHeader() {
  return (
    <header className="py-4 px-8 bg-gray-200 flex justify-end">
      <Button
        variant={"secondary"}
        onClick={() => {
          signOut()
          alert("ログアウトしました")
        }}
      >
        {"ログアウト"}
      </Button>
    </header>
  )
}
