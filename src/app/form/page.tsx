// 'use client'
import React from 'react'
import UserForm from './UserFormPage'
import Card from '@/components/Card';
import ItemList from './ItemList';

/**
 * Displays the UserForm Component and ItemsList Component underneath it.
 * @returns A React Component
 */
export default function FormPage() {
  return (
    <main className="form-content">
      <Card>
        <UserForm />
        <ItemList />
      </Card>
    </main>
  )
}
