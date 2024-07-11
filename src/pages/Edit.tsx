import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IProduct } from '../interfaces/products';

type Props = {
  product: IProduct;
  onUpdate: (data: FormData) => void;
  onCancel: () => void;
}

function EditProduct({ product, onUpdate, onCancel }: Props) {
  const { register, handleSubmit, reset, setValue } = useForm<any>({
    defaultValues: product
  });

  useEffect(() => {
    setValue("name", product.name);
    setValue("price", product.price);
    setValue("image", product.image);
    setValue("category", product.category);
  }, [product, setValue]);

  const onSubmit = async (updatedProduct: FormData) => {
    onUpdate(updatedProduct);
  };

  return (
    <>
      <tr className='bg'>
        <td colSpan={6}>
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
            <button type="submit" className="btn btn-primary">Update Product</button>
            <button type="submit" className="btn btn-danger" onClick={onCancel}>Cancel</button>
          </form>
        </td>
      </tr>


    </>
  );
}

export default EditProduct;