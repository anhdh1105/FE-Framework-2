import React from 'react'
import { useForm } from 'react-hook-form'
import { IProduct } from '../interfaces/products'
import axios from 'axios'

type Props = {
    products: IProduct[],
    setProduct: (data: IProduct[]) => void
    // onAdd:(data:FormData)=>void;
}

function AddProduct({ products, setProduct }: Props) {
    const { register, handleSubmit, reset } = useForm<any>()
    const onSubmit = async (product: FormData) => {
        try {
            const { data } = await axios.post(`http://localhost:3000/products`, product)
            setProduct([...products, data]);
            alert('Success');
            reset();
        } catch (error) {
            alert(error)
        }
    }
    return (
        <>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" {...register("name")} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Price</label>
                        <input type="number" className="form-control" {...register('price')} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Image</label>
                        <input type="text" className="form-control" {...register('image')} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Category</label>
                        <input type="text" className="form-control" {...register('category')} />
                    </div>
                    <button type="submit" className="btn btn-primary">Add Product</button>
                </form>
            </div>
        </>

    )
}

export default AddProduct