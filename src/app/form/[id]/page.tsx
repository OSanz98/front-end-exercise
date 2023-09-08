import React from 'react'
import EditForm from './EditForm';

export default async function ItemEditor({params} : {params: {id: string}}) {
  return(
    <div>
        <EditForm id={params.id}/>
    </div>
  )
}


