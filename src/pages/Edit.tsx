import React from 'react'
import { useParams } from 'react-router-dom'

const Edit = () => {
    const id = useParams();
    console.log(id);
    const onEdit = (id:string | number)=>{
        
    }

    return (
        <>
            <div>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Price</label>
                        <input type="number" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Image</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Category</label>
                        <input type="text" className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary">Update Product</button>
                </form>
            </div>

        </>
    )
}

export default Edit