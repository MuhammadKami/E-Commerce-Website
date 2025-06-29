import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from 'react';
import {
  addProduct,
  fetchProducts,
  deleteProduct,
  updateProduct,
  clearStatus,
} from "../features/product/productSlice";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const dispatch = useDispatch();
  const { items, loading, error, success } = useSelector(
    (state) => state.products
  );


const formRef = useRef();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        dispatch(clearStatus());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in product) {
      formData.append(key, product[key]);
    }

    if (imageFile) formData.append("image", imageFile);

    if (editingId) {
      dispatch(updateProduct({ id: editingId, updatedData: formData }));
    } else {
      dispatch(addProduct(formData));
    }

    setProduct({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
    });
    setImageFile(null);
    setEditingId(null);
  };

  const handleEdit = (prod) => {
  setProduct({
    name: prod.name,
    description: prod.description,
    price: prod.price,
    category: prod.category,
    stock: prod.stock,
  });
  setEditingId(prod._id);

  // Smooth scroll to the form
  formRef.current?.scrollIntoView({ behavior: 'smooth' });
};


  const handleDelete = (id) => {
  if (window.confirm('Are you sure you want to delete this product?')) {
    dispatch(deleteProduct(id));
    setSnackbarMessage('Product deleted successfully');

    setTimeout(() => {
      setSnackbarMessage('');
    }, 3000);
  }
};


  return (
    <div className="max-w-3xl mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 mb-10 p-4 border-none rounded-md shadow-xl"
        encType="multipart/form-data"
        ref={formRef}
      >
        <h2 className="text-xl font-lighter">
          {editingId ? "Edit Product" : "Add New Product"}
        </h2>

        {["name", "description", "category"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field[0].toUpperCase() + field.slice(1)}
            value={product[field]}
            onChange={handleChange}
            className="w-full p-2 border-none rounded-md bg-gray-100"
          />
        ))}

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          className="w-full p-2 border-none rounded-md bg-gray-100"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={product.stock}
          onChange={handleChange}
          className="w-full p-2 border-none rounded-md bg-gray-100"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full cursor-pointer"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 disabled:opacity-50 rounded-md cursor-pointer"
          disabled={loading}
        >
          {editingId ? "Update Product" : loading ? "Adding..." : "Add Product"}
        </button>

        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>

      <div className="space-y-4  ">
        <h3 className="text-lg font-lighter text-center">All Products</h3>
        {items.map((prod) => (
          <div
            key={prod._id}
            className="p-4 border-none bg-gray-100 rounded-md flex justify-between items-center m-9"
          >
            <div className="">
              
              <div className="flex justify-center items-center">
                <h4 className="font-bold text-xs m-5">{prod.name}</h4>

                {prod.image && (
                  <div className="mt-2">
                    <img
                      src={`http://localhost:5000${prod.image}`}
                      alt={prod.name}
                      className="w-10 h-10 object-cover mr-9"
                    />
                  </div>
                )}
                <p
                  className="text-sm truncate max-w-[200px]"
                  title={prod.description}
                >
                  {prod.description}
                </p>

                <small className="m-5">
                  Price: ${prod.price}  Stock: {prod.stock}
                </small>
              </div>
            </div>
            <div className="space-x-2 flex justify-between items-center">
              <button
                onClick={() => handleEdit(prod)}
                className="bg-yellow-400 text-white px-2 py-1 rounded cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(prod._id)}
                className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {snackbarMessage && (
  <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-md transition-all">
    {snackbarMessage}
  </div>
)}

    </div>
  );
}
