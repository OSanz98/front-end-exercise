
import React from 'react'
import EditForm from './EditForm';
import { useRouter } from 'next/router';

export default function ItemEditor({params} : {params: {id: string}}) {

  

  return(
    <div>
        <EditForm id={params.id}/>
    </div>
  )
}
