import type { ReactElement } from "react"

export type RouteType = {
    path: string,
    name: string,
    component: ReactElement,
    metadata?: Options,
}
type Options = {
    hasSidebar?: boolean,
    isAuthenticated?: [boolean, boolean] | boolean,
    redirectTo?: string,
    // dashboardProps?: DashboardLayoutProps
}
