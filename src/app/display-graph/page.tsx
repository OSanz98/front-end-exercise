import React from 'react';
import Footer from '../../components/Footer';
import type { IUserForm } from '../../resources/database.config';
import { headers } from 'next/headers';
import GraphItem from './GraphItem';
import Link from 'next/link';
import Card from '@/components/Card';

export default function DisplayGraph() {

    return (
        <main>
            <GraphItem />
        </main>
    );
}
