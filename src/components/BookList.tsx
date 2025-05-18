'use client'
import { Book } from '@/models/book.model';
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface IBook {
    name: string,
    description: string,
    price: number,
    _id: string
}

function BookList() {
    let [booksData, setBooksData] = useState<IBook[]>();
    let [showEdit, setShowEdit] = useState(false);
    let [bookId, setBookId] = useState<string>();
    let [editBooksData, setEditBooksData] = useState<IBook>(
        {
            name: '',
            description: '',
            price: 0,
            _id: ''
        }
    )

    useEffect(() => {
        const getBooks = async () => {
            const books = await axios.get('http://localhost:3000/api/book/get');
            console.log("books response data ", books);
            return books.data.books;
        }
        const book = async () => {
            const data = await getBooks();
            setBooksData(data);
        }
        book();

    }, []);

    const editBook = (bookId: string) => {
        setShowEdit(true);
        setBookId(bookId);
    }

    const deleteBook = async (bookId: string) => {
        console.log("book id ", bookId);
        try {
            const response = await axios.delete(`http://localhost:3000/api/book/delete/${bookId}`);
            console.log("response delete book ", response);
            if(response.status == 200) {
                alert("Book deleted Successfully ");
            }
        } catch(error) 
        {
           console.log(`Error while deleting data ${error}`)
        }
    }

    const handleEdit = async () => {
        console.log("edited books data ", editBooksData);
        try {
            const response = await axios.put(`http://localhost:3000/api/book/update/${bookId}`);
            console.log("Edit book response ", response);
            if(response.status == 200) {
                alert("Book edited successfully ");
                setShowEdit(false);
            }
        } catch (error) {
            
        }
    }

    const handleEditBooks = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        setEditBooksData((prev) => ({
            ...prev,
            [name]: name === "price" ? Number(value) : value
        }));
    };


    return (
        <div>
            <h1 className='text-center text-[2rem] text-purple-600 font-bold'>
                Books
            </h1>
            <div className='grid grid-cols-[20vw_20vw_20vw_20vw] gap-[2rem] items-center justify-center'>
                {
                    booksData && booksData.map((book, ind) => {
                        return <div key={ind} className='flex flex-col gap-[0.5rem]'>
                            <h1 className='font-semibold'>{book.name}</h1>
                            <p>{book.description}</p>
                            <p>Price: {book.price}</p>
                            <div className='flex gap-[0.3rem]'>
                                <button className='px-[1rem] py-[0.2rem] bg-purple-600 rounded-2xl font-semibold text-white' onClick={() => editBook(book._id)}>edit</button>
                                <button className='px-[1rem] py-[0.2rem] bg-purple-600 rounded-2xl font-semibold text-white' onClick={() => deleteBook(book._id)}>delete</button>
                            </div>
                        </div>
                    })
                }
            </div>
            {
                showEdit && <div>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={editBooksData.name} onChange={handleEditBooks} />
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <textarea name="description" id="description" rows={10} cols={40} value={editBooksData.description} onChange={handleEditBooks} />
                    </div>
                    <div>
                        <label htmlFor="price">Price:</label>
                        <input type="text" name="price" id="price" value={editBooksData.price} onChange={handleEditBooks} />
                    </div>
                    <button onClick={handleEdit}>Edit Book</button>
                </div>
            }
        </div>
    )
}


export default BookList