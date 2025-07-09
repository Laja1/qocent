import { Button, Header } from "@/components/shared"
import { PlusIcon } from "lucide-react"
import { Link } from "react-router-dom"

export const Billings = () => {
 
  return (
    <div>
       <Header title="Billings" description="Manage your server billings">
        <Link to="/create-new-site">
          <Button
            intent="tertiary"
            label="Create New Site"
            prefixIcon={<PlusIcon className="size-4" />}
            size="small"
          />
        </Link>
      </Header>
    </div>
  )
}
