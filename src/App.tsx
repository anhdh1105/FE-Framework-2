import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { IProduct } from './interfaces/products';
import Edit from './pages/Edit';
import AddProduct from './pages/add';



function App() {
  const navigate = useNavigate;
  const { register, handleSubmit, reset } = useForm();
  const [products, setProduct] = useState<IProduct[]>([]);
  const [flag, setFlag] = useState<number | string>(0);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/products`);
        console.log(data);
        setProduct(data);

      } catch (error) {
        console.log(error);
      }
    })()
  }, [])

  const onSubmit = async (product: any) => {
    try {
      const { data } = await axios.post(`http://localhost:3000/products`, product);
      setProduct([...product, data]);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  const handleDelete = async (id: any) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      alert('Xoa thanh cong');
      setProduct([...products.filter(product => product.id !== id)])
    } catch (error) {
      console.log(error);

    }
  }
  const onUpdate = async (product: any) => {
    // console.log(data);
    try {
      const { data } = await axios.put("http://localhost:3000/products/" + flag, product)
      const newproduct = products.map(product => (product.id === flag) ? data : product)
      setProduct(newproduct)
      alert("Cập nhật thành công")
      setFlag(0)
    } catch (error) {
      alert(error)
    }

  }
  const onEdit = (id: number | string) => {
    setFlag(id);
    const [product] = products.filter(p => p.id == id);
    reset({
      name: product.name,
      image: product.image,
      price: product.price,
      category: product.category
    })
  }



  return (
    <Routes>
      <Route path="/" element={
        <>
          <AddProduct products={products} setProduct={setProduct} />
          <h1>List Product</h1>
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Image</th>
                <th scope="col">Category</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: IProduct, index: number) => (
                (product.id === flag) ?
                  <div className='bg'>
                    <tr key={product.id}>
                      <td colSpan={6}><form onSubmit={handleSubmit(onUpdate)}>
                        <div className="mb-3">
                          <label className="form-label">Name</label>
                          <input type="text" className="form-control" {...register('name')} />
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
                        <button type="submit" className="btn btn-primary">Update Product</button>
                        <button type='button' className='btn btn-danger' onClick={() => setFlag(0)}>Hủy</button>
                      </form></td>
                    </tr>
                  </div>
                  :
                  <tr key={product.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td><img width={70} src={product.image} alt={product.name} /></td>
                    <td>{product.category}</td>
                    <td>
                      {/* <Link to={`/edit/${product.id}`} className="btn btn-warning mr-3">Edit</Link> */}
                      <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
                      <button className="btn btn-warning" onClick={() => onEdit(product.id)}>Edit</button>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </>
      } />
      <Route path="/edit/:id" element={<Edit />} />
    </Routes>
  );
}

export default App;