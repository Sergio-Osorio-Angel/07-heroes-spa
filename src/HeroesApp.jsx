import { AuthProvider } from "./auth";
import { AppRouter } from "./router/AppRouter";

export function HeroesApp() {
    return (
        <>
            <AuthProvider>
                <AppRouter></AppRouter>
            </AuthProvider>
        </>
    )
}
