import React from 'react';

const Layout = ({children}) => {
    return (
        <Container>
            <main>
                {children}
            </main>
        </Container>
    )
}