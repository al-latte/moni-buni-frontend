type Props = {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <div>
            <Header />
            <div className="container mx-auto flex-1 py-10">
            {children}
            </div>
            <Footer />
        </div>
    );
}

export default Layout;