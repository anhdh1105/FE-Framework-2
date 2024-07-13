import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import './App.css';
import { IProduct } from './interfaces/products';
import Home from './pages/Home';



function App() {
  // const { register, handleSubmit, reset } = useForm();
  // const [products, setProduct] = useState<IProduct[]>([]);
  // const [flag, setFlag] = useState<number | string>(0);
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const { data } = await axios.get(`http://localhost:3000/products`);
  //       console.log(data);
  //       setProduct(data);

  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })()
  // }, [])

  // const onAdd = async (product: FormData) => {
  //   // console.log(data);
  //   try {
  //     const { data } = await axios.post("http://localhost:3000/products", product)
  //     setProduct([...products, data])
  //     alert("Thêm mới thành công")
  //   } catch (error) {
  //     alert(error)
  //   }

  // }

  // const handleDelete = async (id: any) => {
  //   try {
  //     await axios.delete(`http://localhost:3000/products/${id}`);
  //     alert('Xoa thanh cong');
  //     setProduct([...products.filter(product => product.id !== id)])
  //   } catch (error) {
  //     console.log(error);

  //   }
  // }
  // const onUpdate = async (product: any) => {
  //   // console.log(data);
  //   try {
  //     const { data } = await axios.put("http://localhost:3000/products/" + flag, product)
  //     const newproduct = products.map(product => (product.id === flag) ? data : product)
  //     setProduct(newproduct)
  //     alert("Cập nhật thành công")
  //     setFlag(0);
  //   } catch (error) {
  //     alert(error)
  //   }

  // }
  // const onEdit = (id: number | string) => {
  //   setFlag(id);
  //   // const [product] = products.filter(p => p.id == id);
  //   // // reset({
  //   // //   name: product.name,
  //   // //   image: product.image,
  //   // //   price: product.price,
  //   // //   category: product.category
  //   // // })
  // }
  // const onCancelEdit = () => {
  //   setFlag(0);
  // };




  const element = useRoutes([
    {
      path: 'home',
      element: <Home />
    }
  ])

  return element;
  // return (
  //   <Routes>
  //     <Route path="/" element={
  //       <>
  //         <AddProduct onAdd={onAdd} />
  //         <h1>List Product</h1>
  //         <table className="table table-striped table-dark">
  //           <thead>
  //             <tr>
  //               <th scope="col">STT</th>
  //               <th scope="col">Name</th>
  //               <th scope="col">Price</th>
  //               <th scope="col">Image</th>
  //               <th scope="col">Category</th>
  //               <th scope="col">Action</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {products.map((product: IProduct, index: number) => (
  //               (product.id === flag) ?
  //                 <EditProduct product={product} onUpdate={onUpdate} onCancel={onCancelEdit} />
  //                 :
  //                 <tr key={product.id}>
  //                   <th scope="row">{index + 1}</th>
  //                   <td>{product.name}</td>
  //                   <td>{product.price}</td>
  //                   <td><img width={70} src={product.image} alt={product.name} /></td>
  //                   <td>{product.category}</td>
  //                   <td>
  //                     {/* <Link to={`/edit/${product.id}`} className="btn btn-warning mr-3">Edit</Link> */}
  //                     <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
  //                     <button className="btn btn-warning" onClick={() => onEdit(product.id)}>Edit</button>
  //                   </td>
  //                 </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       </>
  //     } />
  //   </Routes>
  // );
}
export default App;