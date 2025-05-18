'use client'
import BookList from "@/components/BookList";
import axios from "axios";
import { useState } from "react";

interface BookData {
  name: string;
  description: string;
  price: number;
}

const BookStore = () => {
  const [bookData, setBookData] = useState<BookData>({ name: "", description: "", price: 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    console.log("Book added:", bookData);
    try {
      const response = await axios.post('http://localhost:3000/api/book/create', bookData);
      console.log("response from book data ", response);
      if (response.status == 200) {
        alert("Book created successfully ");
        setBookData({
          name: '',
          description: '',
          price: 0
        })
      }
    } catch (error) {

    }
  };

  return (
    <div>
      <div className="h-[100vh] flex flex-col justify-center items-center gap-[1rem]">
        <div>
          <h1 className="text-[2rem] text-purple-700 font-bold">Book Store</h1>
        </div>
        <div className='flex flex-col gap-[1rem]'>
          <div>
            <label htmlFor="name"><span className="font-semibold">Name:</span>
      
            </label>
            <input type="text" id="book" name="name" value={bookData.name} onChange={handleChange} className='border-1' />
          </div>
          <div>
            <h2 className="font-semibold">Description:</h2>
            <textarea name="description" id="desc" rows={10} cols={40} value={bookData.description} onChange={handleChange} className="border-1" />
            <div>
            </div>
            <label htmlFor="price"><span className="font-semibold">Price:</span></label>
            <input type="number" id="price" name="price" value={bookData.price} onChange={handleChange} className="border-1" />
          </div>
          <button onClick={handleSubmit} className="px-[1rem] py-[0.6rem] bg-purple-500 font-semibold text-white">Add Book</button>
        </div>
      </div>
      <BookList />
    </div>
  );
};

export default BookStore;
