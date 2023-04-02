import React, { useState, useEffect } from 'react'
import { getData } from '../APIs'
// import getData from 

export default function AddProduct() {
    const [productList, setProductList] = useState([])
    const [formData, setFormData] = useState({})
    const [editFormData, setEditFormData] = useState({})
    const [isEditing, setIsEditing] = useState({})
    console.log("🚀 ~ file: AddProduct.jsx:7 ~ AddProduct ~ ̥:", productList)

    useEffect(()=>{
        getData().then(({data})=>{
            setProductList(data?.products)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    const handleGetData = (e) => {
        e.preventDefault()
        getData().then(({data})=>{
            setProductList(data?.products)
        }).catch((err)=>{
            console.log(err)
        })
    }

    
    
  return (
    <main>
        <div className="d-flex">
            <div>


        <button onClick={handleGetData} >Get Product Data</button>
            </div>

            <form type="submit" onSubmit={(e)=>{
            e.preventDefault()
            setProductList(()=>([formData, ...productList]))
        }}>
            <label htmlFor="brand">Brand</label>
            <input type="text" id="brand" value={formData?.brand} onChange={(e)=>{
                setFormData(()=>({...formData, brand: e.target.value}))
            }} />

            <label htmlFor="category">category</label>
            <input type="text" id="category" value={formData?.category} onChange={(e)=>{
                setFormData(()=>({...formData, category: e.target.value}))
            }} />

            <label htmlFor="description">description</label>
            <input type="text" id="description" value={formData?.description} onChange={(e)=>{
                setFormData(()=>({...formData, description: e.target.value}))
            }} />

        <button type="submit">Add Product</button>

        </form>

        {
            Boolean(productList?.length) && productList?.map((product, index)=>{
                return <div key={product?.id} className="d-flex">
                    <h4>{product?.title}</h4>
                    <button onClick={()=>{
                        setIsEditing({title:product.title, description:product.description, price:product.price})
                    }}>edit</button>
                    {Boolean( isEditing?.title === product?.title && isEditing?.description === product?.description && isEditing?.price === product?.price) && <form type="submit" onSubmit={(e)=>{
                        e.preventDefault();
                        setProductList(()=>(
                            productList?.map((item)=>{
                                if(item?.title === isEditing?.title && item?.description === isEditing?.description && item?.price === isEditing?.price){
                                    return {...editFormData}
                                }else{
                                    return { ...item}
                                }}
                            )
                        ))
                    }}>
                    <label htmlFor="title">title</label>
            <input type="text" id="title" value={editFormData?.title} onChange={(e)=>{
                setEditFormData(()=>({...editFormData, title: e.target.value}))
            }} />

            <label htmlFor="description">description</label>
            <input type="text" id="description" value={editFormData?.description} onChange={(e)=>{
                setEditFormData(()=>({...editFormData, description: e.target.value}))
            }} />

<label htmlFor="price">price</label>
            <input type="text" id="price" value={editFormData?.price} onChange={(e)=>{
                setEditFormData(()=>({...editFormData, price: e.target.value}))
            }} />
        <button type="submit">Edit Product</button>

                    </form>}
                    <button onClick={(e)=>{
                        e.preventDefault()
                        setProductList(()=>(
                            productList?.filter((each)=>each?.brand !== product?.brand && each?.description !== product?.description)
                        ))
                    }}>Delete</button>
                </div>
            })
        }

       
            </div>
    </main>
  )
}
