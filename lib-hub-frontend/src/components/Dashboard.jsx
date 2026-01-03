import React from 'react'
import {ChartColumn, BookOpen, UsersRound, IterationCw} from "lucide-react"
import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { useState, useEffect } from 'react';
const Dashboard = () => {
  const uData = [20, 32, 28, 35, 40, 33];
const pData = [16, 28, 26, 32, 38, 30];
const xLabels = [
  '1',
  '2',
  '3',
  '4',
  '5',
];
const [books, setBooks] = useState([]);
const savedBooks = async () => {
      try{
        const response = await fetch("http://localhost:3000/api/books", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setBooks(data);
        } else {
          console.error("Failed to fetch books", response);
        }
      }catch(err){
        console.error("Error fetching books:", err);
      }
    }
  
    useEffect(() => {
        savedBooks();
      }, []);

  return (
    <section className='dashboard-container'>
      <div className='dashboard-cards'>
      <div className='dashboard-card'>
        <div>
          <h3>Total Books</h3>
          <h1>{books.length}</h1>
          <p className='items-left'>76 available</p>
          <p className='progress'>12% from last month</p>
        </div>
        <div>
          <BookOpen className='icon'/>
        </div>
      </div>
      <div className='dashboard-card'>
        <div>
          <h3>Active Members</h3>
          <h1>3</h1>
          <p className='items-left'>4 total members</p>
          <p className='progress'>12% from last month</p>
        </div>
        <div>
          <BookOpen className='icon'/>
        </div>
      </div>
      <div className='dashboard-card'>
        <div>
          <h3>Books Borrowed</h3>
          <h1>2</h1>
          <p className='items-left'>currently out</p>
          <p className='progress'>12% from last month</p>
        </div>
        <div>
          <BookOpen className='icon'/>
        </div>
      </div>
      <div className='dashboard-card'>
        <div>
          <h3>Overdue Books</h3>
          <h1>1</h1>
          <p className='items-left'>Action required</p>
          <p className='progress'>12% from last month</p>
        </div>
        <div>
          <BookOpen className='icon'/>
        </div>
      </div>
      </div>
      <div className='charts-section'>
        <div className="line-chart">
          <h1>Borrow Trends</h1>
            <Box sx={{ width: '100%', height: 300 }} >
            <LineChart
              series={[
              { data: pData, label: 'borrows' },
              { data: uData, label: 'returns' },
              ]}
              xAxis={[{ scaleType: 'point', data: xLabels }]}
              yAxis={[{ width: 50 }]}
              margin={{right:24}}
            />
          </Box>
        </div>
        <div className='pie-chart'>
        <PieChart
          
          series={[
            {
              data: [
                { id: 0, value: 45, label: 'Fiction' },
                { id: 1, value: 25, label: 'iction' },
                { id: 2, value: 15, label: 'Dystofian' },
                { id: 3, value: 15, label: 'Memoir' },
              ],
            },
          ]}
          width={200}
          height={200}
        />  
        </div>
        
      
      </div>
      <div className='recent-activities'>
        <h2>Recent Borrow Activity</h2>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Book</th>
              <th scope="col">Member</th>
              <th scope="col">Borrow Date</th>
              <th scope="col">Due Date</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">The Great gatsby</th>
              <td>John Doe</td>
              <td className='date'>2024-06-10</td>
              <td className='date'>2024-06-24</td>
              <td className='status'><span>Returned</span></td>
            </tr>
            <tr>
              <th scope="row">The Great gatsby</th>
              <td>John Doe</td>
              <td className='date'>2024-06-10</td>
              <td className='date'>2024-06-24</td>
              <td className='status'><span>Returned</span></td>
            </tr>
            <tr>
              <th scope="row">The Great gatsby</th>
              <td>John Doe</td>
              <td className='date'>2024-06-10</td>
              <td className='date'>2024-06-24</td>
              <td className='status'><span>Returned</span></td>
            </tr>
            <tr>
              <th scope="row">The Great gatsby</th>
              <td>John Doe</td>
              <td className='date'>2024-06-10</td>
              <td className='date'>2024-06-24</td>
              <td className='status'><span>Returned</span></td>
            </tr>
          </tbody>
        </table>
        
      </div>
    </section>
  )
}

export default Dashboard