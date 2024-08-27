import React from 'react';
import { FaUsers } from 'react-icons/fa';

export default function Supplier() {
    return (
        <div className="flex">
            <div className="fixed top-0 left-0 h-full bg-stone-800 text-white w-64">
                <nav>
                    <ul>
                        <li className="p-4 cursor-pointer bg-teal-500 mt-40 flex items-center">
                            <FaUsers className="w-8 h-8 mr-4" />
                            <span>Supplier Manager</span>
                        </li>
                    </ul>
                </nav>
            </div>

            <main className="ml-64 p-4 flex-1"> 
            <form >
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
        
         
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
        
            required
          />
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>

            </main>
        </div>
    );
}
