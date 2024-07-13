import { ReactNode } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

interface RootLayoutProps {
    children: ReactNode;
}

export const metadata = {
    description: "Perfil del conductor",
};

const ConductorLayout: React.FC<RootLayoutProps> = ({ children }) => {
    const router = useRouter();
    const { nombre } = router.query;
    return (
        <>
            <Head>
                <title>{nombre ? `Conductor: ${nombre}` : "Conductor"}</title>
                <meta name="description" content={metadata.description} />
            </Head>
            {children}
        </>
    );
};

export default ConductorLayout;
