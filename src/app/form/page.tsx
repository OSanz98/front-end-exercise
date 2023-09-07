// 'use client'
import React from 'react'
import UserForm from './UserFormPage'
import Card from '@/components/Card';
import ItemList from './ItemList';


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
