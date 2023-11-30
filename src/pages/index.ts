import { LazyExoticComponent, lazy } from "react"

const HomePage = lazy(() => import('./Home/Home'))
const CartPage = lazy(() => import('./Cart/Cart'))

const pages: {
    [key: string]: | LazyExoticComponent<(params?: any) => JSX.Element>;
} = {
    "/": HomePage,
    "/home": HomePage,
    "/cart": CartPage
}

export default pages
