import React from 'react';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function AddData() {

    return (
        <>
            <div className="">
                <form></form>
                <button>Submit</button>
            </div>
            <Link href="/display-graph">View graph</Link>
            <Footer>Click me!</Footer>
        </>
    );
}
